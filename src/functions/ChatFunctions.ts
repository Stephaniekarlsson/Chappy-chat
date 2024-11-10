import { DmMessage } from "../api/dmApi";
import { addDmMessage } from "../api/dmApi";
import { Message } from "../data/messageStore";
import { addChannelMessage } from "../api/channelApi";
import { fetchChannelMessages } from "../api/channelApi";
import { fetchDmMessages } from "../api/dmApi";

export const handleSendDm = async (
  inputValue: string,
  setInputValue: React.Dispatch<React.SetStateAction<string>>,
  currentUser: string,
  currentDmUser: string | null,
  currentChannelId: string | null, 
  setMessages: (messages: DmMessage[]) => void
) => {
  if (!currentDmUser || currentChannelId) { 
    console.error("No recipient selected for the DM or channel is active.");
    return;
  }

  const newDmMessage: DmMessage = {
    sender: currentUser,
    receiver: currentDmUser,
    message: inputValue,
    timestamp: new Date().toISOString(),
  };

  const response = await addDmMessage(newDmMessage);
  if (response) {
    setInputValue('');
    const updatedDms = await fetchDmMessages(currentUser, currentDmUser);
    setMessages(updatedDms);
  }
};


export const handleSendChannelMessage = async (
  inputValue: string,
  setInputValue: React.Dispatch<React.SetStateAction<string>>,
  currentUser: string,
  currentChannelId: string | null,
  currentDmUser: string | null, 
  setMessages: (messages: Message[]) => void
) => {
  if (!currentChannelId || currentDmUser) { 
    console.error("No channel selected or DM chat is active.");
    return;
  }

  const newChannelMessage: Message = {
    sender: currentUser,
    message: inputValue,
    channel_id: currentChannelId,
    timestamp: new Date().toISOString(),
  };

  const response = await addChannelMessage(newChannelMessage);

  if (response) {
    setInputValue('');
    const updatedMessages = await fetchChannelMessages(currentChannelId);
    setMessages(updatedMessages);
  }
};

