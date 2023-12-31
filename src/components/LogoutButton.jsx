import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';

const LogoutButton = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const cerrarSesion = async () => {
        await logout();
        console.log("hola")
        navigate("/login")
    };

    return (
        <Button variant="danger" onClick={() => cerrarSesion()}>
            Cerrar sesión
        </Button>

    )
}

export default LogoutButton