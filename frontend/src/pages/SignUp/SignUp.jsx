import { useState } from "react"
import GenderCheckbox from "./GenderCheckbox"
import { Link } from "react-router-dom"
import { FaFingerprint } from "react-icons/fa";
import useSignUp from "../../hooks/useSignUp.js"

const SignUp = () => {

  const [user, setUser] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: ""
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  

  const handleCheckboxChange = (gender) => {
    setUser({ ...user, gender: gender });
  }

  const { loading, signup } = useSignUp();

  const handleSignUp = async (e) => {
    e.preventDefault();
    await signup(user);
  }

  return (
       <div className=" flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">

        <h1 className="text-3xl font-semibold text-center text-gray-300">
          SignUp{" "}
          <span className="text-blue-500">ChatApp</span>
        </h1>

        <form onSubmit={handleSignUp}>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">FullName</span>
            </label>
            <input type="text" placeholder="enter full name"
              className="w-full input input-bordered h-10"
              value={user.fullName}
              onChange={(e) => setUser({...user, fullName: e.target.value})}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input type="text" placeholder="enter Username" className="w-full input input-bordered h-10" value={user.username}
              onChange={(e) => setUser({...user, username:e.target.value})}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Email</span>
            </label>
            <input type="email" placeholder="enter email" className="w-full input input-bordered h-10" value={user.email}
              onChange={(e) => setUser({...user, email: e.target.value})}
            />
          </div>


          <div>
            <label className="label p-2">
            <span className="text-base label-text">password</span>
            </label>
            <div className="flex items-center justify-between w-full input input-bordered h-10">
              <input type={showPassword? "text":"password"} placeholder="enter password"
                className="input-bordered " value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
              />
              <span className="hover:text-blue-600" onClick={() => setShowPassword((prev)=> !prev)}>
                <FaFingerprint size={25}/>
              </span>
            </div>
          </div>

          <div>
            <label className="label p-2">
            <span className="text-base label-text"> confirm password</span>
            </label>
            <div className="flex items-center justify-between w-full input input-bordered h-10">
              <input type={showConfirmPassword? "text":"password"} placeholder="confirm password"
                className="input-bordered"
                value={user.confirmPassword}
                onChange={(e) => setUser({...user, confirmPassword:e.target.value})}
              />
              <span className="hover:text-blue-600" onClick={() => setShowConfirmPassword((prev)=> !prev)}>
                <FaFingerprint size={25}/>
              </span>
            </div>
          </div>

          <GenderCheckbox OnCheckboxChange={handleCheckboxChange} selectedGender={user.gender} />
          
          <Link to="/login"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">{`Already have an account? Click here`}</Link>

          <div>
            <button className="btn btn-block btn-sm mt-2" type="submit"
              disabled = {loading}
            >
              {loading? <span className="loading loading-spinner" /> : "Sign Up"}
            </button>
          </div>

        </form>

      </div>

    </div>
  )
}

export default SignUp