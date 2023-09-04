import React, {useEffect, useRef} from "react";
import './style.css';

const Conversation = ({messages}) => {
    const chatRef = useRef(null);
    useEffect(() => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, [messages])

    return (
        <div id="conversation" ref={chatRef}>
            {messages.map((message, index) => (
                <div key={index} className={`message ${message.isSent ? 'received' : 'sent' }`}>
                    {message.content}
                </div>
            ))}
        </div>
    );
};

export default Conversation;