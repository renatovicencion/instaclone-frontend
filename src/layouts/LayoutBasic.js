import React, { Fragment } from 'react';

import { Container } from 'semantic-ui-react';

const LayoutBasic = ({ children }) => {
    return (
        <Fragment>
            <h1>Header</h1>
            <Container className="layout-basic">
                {children}
            </Container>
        </Fragment>
    );
};

export default LayoutBasic;
