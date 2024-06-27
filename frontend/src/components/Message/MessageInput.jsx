import { IoSend } from "react-icons/io5";
import useSendMessage from "../../hooks/useSendMessage";
import { useState } from "react";

const MessageInput = () => {

  const { loading, sendMessage } = useSendMessage();
  const [message, setMessage] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  }


  return (
    <form className="px-4 my-3"
      onSubmit={handleSendMessage}
    >
      <div className="w-full relative">
        <input type="text"
          placeholder="Type a Message"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
       
        <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
          {loading? <span className="loading loading-spinner"/> : <IoSend className="text-xl md:text-3xl text-center"/>}
          </button>
          </div>
    </form>
  )
}

export default MessageInput
