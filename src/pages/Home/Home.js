import React from 'react';

import { Grid } from 'semantic-ui-react';
import Feed from './../../components/Home/Feed';
import UsersNotFolloweds from './../../components/Home/UsersNotFolloweds';

import useAuth from './../../hooks/useAuth';

import './Home.scss';
const Home = () => {

    const auth = useAuth();
    
    return (
        <Grid className="home">
            <Grid.Column className="home__left" width={11}>
                <Feed />
            </Grid.Column>

            <Grid.Column className="home__left" width={5}>
                <UsersNotFolloweds />
            </Grid.Column>
        </Grid>
    );
};

export default Home;
