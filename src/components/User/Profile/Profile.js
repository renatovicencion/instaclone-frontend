import React, { useState, Fragment } from 'react';

import { Grid, Image } from 'semantic-ui-react';
import { useQuery } from '@apollo/client';
import { GET_USER } from './../../../gql/user';
import useAuth from './../../../hooks/useAuth';
import UserNotFound from './../../UserNotFound';
import ModalBasic from './../../Modal/ModalBasic';
import AvatarForm from './../AvatarForm';
import HeaderProfile from './HeaderProfile';
import SettingsForm from './../SettingsForm/SettingsForm';
import Followers from './Followers';
import ImageNotFound from './../../../assets/png/avatar.png'

import './Profile.scss';

const Profile = ({ username }) => {

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [childrenModal, setChildrenModal] = useState(null);

    const { auth } = useAuth();

    const { data, loading, error, refetch } = useQuery(GET_USER, {
        variables: { username },
    });

    if (loading) return null;

    if (error) return <UserNotFound />

    const { getUser } = data;

    const handlerModal = (type) => {
        switch (type) {
            case "avatar":
                setTitleModal("Cambiar foto de perfil");
                setChildrenModal(
                    <AvatarForm setShowModal={setShowModal} auth={auth} />
                );
                setShowModal(true);
                break;
            case "settings":
                setTitleModal("");
                setChildrenModal(
                    <SettingsForm 
                        setShowModal={setShowModal} 
                        setTitleModal={setTitleModal} 
                        setChildrenModal={setChildrenModal} 
                        getUser={getUser}
                        refetch={refetch}
                    />
                );
                setShowModal(true);
                break;
            default:
                break;
        }
    }

    return (
        <Fragment>
            <Grid className="profile">
                <Grid.Column width={5} className="profile__left">
                    <Image 
                        src={getUser.avatar ? getUser.avatar : ImageNotFound} 
                        avatar 
                        onClick={() => username === auth.username && handlerModal("avatar")} 
                    />
                </Grid.Column>

                <Grid.Column width={11} className="profile__right">
                    <HeaderProfile getUser={getUser} auth={auth} handlerModal={handlerModal} />
                    <Followers username={username} />
                    <div className="other">
                        <p className="name">{getUser.name}</p>
                        {getUser.siteWeb && (
                            <a href={getUser.siteWeb} className="siteWeb" target="_blank">
                                {getUser.siteWeb}
                            </a>
                        )}
                        {getUser.description && (
                            <p className="description">{getUser.description}</p>
                        )}
                    </div>
                </Grid.Column>
            </Grid>
            <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
                {childrenModal}
            </ModalBasic>
        </Fragment>
    );
};

export default Profile;
