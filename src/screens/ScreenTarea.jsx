import { addDoc, collection, updateDoc } from '@firebase/firestore';
import React, { useState } from 'react'
import { db } from '../config/db';
import { useNavigate } from 'react-router-dom';


function ScreenTarea() {
    const [nombreTarea, setNombreTarea] = useState("")
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(nombreTarea)
        if(nombreTarea){
            try {
              const nuevaTarea = {
                // id: 2,
                nombre: nombreTarea, 
                terminada: 0 
              }
              const docRef= await addDoc(collection(db,"Tareas"), nuevaTarea)
              await updateDoc(docRef, {id:docRef.id})
              navigate("/home")
            } catch (error) {
              console.log(error)
            }
        } else {
            console.log("pone nombre")
        }
    }

    const handleInput = (e) => {
        e.preventDefault()
        setNombreTarea(e.target.value)
    }
    return (
        <div className='añadir-tarea'>
            Crear tarea<br /> <br />
                <input className='input-tarea' type="text" placeholder='Crear nueva tarea'
                    onChange={handleInput}
                /> 
                <button className='boton-crear-tarea' type='button' onClick={handleSubmit}>Crear</button>
            
        </div>
    )
}

export default ScreenTarea