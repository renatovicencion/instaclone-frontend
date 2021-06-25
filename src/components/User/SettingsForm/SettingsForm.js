import React from 'react';

import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import useAuth from './../../../hooks/useAuth';
import ResetPasswordForm from './../ResetPasswordForm';
import ChangeEmailForm from './../ChangeEmailForm';
import ChangeDescriptionForm from './../ChangeDescriptionForm';
import ChangeSiteWebForm from './../ChangeSiteWebForm';

import './SettingsForm.scss';

function SettingsForm({ setShowModal , setTitleModal, setChildrenModal, getUser, refetch }) {

    const history = useHistory();
    const client = useApolloClient();
    const { logout } = useAuth();

    const onChangePassword = () => {
        setTitleModal("Cambiar Contraseña");
        setChildrenModal(<ResetPasswordForm logout={onLogout} />)
    };

    const onChangeEmail = () => {
        setTitleModal("Cambiar Email");
        setChildrenModal(<ChangeEmailForm setShowModal={setShowModal} currentEmail={getUser.email} refetch={refetch} />)
    };

    const onChangeDescription = () => {
        setTitleModal("Actualizar Descripción");
        setChildrenModal(<ChangeDescriptionForm setShowModal={setShowModal} currentDescription={getUser.description} refetch={refetch} />);
    };

    const onChangeSiteWeb = () => {
        setTitleModal("Actualizar Descripción");
        setChildrenModal(<ChangeSiteWebForm setShowModal={setShowModal} currentSiteWeb={getUser.siteWeb} refetch={refetch} />);
    };

    const onLogout = () => {
        client.clearStore();
        logout();
        history.push("/");
    }

    return (
        <div className="settings-form">
            <Button onClick={onChangePassword}>Cambiar Contraseña</Button>
            <Button onClick={onChangeEmail}>Cambiar Email</Button>
            <Button onClick={onChangeDescription}>Cambiar Descripción</Button>
            <Button onClick={onChangeSiteWeb}>Cambiar Sitio Web</Button>
            <Button onClick={onLogout}>Cerrar Sesión</Button>
            <Button onClick={() => setShowModal(false)}>Cancelar</Button>
        </div>
    );
};

export default SettingsForm;
