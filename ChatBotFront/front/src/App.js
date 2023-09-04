import React, { useState } from "react";
import Chat from "./Chat";
import UploadFile from "./UploadFile";
import Conversation from './Conversation';
const App = () => {

    const [data, setData] = useState([
        {content: "Hola, en que puedo ayudarte?", isSent:true}
    ]);

    const handleDataChange = (dataFromChild) => {
        setData(dataFromChild)
    }

    const [chat, setChat] = useState(false)

    const handleChatActivation = (dataFromChild) => {
        console.log(dataFromChild)
        setChat(dataFromChild)
    }

    return (
        <div className="chatApp">
            <Conversation messages={data}></Conversation>
            <div id="funtionalities">
                <Chat Conversation={data} onConvesationUpdate={handleDataChange} ChatActivation={chat}></Chat> 
                <UploadFile onChatActivation={handleChatActivation} ChatActivation={chat}></UploadFile>
            </div>
            
        </div>
    )
}
export default App;