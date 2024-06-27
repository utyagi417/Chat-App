import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext.jsx";


const useSignUp = () => {

    const [loading, setLoading] = useState(false);

    const {setAuthUser} = useAuthContext()

    const signup = async ({fullName, username, email, password , confirmPassword, gender }) => {
        const success = handleUserError({ fullName, username, email, password, confirmPassword, gender });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({fullName, username, email, password , confirmPassword, gender })
            })

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            // local storage setting context item
            localStorage.setItem("chat-user", JSON.stringify(data))
            
            // update context
            setAuthUser(data);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }


    return { loading, signup };
}

export default useSignUp;


const handleUserError = ({fullName, username, email, password , confirmPassword, gender }) => { 

    if (!fullName || !username || !password || !confirmPassword || !email || !gender) {
        toast.error("please fill all fields");
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("password and confirm password do not match");
        return false;
    }    

    if (password.length < 6) {
        toast.error("password must be at least 6 characters");
        return false;
    } 

    // Key components of the regex pattern:

    // ^: Start of the string.
    // [a-zA-Z0-9._-]+: Match one or more alphanumeric characters, dots, underscores, or hyphens for the username part.
    // @: Match the "@" symbol.
    // [a-zA-Z0-9.-]+: Match one or more alphanumeric characters, dots, or hyphens for the domain name.
    // \.: Match a period (dot), which separates the domain name and top-level domain (TLD).
    // [a-zA-Z]{2,4}: Match the TLD, consisting of 2 to 4 alphabetical characters.
    // $: End of the string.

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValidEmail = emailRegex.test(email);
    if (!isValidEmail) {
        toast.error("email format is invalid");
        return false;
    }
    return true;
}