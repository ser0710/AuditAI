import React, { useState } from "react";
import axios from "axios";
import './style.css';
import FormularioDB from "./FormularioDB";

const UploadFile = (props) => {

    const [name, setName] = useState("");

    const [file, setFile] = useState(null);

    const [botones, setBotones] = useState(true);

    const [dbName, setDBName] = useState('');

    const [mostrarFormulario, setMostrarFormulario] = useState(false)

    const toggleMostrarFormulario = () => {
        props.onChatActivation(!props.ChatActivation)
        setMostrarFormulario(!mostrarFormulario)
    }
    
    const handleChangeFile = (event) => {
        setFile(event.target.files[0])
        if(event.target.files[0]){
            setName(event.target.files[0].name)
        }
        setBotones(false)
    };

    const handleUpload = async () => {
        var response ="";
        if(file){
            const formData = new FormData();
            formData.append("file", file)
            const name_file = file.name.split(".");
            const data = name_file[name_file.length - 1]
            sessionStorage.setItem('file', data)
            try{
                response = await axios.post("http://localhost:5000/upload", formData, {
                    headers: {"Content-Type": "multipart/form-data",}
                })
            }catch(error){
                alert("Archivo no valido")
                setBotones(true)
            }
        } else {
            alert("Seleccione un archivo")
        }
        console.log(response)
    }

    const handleDeleteFile = async () => {
        if(file){
            try{
                sessionStorage.setItem('file', "")
                await axios.delete("http://localhost:5000")
                setBotones(true)
                setName("")
                const inputArchivo = document.getElementById('inputFile');
                inputArchivo.value = ''; 
            }catch(error){
                console.log(error)
            }
        } else if(sessionStorage.getItem('file') === 'db'){
            setBotones(true)
            setDBName('')

        }
    }

    return (
        <div id="divButtonFiles">
            <div>
                <input type="file" id="inputFile" onChange={handleChangeFile} disabled={!botones}></input>
                <label htmlFor="inputFile" id="searchFile" className="buttonFiles" disabled={!botones}> 
                    <svg viewBox="0 0 24 24" id="svgSearch" className="svgFiles" >
                    <path d="M13.2686 14.2686L15 16M12.0627 6.06274L11.9373 5.93726C11.5914 
                    5.59135 11.4184 5.4184 11.2166 5.29472C11.0376 5.18506 10.8425 5.10425 10.6385 5.05526C10.4083 
                    5 10.1637 5 9.67452 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 
                    3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 
                    3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 
                    18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V10.2C21 9.0799 21 8.51984 
                    20.782 8.09202C20.5903 7.71569 20.2843 7.40973 19.908 7.21799C19.4802 7 18.9201 7 17.8 7H14.3255C13.8363 
                    7 13.5917 7 13.3615 6.94474C13.1575 6.89575 12.9624 6.81494 12.7834 6.70528C12.5816 6.5816 12.4086 6.40865 
                    12.0627 6.06274ZM14 12.5C14 13.8807 12.8807 15 11.5 15C10.1193 15 9 13.8807 9 12.5C9 11.1193 10.1193 10 
                    11.5 10C12.8807 10 14 11.1193 14 12.5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" 
                    strokeLinejoin="round"></path></svg>
                </label>
                <div>
                    {name}
                </div>
            </div>
            <div>
                <button id="database" className="buttonFiles" onClick={toggleMostrarFormulario} disabled={!botones}>
                    <svg id="svgDatabase" className="svgFiles" viewBox="0 0 24 24" fill="white"><g id="SVGRepo_bgCarrier" strokeWidth="0">
                    </g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round">
                    </g><g id="SVGRepo_iconCarrier"> <path d="M21 5C21 6.65685 16.9706 8 12 8C7.02944 8 3 6.65685 3 
                    5M21 5C21 3.34315 16.9706 2 12 2C7.02944 2 3 3.34315 3 5M21 5V19C21 20.66 17 22 12 22C7 22 3 20.66 
                    3 19V5M21 12C21 13.66 17 15 12 15C7 15 3 13.66 3 12" stroke="#000000" strokeWidth="2" 
                    strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                </button>{mostrarFormulario && (<FormularioDB toggleMostrarFormulario={toggleMostrarFormulario} boton={setBotones} name={setDBName}></FormularioDB>)}
                <div>
                    {dbName}
                </div>
            </div>
            
            <button onClick={handleUpload} id="uploadFile" className="buttonFiles manage" disabled={botones}>
            <svg viewBox="0 0 640 512" fill="white" id="svgUpload" className="svgFiles">
                <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 
                71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 
                23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 
                33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 
                33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path></svg>
            </button>
            <button onClick={handleDeleteFile} id="deleteFile" className="buttonFiles manage" disabled={botones}>
            <svg viewBox="0 0 448 512" id="svgDelete" className="svgFiles"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 
            64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 
            0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 
            46.3-19.7 47.9-45L416 128z"></path></svg></button>
        </div>
    )
}

export default UploadFile;