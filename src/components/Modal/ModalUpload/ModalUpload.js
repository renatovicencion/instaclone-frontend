import React, { Fragment, useCallback, useState } from 'react';

import { Modal, Icon, Button, Dimmer, Loader } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/client';
import { PUBLISH } from './../../../gql/publication';

import './ModalUpload.scss';

function ModalUpload({ show, setShow }) {

    const [fileUpload, setFileUpload] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [publish] = useMutation(PUBLISH); 

    const onDrop = useCallback((acceptedFile) => {
        const file = acceptedFile[0];
        setFileUpload({
            type: "image",
            file,
            preview: URL.createObjectURL(file),
        });
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop
    });

    const onClose = () => {
        setShow(false);
        setFileUpload(null);
        setIsLoading(false); 
        // window.location.reload();
    };

    const onPublish = async () => {
        try {
            setIsLoading(true);
            const result = await publish({
                variables: {
                    file: fileUpload.file,
                },
            });

            const { data } = result;

            if (!data.publish.status) {
                toast.warning("Error al publicar.");
                setIsLoading(false);
            } else {
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Modal size="small" open={show} onClose={onClose} className="modal-upload">
            <div 
                { ...getRootProps() } 
                className="dropzone" 
                style={ fileUpload && { border: 0}}
            >
                { 
                    !fileUpload && (
                        <Fragment>
                            <Icon name="cloud upload" />
                            <p>Arrastra tu foto que quieras publicar.</p>
                        </Fragment>
                    )
                    
                }
                
                <input { ...getInputProps() } />
            </div>

            { 
                fileUpload?.type === "image" && (
                    <div 
                        className="image" 
                        style={{ backgroundImage: `url("${fileUpload.preview}")`}} 
                    />
                )
            }

            {
                fileUpload && (
                    <Button className="btn-upload btn-action" onClick={onPublish}>
                        Publicar
                    </Button>
                )
            }

            {
                isLoading && (
                    <Dimmer active className="publishing">
                        <Loader />
                        <p>Publicando...</p>
                    </Dimmer>
                )
            }
        </Modal>
    );
};

export default ModalUpload;
