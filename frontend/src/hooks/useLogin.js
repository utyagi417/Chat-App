import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
    
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

   

    const login = async (email, password) => {
        let toastId;
        try {
            const success = handleSuccess({ email, password });
            if (!success) return false;
            
            toastId = toast.loading('Logging In');
            setLoading(true);
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            if (data.error) { 
                throw new Error(data.error);
            }
            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);
            toast.success(`Welcome 👋 ${data.username}`, {
            id: toastId,
            });

        } catch (error) {
            toast.error(error.message, {
            id: toastId,
            });
        } finally { 
            setLoading(false);
        }
    }

    return { loading, login };
}

export default useLogin;


const handleSuccess = ({ email, password }) => {
    
    if (!password|| !email) {
        toast.error("please fill all fields");
        return false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValidEmail = emailRegex.test(email);
    if (!isValidEmail) {
        toast.error("email format is invalid");
        return false;
    }

    return true;
}
