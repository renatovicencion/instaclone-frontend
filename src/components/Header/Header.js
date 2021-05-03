import React from 'react';

import { Container, Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import logo from './../../assets/png/instaclone.png';
import RightHeader from './RightHeader';

import './Header.scss';

const Header = () => {
    return (
        <div className="header">
            <Container>
                <Grid>
                    <Grid.Column width={3} className="header__logo">
                        <Link to="/">
                            <Image src={logo} alt="Instaclone" />
                        </Link>
                    </Grid.Column>

                    <Grid.Column width={10}>
                        <p>Buscador</p>
                    </Grid.Column>

                    <Grid.Column width={3}>
                        <RightHeader />
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    );
};

export default Header;
