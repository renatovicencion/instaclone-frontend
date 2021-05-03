import React, { Fragment } from 'react';

import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { useMutation } from "@apollo/client";
import { REGISTER } from './../../../gql/user';
import "./RegisterForm.scss";

const RegisterForm = ({ setShowLogin }) => {

    const [register] = useMutation(REGISTER); // Destructuring de array

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            name: Yup.string().required("Tu nombre es obligatorio."),
            username: Yup.string()
                        .matches(/^[a-zA-Z0-9-]*$/, "El nombre del usuario no puede tener espacios.")
                        .required("El nombre de usuario es obligatorio."),
            email: Yup.string().email("El email no es válido").required("El email es obligatorio."),
            password: Yup.string()
                        .required("La contraseña es obligatoria.")
                        .oneOf([Yup.ref("repeatPassword")], "Las contraseñas no son iguales."),
            repeatPassword: Yup.string()
                            .required("La contraseña es obligatoria.")
                            .oneOf([Yup.ref("password")], "Las contraseñas no son iguales."),
        }),
        onSubmit: async (formData) => {
            try {
                const newUser = formData;
                delete newUser.repeatPassword;

                const result = await register({
                    variables: {
                        input: newUser,
                    }
                });
                toast.success("Usuario registrado con éxito.");
                setShowLogin(true);
            } catch (error) {
                toast.error(error.message);
            }
        }
    });

    return (
        <Fragment>
            <h2 className="register-form-title">Regístrate para ver fotos y videos de tus amigxs.</h2>
            <Form className="register-form" onSubmit={formik.handleSubmit}>
                <Form.Input
                    type="text"
                    placeholder="Nombre y Apellidos"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.errors.name}
                />

                <Form.Input
                    type="text"
                    placeholder="Nombre de Usuario"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.errors.username}
                />

                <Form.Input
                    type="text"
                    placeholder="Correo Electrónico"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.errors.email}
                />

                <Form.Input
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.errors.password}
                />

                <Form.Input
                    type="password"
                    placeholder="Repetir Contraseña"
                    name="repeatPassword"
                    value={formik.values.repeatPassword}
                    onChange={formik.handleChange}
                    error={formik.errors.repeatPassword}
                />

                <Button type="submit" className="btn-submit">Registrarse</Button>
                {/*<Button type="button" onClick={formik.handleReset}>Reset</Button>*/}
            </Form>
        </Fragment>
    );
};

function initialValues() {
    return {
        name: "",
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
    }
}

export default RegisterForm;
