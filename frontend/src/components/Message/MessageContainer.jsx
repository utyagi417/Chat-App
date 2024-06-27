import Messages from "./Messages"
import MessageInput from './MessageInput';
import { TbMessages } from "react-icons/tb";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand.store/useConversation";
import { useEffect } from "react";

const MessageContainer = () => {

  const {selectedConversation ,setSelectedConversation} = useConversation();

  useEffect(() => { 
      // Clean up function 
    return () => {
      setSelectedConversation(null);
    }
  },[])


  return (
    <div className="md:min-w-[450px] sm:flex flex-col hidden">
      {!selectedConversation ? <NoChatSelected /> :
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-900 font-bold">{selectedConversation.username}</span>
          </div>

          <Messages />
          <MessageInput />
        </>
      }

    </div>
  )
}

export default MessageContainer


const NoChatSelected = () => {

  const { authUser } = useAuthContext();
  
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2"> 
        <p>Welcome 👋 {authUser.username}</p>
        <p>Select a chat to start messaging</p>
        <TbMessages size={75}/>
      </div>

    </div>
  )
}