import React from 'react';

import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from './../../../gql/user';

import './ResetPasswordForm.scss';

function ResetPasswordForm({ logout }) {

    const [updateUser] = useMutation(UPDATE_USER);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            currentPassword: Yup.string()
                                .required("La contraseña actual es obligatoria."),
            newPassword: Yup.string()
                            .required("Este campo es obligatorio.")
                            .oneOf([Yup.ref("repeatNewPassword")], "Las contraseñas deben iguales."),
            repeatNewPassword: Yup.string()
                                    .required("Este campo es obligatorio.")
                                    .oneOf([Yup.ref("newPassword")], "Las contraseñas deben iguales."),
        }),
        onSubmit: async (formValues) => {
            try {
                const result = await updateUser({
                    variables: {
                        input: {
                            currentPassword: formValues.currentPassword,
                            newPassword: formValues.newPassword,
                        },
                    },
                });

                if (!result.data.updateUser) {
                    toast.error("La contraseña ingresada no es correcta.");
                } else {
                    logout();
                }
            } catch (error) {
                toast.error("Error al cambiar la contraseña.");
            }
        },
    });

    return (
        <Form className="reset-password-form" onSubmit={formik.handleSubmit}>
            <Form.Input 
                type="password"
                placeholder="Contraseña actual"
                name="currentPassword"
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                error={formik.errors.currentPassword}
            />

            <Form.Input 
                type="password"
                placeholder="Nueva contraseña"
                name="newPassword"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                error={formik.errors.newPassword}
            />

            <Form.Input 
                type="password"
                placeholder="Repetir nueva contraseña"
                name="repeatNewPassword"
                value={formik.values.repeatNewPassword}
                onChange={formik.handleChange}
                error={formik.errors.repeatNewPassword}
            />

            <Button className="btn-submit" type="submit">Actualizar</Button>
        </Form>
    );
};

export default ResetPasswordForm;

function initialValues() {
    return {
        currentPassword: "",
        newPassword: "",
        repeatNewPassword: "",
    }
};