import React from 'react';

import { Image } from 'semantic-ui-react';
import ImageNotFound from './../../../assets/png/avatar.png';
import { size, map } from 'lodash';
import { useHistory } from 'react-router-dom';

import './ListUsers.scss';

function ListUsers({ users, setShowModal }) {

    const history = useHistory();

    const goToUser = (username) => {
        setShowModal(false);
        history.push(`/${username}`);
    }

    return (
        <div className="list-users">
            { 
                size(users) === 0 ? (
                    <p className="list-users__not-users">Aún no tiene seguidores.</p>
                ) : (
                    map(users, (user, index) => (
                        <div key={index} className="list-users__user" onClick={() => goToUser(user.username)}>
                            <Image src={user.avatar || ImageNotFound} avatar />
                            <div>
                                <p>{user.name}</p>
                                <p>{user.username}</p>
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    );
};

export default ListUsers;
