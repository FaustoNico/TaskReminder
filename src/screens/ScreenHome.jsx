import React, { useEffect, useState } from 'react'
import LogoutButton from '../components/LogoutButton'
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from '@firebase/firestore';
import { db } from '../config/db';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ScreenHome() {

  const navigate = useNavigate();
  const [tareas, setTareas] = useState([]);
  const [show, setShow] = useState(false);
  const handleShow = (tarea) => {
    setSelectedTarea(tarea)
    setShow(true);
  }
  const handleClose = () => {
    setSelectedTarea(null) 
    setShow(false);
  }
  const [selectedTarea, setSelectedTarea] = useState(null); // Nuevo estado para rastrear la tarea seleccionada

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'Tareas'), (foto) => {
      try {
        const tareas = []
        foto.forEach((tarea) => {
          tareas.push({ ...tarea.data(), id: tarea.id })
        })
        console.log(tareas)
        setTareas(tareas)
      } catch (error) {
        console.log(error)
      }
    })
    return () => {
      console.log(unsub)
      unsub()
    }
  }, [])

  const borrarTarea = async (id) => {
    const docId = doc(db, "Tareas", id)
    await deleteDoc(docId)
  }

  console.log(tareas)
  return (
    <>

      <div className='centrar tamaño'>
        <div className='tareas'>
          Tareas
        </div>
        {tareas.map((tarea, index) => {
          console.log(tarea)

          return (
            <div key={tarea.id} className='tarea'>

              <div onClick={() => handleShow(tarea)}>
                {tarea.nombre}
              </div>
              <Modal show={show && selectedTarea === tarea} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    {tarea.nombre}  
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>{tarea.nombre}</Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" onClick={(id) => borrarTarea(tarea.id)}>Borrar</Button>
                  <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                  </Button>
                  <Button variant="primary" onClick={handleClose}>
                    Guardar Cambios
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          )
        })}
        <Button variant="primary" onClick={() => { navigate("/tarea") }}>Añadir</Button>
        <LogoutButton></LogoutButton>
      </div>
    </>
  )
}

export default ScreenHome