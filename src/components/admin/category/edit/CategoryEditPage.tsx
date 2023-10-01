import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import http_common from "../../../../http_common";
import InputGroup from "../../../common/InputGroup";
import { ICategoryEdit, ICategoryItem } from "../../../../entities/Category";
import * as Yup from "yup"; // Import Yup
import TextAreaGroup from "../../../common/TextAreaGroup";
import ImageGroup from "../../../common/ImageGroup";

const CategoryEditPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [categories, setCategories] = useState<ICategoryItem[]>([]);

  const [initialValues, setInitialValues] = useState<ICategoryEdit>({
    name: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    http_common
      .get("api/categories", {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      })
      .then((resp) => {
        setCategories(resp.data);
      });
    http_common
      .get(`api/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      })
      .then(async (resp) => {
        const response = await http_common.get(
          `/uploading/600_${resp.data.image}`,
          {
            responseType: "blob",
          }
        );
        const blob = response.data;
        setInitialValues((prevValues) => ({
          ...prevValues,
          name: resp.data.name,
          description: resp.data.description,
          image: new File([blob], resp.data.image),
        }));
      });
  }, []);

  const categorySchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .max(255, "Name must be smaller")
      .test("unique-category", "Category already exists", function (value) {
        if (!value) {
          return false;
        }
        const categoryExists = categories.some(
          (c: ICategoryItem) =>
            c.name.toLowerCase() === value.toLowerCase() && c.id !== Number(id)
        );
        return !categoryExists;
      }),
    description: Yup.string()
      .required("Description is required")
      .max(4000, "Description must be smaller"),
    image: Yup.mixed().required("Image is required"),
  });

  const handleSubmit = async (values: ICategoryEdit) => {
    try {
      await categorySchema.validate(values);
      await http_common.put(`api/categories/${id}`, values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("..");
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  return (
    <>
      <div className="mx-auto text-center">
        <h1 className="text-3xl  font-bold text-black sm:text-4xl">
          Зміна категорії
        </h1>
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={categorySchema}
        enableReinitialize={true}
      >
        {({
          handleChange,
          values,
          errors,
          touched,
          setFieldValue,
          handleBlur,
        }) => (
          <Form>
            <i
              className="bi bi-arrow-left-circle-fill back-button"
              onClick={() => navigate("..")}
            ></i>
            <InputGroup
              label="Name"
              type="text"
              field="name"
              handleBlur={handleBlur}
              error={errors.name}
              touched={touched.name}
              handleChange={handleChange}
              value={values.name}
            ></InputGroup>
            <TextAreaGroup
              label="Description"
              field="description"
              handleChange={handleChange}
              error={errors.description}
              touched={touched.description}
              handleBlur={handleBlur}
              value={values.description}
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
              Змінити
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CategoryEditPage;
