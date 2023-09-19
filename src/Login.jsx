import React from "react";
import "./App.css"


function Login() {
    return (
        <div className="centrar">
            <div className="tamaño">
                <div className="">
                    Task Reminder
                </div>
                <div>
                    <input type="text" className="input" placeholder="Ingrese Nombre" />
                    <br></br>
                    <input type="text" className="input" placeholder="Correo electronico" />
                    <br></br>
                    <input type="password" className="input" placeholder="Contraseña" />
                    <br></br>
                    <button>Crear</button>
                </div>
            </div>
        </div>
    )
}

export default Login