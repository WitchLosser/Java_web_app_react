import { IRegisterPage } from "../types";
import * as yup from "yup";
import { useFormik } from "formik";
import InputGroup from "../../common/InputGroup";

const RegisterPage = () => {
  const initValues: IRegisterPage = {
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  };

  const registerschema = yup.object({
    email: yup.string().required("Поле не повинне бути пустим"),
    firstname: yup.string().required("Поле не повинне бути пустим"),
    lastname: yup.string().required("Поле не повинне бути пустим"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password must be at most 16 characters")
      .matches(/[a-z]/, "Password must contain at least 1 lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least 1 uppercase letter")
      .matches(/[0-9]/, "Password must contain at least 1 number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least 1 special character"
      ),
  });

  const onSubmitFormik = (values: IRegisterPage) => {
    console.log("Register form: ", values);
  };

  const formik = useFormik({
    initialValues: initValues,
    onSubmit: onSubmitFormik,
    validationSchema: registerschema,
    // validateOnChange: true,
  });

  const { values, handleSubmit, handleChange, touched, errors } = formik;
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <InputGroup
              label={"First Name"}
              field={"firstname"}
              value={values.firstname}
              onChange={handleChange}
            />
            {touched.firstname && errors.firstname && (
              <div className="text-red-600">{errors.firstname}</div>
            )}
            <InputGroup
              label={"Last Name"}
              field={"lastname"}
              value={values.lastname}
              onChange={handleChange}
            />
            {touched.lastname && errors.lastname && (
              <div className="text-red-600">{errors.lastname}</div>
            )}
            <InputGroup
              label={"Email"}
              field={"email"}
              onChange={handleChange}
              type="email"
            />
            {touched.email && errors.email && (
              <div className="text-red-600">{errors.email}</div>
            )}
            <InputGroup
              label={"Password"}
              field={"password"}
              onChange={handleChange}
              type="password"
            />
            {touched.password && errors.password && (
              <div className="text-red-600">{errors.password}</div>
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default RegisterPage;
