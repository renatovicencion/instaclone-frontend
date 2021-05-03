import React, { Fragment } from 'react';

import { Grid, Image } from 'semantic-ui-react';
import { useQuery } from '@apollo/client';
import { GET_USER } from './../../gql/user';
import UserNotFound from './../UserNotFound';
import ImageNotFound from './../../assets/png/avatar.png'

import './Profile.scss';

const Profile = ({ username }) => {

    const { data, loading, error } = useQuery(GET_USER, {
        variables: { username },
    });

    if (loading) return null;

    if (error) return <UserNotFound />

    const { getUser } = data;

    return (
        <Fragment>
            <Grid className="profile">
                <Grid.Column width={5} className="profile__left">
                    <Image src={ImageNotFound} avatar />
                </Grid.Column>

                <Grid.Column width={11} className="profile__right">
                    <div>HeaderProfile</div>
                    <div>Followers</div>
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
        </Fragment>
    );
};

export default Profile;
