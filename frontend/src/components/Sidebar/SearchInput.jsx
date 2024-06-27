import { IoSearchSharp } from "react-icons/io5";
import { useState } from "react";
import useConversation from './../../zustand.store/useConversation';
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {

  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search must be at least 3 characters");
    }

    const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLocaleLowerCase()));

    if (conversation) { 
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("No user found");
    }
  }

  return (
    <form className="flex items-center gap-2"
      onSubmit={handleSearch}
    >
      <input type="text" placeholder="Search"
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp size={25}/>
      </button>
    </form>
  )
}

export default SearchInput