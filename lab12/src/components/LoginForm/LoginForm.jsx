import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { AuthService } from "../../services/AuthService";
import { useState } from "react";
import "./LoginForm.css";

const initialValues = {
    email: "",
    password: "",
};

const loginFormSchema = Yup.object().shape({
    email: Yup.string()
        .required("Required")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Invalid Email"
        ),
    password: Yup.string()
        .required("Required")
        .min(8, "Minimum 8 characters"),
});

function LoginForm() {
    const authService = new AuthService();
    const [visible, setVisible] = useState(false);

    const formik = useFormik({
        initialValues,
        validationSchema: loginFormSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await authService.login(values); // Call login API
                toast.success("Login successful!");
                localStorage.setItem("token", response.token);
                resetForm(); // Reset form on success
            } catch (error) {
                toast.error(
                    error.response?.data?.message || "Login failed. Please try again."
                );
            }
        },
    });

    const toggleView = () => {
        setVisible(!visible);
    };

    return (
        <div>
            <div className="body">
                <div className="container">
                    <div className="form kanit-bold">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="input-container">
                                <h2 style={{ textAlign: "center" }} className="heading">
                                    Welcome Back!
                                </h2>
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
                                    className="text-box"
                                    {...formik.getFieldProps("password")}
                                />
                                <span className="error">
                                    {formik.touched.password && formik.errors.password}
                                </span>
                            </div>
                            <button
                                type="submit"
                                className="submit-btn"
                                disabled={Object.keys(formik.errors).length > 0}
                            >
                                Login
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

export default LoginForm;
