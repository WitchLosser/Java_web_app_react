import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import http_common from "../../../../http_common.ts";
import InputGroup from "../../../common/InputGroup.tsx";
import { ICategoryCreate } from "../../../../entities/Category.ts";
import * as Yup from "yup";
import TextAreaGroup from "../../../common/TextAreaGroup.tsx";
import ImageGroup from "../../../common/ImageGroup.tsx";

const CategoryCreatePage = () => {
  const navigate = useNavigate();

  const init: ICategoryCreate = {
    name: "",
    image: null,
    description: "",
  };

  const createCategorySchema = Yup.object().shape({
    name: Yup.string().required("Назва обов'язкова"),
    image: Yup.mixed().required("Фото обов'язкове"),
    description: Yup.string(),
  });

  const onFormikSubmit = async (values: ICategoryCreate) => {
    try {
      await http_common.post("api/categories", values, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      navigate("/");
    } catch {
      console.log("Server error");
    }
  };

  const formik = useFormik({
    initialValues: init,
    onSubmit: onFormikSubmit,
    validationSchema: createCategorySchema, // Apply validation schema
  });

  const {
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    errors,
    touched,
    handleBlur,
  } = formik;

  return (
    <>
      <div className="mx-auto text-center">
        <h1 className="text-3xl  font-bold text-black sm:text-4xl">
          Додати категорію
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <InputGroup
          label="Name"
          type="text"
          field="name"
          handleBlur={handleBlur}
          error={errors.name}
          touched={touched.name}
          handleChange={handleChange}
        ></InputGroup>
        <TextAreaGroup
          label="Description"
          field="description"
          handleChange={handleChange}
          error={errors.description}
          touched={touched.description}
          handleBlur={handleBlur}
        ></TextAreaGroup>
        <ImageGroup
          image={values.image}
          setFieldValue={setFieldValue}
          error={errors.image}
          touched={touched.image}
        ></ImageGroup>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Додати
        </button>
      </form>
    </>
  );
};

export default CategoryCreatePage;
