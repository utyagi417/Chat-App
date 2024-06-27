import Message from '../models/message.model.js';
import Conversation from '../models/conversation.model.js';
import { getReceiverSocketId } from '../socket/socket.js';
import { io } from '../socket/socket.js';

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        // finding conversation between users

        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]},
        })

        // if no conversation found , create a new conversation
        if (!conversation) { 
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        // create new message
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })

        // pushing newMessage into messages array in conversation
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // await conversation.save();
        // await newMessage.save();

        // take less time then above those save functions as this will run in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        // SOCKET.IO HERE!!! for real time
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) { 
            // io.to(<socket.id>).emit() used to send event to specific client
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        // returning response
        res.status(200).json(newMessage);

    } catch (error) {
        console.log("Error in SendMessage Controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const getMessage = async (req, res) => {
    try {
        const {id: userToChatId} = req.params
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages"); // POPULATE changes the reference to actual messages

        if (!conversation) return res.status(200).json([]);

        const messageData = conversation.messages;
        res.status(200).json(messageData);

    } catch (error) {
        console.log("Error in GetMessage Controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}