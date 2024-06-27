import { BiLogOut } from "react-icons/bi";
import useLogOut from "../../hooks/useLogOut";

const LogoutButton = () => {

  const {loading, logout} = useLogOut();

  return (
    <div className="mt-auto text-white cursor-pointer w-8">
      {loading ? (
       <span className="loading loading-spinner"></span> 
      ) : (
          <BiLogOut size={25} onClick={logout}/>
      )}
      </div>
  )
}

export default LogoutButton