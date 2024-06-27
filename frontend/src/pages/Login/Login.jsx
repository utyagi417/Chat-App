import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFingerprint } from "react-icons/fa";
import useLogin from '../../hooks/useLogin';

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {loading, login} = useLogin();

  const handleLogin = async (e) => { 
    e.preventDefault();
    await login(email, password);
  }


  return (
    <div className=" flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">

        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login{" "}
          <span className="text-blue-500">ChatApp</span>
        </h1>

        <form onSubmit={handleLogin}>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Email</span>
            </label>
            <input type="email" placeholder="enter email"
              className="w-full input input-bordered h-10"
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>


          <div>
            <label className="label p-2">
            <span className="text-base label-text">password</span>
            </label>
            <div className="flex items-center justify-between w-full input input-bordered h-10">            
            <input type={showPassword ? "text" : "password"}
              placeholder="enter password"
              className="input-bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="hover:text-blue-600" onClick={() => setShowPassword((prev)=> !prev)}>
                <FaFingerprint size={25}/>
              </span>
            </div>
          </div>

          <Link to="/signup" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">{`Don't have an account? Click here`}</Link>

          <div>
            <button type='submit'
              className="btn btn-block btn-sm mt-2"
              disabled = {loading}
            >
              {loading ? <span className='loading loading-spinner'/>:"Login"}
            </button>
          </div>

        </form>

      </div>

    </div>
  )
}

export default Login

  /* STARTER CODE FOR LOGIN */

    // <div className=" flex flex-col items-center justify-center min-w-96 mx-auto">
    //   <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">

    //     <h1 className="text-3xl font-semibold text-center text-gray-300">
    //       Login{" "}
    //       <span className="text-blue-500">ChatApp</span>
    //     </h1>

    //     <form>

    //       <div>
    //         <label className="label p-2">
    //           <span className="text-base label-text">Email</span>
    //         </label>
    //         <input type="email" placeholder="enter email" className="w-full input input-bordered h-10"/>
    //       </div>


    //       <div>
    //         <label className="label p-2">
    //         <span className="text-base label-text">password</span>
    //         </label>
    //         <input type="password" placeholder="enter password" className="w-full input input-bordered h-10"/>
    //       </div>

    //       <a href="#" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">{`Don't have an account? Click here`}</a>

    //       <div>
    //         <button className="btn btn-block btn-sm mt-2">Login</button>
    //       </div>

    //     </form>

    //   </div>

    // </div>