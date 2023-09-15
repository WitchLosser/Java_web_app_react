import { ILoginPage } from "../types";
import * as yup from "yup";
import { useFormik } from "formik";

import InputGroup from "../../common/InputGroup";

const LoginPage = () => {
  const initValues: ILoginPage = {
    email: "",
    password: "",
  };

  const loginSchema = yup.object({
    email: yup.string().required("Поле не повинне бути пустим"),
    password: yup.string().required("Поле не повинне бути пустим"),
  });

  const onSubmitFormik = (values: ILoginPage) => {
    console.log("Login form: ", values);
  };

  const formik = useFormik({
    initialValues: initValues,
    onSubmit: onSubmitFormik,
    validationSchema: loginSchema,
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
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <InputGroup
              label={"Email"}
              field={"email"}
              value={values.email}
              onChange={handleChange}
              type="email"
            />
            {touched.email && errors.email && (
              <div className="text-red-600">{errors.email}</div>
            )}
            <InputGroup
              label={"Password"}
              field={"password"}
              value={values.password}
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
export default LoginPage;
