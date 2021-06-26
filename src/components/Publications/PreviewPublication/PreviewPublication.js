import React, { Fragment } from 'react';

import { Image } from 'semantic-ui-react';

import './PreviewPublication.scss';

const PreviewPublication = ({ publication }) => {

    return (
        <Fragment>
            <div className="preview-publication">
                <Image className="preview-publication__image" src={publication.file} />
            </div>
        </Fragment>
    );
};

export default PreviewPublication;
