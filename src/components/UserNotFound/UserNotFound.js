import React from 'react';

import { Link } from 'react-router-dom';
import './UserNotFound.scss';

const UserNotFound = () => {
    return (
        <div className="user-not-found">
            <p>Usuario no encontrado.</p>
            <p>Es posible que el enlace que has seguido sea incorrecto o que el usuario se haya elimina</p>
            <Link to="/">Volver al Inicio.</Link>
        </div>
    );
};

export default UserNotFound;
