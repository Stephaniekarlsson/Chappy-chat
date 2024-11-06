import '../css/guestView.css'
import { Navbar } from './navbar/Navbar.js'
import { Chat } from './Chat.js'

export const GuestView = () => {
    return (
        <>
        <div className="guestview-container">
            <Navbar />
            <Chat />
        </div>
        </>
    )
}