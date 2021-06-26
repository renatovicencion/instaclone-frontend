import React, { Fragment, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { size } from 'lodash';
import { useQuery } from '@apollo/client';
import { GET_PUBLICATIONS } from './../gql/publication';
import Profile from './../components/User/Profile';
import Publications from './../components/Publications';

function User() {

    const { username } = useParams();
    const { data, loading, startPolling, stopPolling } = useQuery(GET_PUBLICATIONS, {
        variables: {
            username,
        },
    });

    useEffect(() => {
        startPolling(1000);
        return () => {
            stopPolling();
        }
    }, [startPolling, stopPolling]);

    if (loading) return null;
    const { getPublications } = data;

    return (
        <Fragment>
            <Profile username={username} totalPublications={size(getPublications)} />
            <Publications getPublications={getPublications} />
        </Fragment>
    );
};

export default User;
