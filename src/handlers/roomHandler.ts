import { Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import type IRoomParams from "../interfaces/IRoomParams.js";

const rooms : Record<string, string[]> = {};

const roomHandler = (socket: Socket) => {

    const createRoom = () => {
        const roomId = uuidv4();
        socket.join(roomId);

        rooms[roomId] = []; //create a new entry for the room
        socket.emit("room-created", {roomId});
        console.log("New room created with ID:", roomId);
    };

    // the below function is executed everytime a user joins
    const joinRoom = ({ roomId, peerId }: IRoomParams ) => {
        
        if (rooms[roomId]) {
            //If the given roomId exists in the memory db
            console.log("New user has joined the room", roomId, "with peerId:", peerId);
            // the moment  new user joins, add the peerId to the key of roomId
            rooms[roomId].push(peerId);
            socket.join(roomId);

            // below event is for logging purpose only
            socket.emit("get-users", {
                roomId,
                participants: rooms[roomId]
            })
        };
    };

    // when we will call the above two functions
    // when the client emit wvnets to create and join room
    socket.on("create-room", createRoom);
    socket.on("joined-room", joinRoom);
};

export default roomHandler;