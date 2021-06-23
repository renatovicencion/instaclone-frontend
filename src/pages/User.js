import React, { Fragment } from 'react';

import { useParams } from 'react-router-dom';
import Profile from './../components/User/Profile';

function User() {

    const { username } = useParams();

    return (
        <Fragment>
            <Profile username={username} />
        </Fragment>
    );
};

export default User;
