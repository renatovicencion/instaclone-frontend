import React, { Fragment } from 'react';

import {┬áContainer } from 'semantic-ui-react';
import Header from './../components/Header';

const LayoutBasic = ({ children }) => {
    return (
        <Fragment>
            <Header />
            <Container className="layout-basic">
                {children}
            </Container>
        </Fragment>
    );
};

export default LayoutBasic;
