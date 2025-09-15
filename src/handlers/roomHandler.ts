import { Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";

const roomHandler = (socket: Socket) => {
    const createRoom = () => {
        const roomId = uuidv4();
        socket.join(roomId);
        socket.emit("room-created", {roomId});
        console.log("New room created with ID:", roomId);
    };

    const joinRoom = ({ roomId }: { roomId: string }) => {
        console.log("New user has joined the room", roomId);
    };

    // when we will call the above two functions
    // when the client emit wvnets to create and join room
    socket.on("create-room", createRoom);
    socket.on("joined-room", joinRoom);
};

export default roomHandler;