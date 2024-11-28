import { useFormik } from "formik";
import { useEffect, useState } from "react";
import "./RegistrationForm.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from 'yup';

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const registerFormSchema = Yup.object().shape({
    firstName: Yup.string()
        .required("Required")
        .max(20, "Maximum 20 characters")
        .min(2, "Minimum 2 characters"),
    lastName: Yup.string()
        .required("Required")
        .max(20, "Maximum 20 characters")
        .min(2, "Minimum 2 characters"),
    email: Yup.string()
        .required("Required")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Invalid Email"
        ),
    password: Yup.string()
        .required("Required")
        .min(8, "Minimum 8 characters"),
    confirmPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), ""], "Passwords don't match"),
});

function RegistrationForm() {
    const formik = useFormik({
        initialValues,
        validationSchema: registerFormSchema,
        onSubmit: (values, { resetForm }) => {
            localStorage.setItem("userData", JSON.stringify(values));
            resetForm();
            toast.success("Registered Successfully");
        },
    });

    const [visible, setVisible] = useState(false);

    const toggleView = () => {
        setVisible(!visible);
    };

    const [security, setSecurity] = useState("poor");

    useEffect(() => {
        const passwordLength = formik.values.password.length;
        if (passwordLength > 10) {
            setSecurity("strong");
        } else if (passwordLength >= 5 && passwordLength <= 8) {
            setSecurity("medium");
        } else {
            setSecurity("poor");
        }
    }, [formik.values.password]);

    return (
        <div>
            <div className="body">
                <div className="container">
                    <div className="form kanit-bold">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="input-container">
                                <h2 style={{ textAlign: "center" }} className="heading">
                                    Hello, Friend!
                                </h2>
                                <label htmlFor="firstName" className="text-label">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="Enter First Name"
                                    className="text-box"
                                    {...formik.getFieldProps("firstName")}
                                />
                                <span className="error">
                                    {formik.touched.firstName && formik.errors.firstName}
                                </span>
                            </div>
                            <div className="input-container">
                                <label htmlFor="lastName" className="text-label">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Enter Last Name"
                                    className="text-box"
                                    {...formik.getFieldProps("lastName")}
                                />
                                <span className="error">
                                    {formik.touched.lastName && formik.errors.lastName}
                                </span>
                            </div>
                            <div className="input-container">
                                <label htmlFor="email" className="text-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter Email"
                                    className="text-box"
                                    {...formik.getFieldProps("email")}
                                />
                                <span className="error">
                                    {formik.touched.email && formik.errors.email}
                                </span>
                            </div>
                            <div className="input-container">
                                <label htmlFor="password" className="text-label">
                                    Password
                                    <button
                                        type="button"
                                        onClick={toggleView}
                                        className="view-btn"
                                    >
                                        {visible ? "Hide" : "View"}
                                    </button>
                                </label>
                                <input
                                    type={visible ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter Password"
                                    className={`text-box ${security}`}
                                    {...formik.getFieldProps("password")}
                                />
                                <span className="error">
                                    {formik.touched.password && formik.errors.password}
                                </span>
                            </div>
                            <div className="input-container">
                                <label htmlFor="confirmPassword" className="text-label">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    className="text-box"
                                    {...formik.getFieldProps("confirmPassword")}
                                />
                                <span className="error">
                                    {formik.touched.confirmPassword && formik.errors.confirmPassword}
                                </span>
                            </div>
                            <div className="input-container">
                                <span className="error">
                                    {formik.touched.message && formik.errors.message}
                                </span>
                            </div>
                            <button
                                type="submit"
                                className="submit-btn"
                                disabled={Object.keys(formik.errors).length > 0}
                            >
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default RegistrationForm;
