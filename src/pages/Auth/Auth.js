import React, { Fragment, useState } from 'react';

import { Container, Image } from 'semantic-ui-react';
import RegisterForm from './../../components/Auth/RegisterForm';
import LoginForm from './../../components/Auth/LoginForm';
import instaclone from './../../assets/png/instaclone.png';
import './Auth.scss';

const Auth = () => {

    const [showLogin, setShowLogin] = useState(false);

    return (
        <Container fluid className="auth">
            <Image src={instaclone} />

            <div className="container-form">
                {showLogin ? <LoginForm /> : <RegisterForm setShowLogin={setShowLogin} />}
            </div>

            <div className="change-form">
                {showLogin ? (
                    <Fragment>
                        ¿No tienes cuenta?
                        <span onClick={() => setShowLogin(!showLogin)}>Regístrate</span>
                    </Fragment>
                ) : (
                    <Fragment>
                        ¡Entra con tu cuenta!
                        <span onClick={() => setShowLogin(!showLogin)}>Iniciar sesión</span>
                    </Fragment>
                )}
            </div>
        </Container>
    );
};

export default Auth;
