import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

function App() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [userId, setUserId] = useState('');
    const [socketConnected, setSocketConnected] = useState(false);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (socketConnected) {
            // Listen for user joined event
            socket.on('user-joined', (userId) => {
                console.log(`User ${userId} joined the meeting`);
                // Handle user joined event (e.g., display user's video/audio)
            });

            // Listen for user left event
            socket.on('user-left', (userId) => {
                console.log(`User ${userId} left the meeting`);
                // Handle user left event (e.g., remove user's video/audio)
            });

            return () => {
                // Clean up WebSocket listeners
                socket.off('user-joined');
                socket.off('user-left');
            };
        }
    }, [socketConnected, socket]);

    const initializeSocket = () => {
        const newSocket = io('http://127.0.0.1:4000', {
            withCredentials: true
        });

        setSocket(newSocket);
        setSocketConnected(true);
    };

    const sendInvite = () => {
        const roomName = 'UNIQ'; // Replace with the actual room name
        const data = {}; // Replace with the data to be sent in the invite
        socket.emit('send-invite', roomName, data);
    };

    const joinMeeting = () => {
        const roomName = 'UNIQ'; // Replace with the actual room name
        socket.emit('join-room', roomName);
    };

    return (
        <div>
            <h1>My App</h1>
            {!socketConnected && (
                <button onClick={initializeSocket}>Establish Connection</button>
            )}
            {socketConnected && (
                <>
                    {isAdmin ? (
                        <div>
                            <button onClick={sendInvite}>Send Invite</button>
                        </div>
                    ) : (
                        <div>
                            <button onClick={joinMeeting}>Join Room</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default App;
