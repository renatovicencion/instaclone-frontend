import React from 'react';

import { Form, Button } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from './../../../gql/user';

import './ChangeEmailForm.scss';

function ChangeEmailForm({ setShowModal, currentEmail, refetch }) {

    const [updateUser] = useMutation(UPDATE_USER);

    const formik = useFormik({
        initialValues: {
            email: currentEmail || "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Email inválido").required("El email es obligatorio."),
        }),
        onSubmit: async (formData) => {
            try {
                await updateUser({
                    variables: {
                        input: {
                            email: formData.email,
                        }
                    }
                });
                refetch();
                setShowModal(false);
                toast.success("Email actualizado con éxito.");
            } catch (error) {
                toast.error("Error al actualizar email.");
            }
        }
    });

    return (
        <Form className="change-email-form" onSubmit={formik.handleSubmit}>
            <Form.Input 
                placeholder="Escribe tu nuevo email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email}
            />

            <Button type="submit" className="btn-submit">Actualizar</Button>
        </Form>
    );
};

export default ChangeEmailForm;
