import React, { useState } from "react";
import axios from "axios";
import './style.css';

const FormularioDB = (props) => {

    const [server, setServer] = useState('')

    const [db, setdb] = useState('')

    const [user, setUser] = useState('')

    const [password, setPassword] = useState('')

    const [tabla, setTabla] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            server: server,
            db: db,
            user: user,
            password: password,
            tabla: tabla
        }
        try{
            var response = await axios.post('http://localhost:5000/connect', data)
            console.log(response)
        }catch(error){
            alert("Información no valida")
        }
        props.toggleMostrarFormulario();
        sessionStorage.setItem('file', 'db')
        props.boton(false)
        props.name(tabla)

    }

    return (
        <div className="modal">
            <div className="modal-contenido">
                <div id="cerrar-form">
                    <button className="btn-cerrar" onClick={props.toggleMostrarFormulario}>
                        <svg id="closeDBForm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" 
                        strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> 
                        <circle cx="12" cy="12" r="10" stroke="#ff0000" strokeWidth="1.5"></circle> 
                        <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#ff0000" 
                        strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
                    </button>
                    <div id="close-text">Cerrar</div>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div id="formDB">
                        <h1>Info de la DB</h1>
                        <div className="inputDB">
                            <input id="server" className="inputDBinfo"  type="text" placeholder="server" value={server} onChange={(e) => setServer(e.target.value)} required="required"/>
                            <div className="underline"></div>
                        </div>
                        <div className="inputDB">
                            <input type="text" className="inputDBinfo" placeholder="base de datos" value={db} onChange={(e) => setdb(e.target.value)} required="required"/>
                            <div className="underline"></div>
                        </div>
                        <div className="inputDB">
                            <input type="text" className="inputDBinfo" placeholder="usuario" value={user} onChange={(e) => setUser(e.target.value)} required="required"/>
                            <div className="underline"></div>
                        </div>
                        <div className="inputDB">
                            <input type="password" className="inputDBinfo" placeholder="contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required="required"/>
                            <div className="underline"></div>
                        </div>
                        <div className="inputDB">
                            <input type="text" className="inputDBinfo" placeholder="tabla" value={tabla} onChange={(e) => setTabla(e.target.value)} required="required"/>
                            <div className="underline"></div>
                        </div>
                        <button id="btn-db" type="submit">Enviar</button>
                    </div>
                    
                </form>
            </div>
        </div>
    )

}

export default FormularioDB;