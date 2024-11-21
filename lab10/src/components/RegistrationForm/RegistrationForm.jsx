// import { useFormik } from "formik";
// import { useEffect, useState } from "react";
// import "./RegistrationForm.css";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import * as Yup from "yep";
//
// const initialValues = {
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
// };
//
// // const registerFormSchema = Yup.object().shape({
// //     name:Yup.string().required("Required").max(20,"Maximum 20 letters").min(2,"Minimum 2 Characters"),
// //     email:Yup.string().required("Required").email('Invalid Email'),
// //     password:Yup.string().required("Required").min(8,"Minimum 8 Characters"),
// //     //.matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]$/,"Minimum 8 character , Atleast One Capital letter,One Symbol & One Digit"),
// //     confirmPassword:Yup.string().required("Required").oneOf([Yup.ref("password"),""],"Password Doesn't match")
// // })
//
// function RegistrationForm() {
//     const formik = useFormik({
//         initialValues,
//         // validationSchema: registerFormSchema,
//         onSubmit: (values, { resetForm }) => {
//             localStorage.setItem("userData", JSON.stringify(values));
//             console.log(formik.initialValues);
//             resetForm();
//             toast.success("Registered Successfully");
//         },
//     });
//
//     const [visible, setVisible] = useState(false);
//
//     const toggleView = () => {
//         setVisible(!visible);
//     };
//
//     const [security, setSecurity] = useState("poor");
//
//     useEffect(() => {
//         const passwordLength = formik.values.password.length;
//         if (passwordLength > 10) {
//             setSecurity("strong");
//         } else if (passwordLength >= 5 && passwordLength <= 8) {
//             setSecurity("medium");
//         } else {
//             setSecurity("poor");
//         }
//     }, [formik.values.password]);
//
//     return (
//         <div>
//             <div className="body">
//                 <div className="container">
//                     <div className="form kanit-bold">
//                         <form onSubmit={formik.handleSubmit}>
//                             <div className="input-container">
//                                 <h2 style={{ textAlign: "center" }} className="heading">
//                                     Hello, Friend!
//                                 </h2>
//                                 <label htmlFor="name" className="text-label">
//                                     Name
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="name"
//                                     placeholder="Enter Name"
//                                     className="text-box"
//                                     {...formik.getFieldProps("name")}
//                                 />
//                                 <span className="error">
//                   {formik.touched.name && formik.errors.name}
//                 </span>
//                             </div>
//                             <div className="input-container">
//                                 <label htmlFor="email" className="text-label">
//                                     Email
//                                 </label>
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     placeholder="Enter Email"
//                                     className="text-box"
//                                     {...formik.getFieldProps("email")}
//                                 />
//                                 <span className="error">
//                   {formik.touched.email && formik.errors.email}
//                 </span>
//                             </div>
//                             <div className="input-container">
//                                 <label htmlFor="password" className="text-label">
//                                     Password
//                                     <button
//                                         type="button"
//                                         onClick={toggleView}
//                                         className="view-btn"
//                                     >
//                                         {visible ? "Hide" : "View"}
//                                     </button>
//                                 </label>
//                                 <input
//                                     type={visible ? "text" : "password"}
//                                     name="password"
//                                     placeholder="Enter Password"
//                                     className={`text-box ${security}`}
//                                     {...formik.getFieldProps("password")}
//                                 />
//                                 <span className="error">
//                   {formik.touched.password && formik.errors.password}
//                 </span>
//                             </div>
//                             <div className="input-container">
//                                 <label htmlFor="confirmPassword" className="text-label">
//                                     Confirm Password
//                                 </label>
//                                 <input
//                                     type="password"
//                                     name="confirmPassword"
//                                     placeholder="Enter Confirm Password"
//                                     className="text-box"
//                                     {...formik.getFieldProps("confirmPassword")}
//                                 />
//                                 <span className="error">
//                   {formik.touched.confirmPassword &&
//                       formik.errors.confirmPassword}
//                 </span>
//                             </div>
//                             <button
//                                 type="submit"
//                                 className="submit-btn"
//                                 disabled={Object.keys(formik.errors).length > 0}
//                             >
//                                 Register
//                             </button>
//                         </form>
//                     </div>
//                     <div className="details">
//                         <h3 className="details-heading">Glad to see you</h3>
//                         <p className="details-para">
//                             Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                         </p>
//                     </div>
//                 </div>
//             </div>
//             <ToastContainer
//                 position="top-right"
//                 autoClose={5000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="light"
//                 tra
//             />
//         </div>
//     );
// }
//
// export default RegistrationForm;
