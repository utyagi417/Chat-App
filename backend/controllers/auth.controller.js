import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";


// SignUp Function


export const signup = async (req, res) => { 
    try {
        const { fullName, username,email, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(404).json({ error: "Password doesn't match" });
        }

        const user_email = await User.findOne({ email});
        const user_username = await User.findOne({ username });

        if (user_email || user_username) {
            return res.status(400).json({
                error: "User already exists"})
        }

        // Hash Password

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // https://avatar.iran.liara.run/public/boy?username=Scott //api for profile pic

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName,
            username, 
            email,
            password : hashedPassword,
            gender,
            profilePic: gender == "male" ? boyProfilePic : girlProfilePic
        })

        if (newUser) {
            // generate jwt token
            generateTokenAndSetCookie(newUser._id, res);

            await newUser.save();
    
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
        } else {
            res.status(404).json({ error: "Invalid user data" });
        }
        
    } catch (error) {
        console.log("Error in Signup Controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// Logout Function

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email:email});
        const isPasswordCorrect = await bcryptjs.compare(password, user?.password || "");
        
        if (!user) {
            return res.status(403).json({ error: "User not found" });
        }

        if (!isPasswordCorrect) {
            return res.status(403).json({ error: "Incorrect Password" });
        }
        
        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic
        })

    } catch (error) {
        console.log("Error in Login Controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


// Logout Function

export const logout = (req, res) => { 
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in Login Controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}