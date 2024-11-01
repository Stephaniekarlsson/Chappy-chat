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
  setMessages: (messages: DmMessage[]) => void
) => {
  if (!currentDmUser) {
    console.error("No recipient selected for the DM.");
    return;
  }
  const newDmMessage: DmMessage = {
    sender: currentUser,
    receiver: currentDmUser,
    message: inputValue,
    timestamp: new Date(),
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
  setMessages: (messages: Message[]) => void
) => {
  if (!currentChannelId) {
    console.error("No channel selected.");
    return;
  }

  const newChannelMessage: Message = {
    sender: currentUser,
    message: inputValue,
    channel_id: currentChannelId,
  };

  const response = await addChannelMessage(newChannelMessage);

  if (response) {
    setInputValue('');
    const updatedMessages = await fetchChannelMessages(currentChannelId);
    setMessages(updatedMessages);
  }
};
