import React from 'react';

import { Form, Button } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from './../../../gql/user';

import './ChangeSiteWebForm.scss';

function ChangeSiteWebForm({ setShowModal, currentSiteWeb, refetch }) {

    const [updateUser] = useMutation(UPDATE_USER);

    const formik = useFormik({
        initialValues: {
            siteWeb: currentSiteWeb || "",
        },
        validationSchema: Yup.object({
            siteWeb: Yup.string().required("Este campo es obligatorio."),
        }),
        onSubmit: async (formData) => {
            try {
                await updateUser({
                    variables: {
                        input: {
                            siteWeb: formData.siteWeb,
                        },
                    },
                });
                refetch();
                setShowModal(false);
            } catch (error) {
                toast.error("Error al actualizar sitio web.");
            }
        },
    });

    return (
        <Form className="change-site-web-form" onSubmit={formik.handleSubmit}>
            <Form.Input 
                name="siteWeb"
                value={formik.values.siteWeb}
                onChange={formik.handleChange}
                error={formik.errors.siteWeb}
            />

            <Button type="submit" className="btn-submit">Actualizar</Button>
        </Form>
    );
};

export default ChangeSiteWebForm;
