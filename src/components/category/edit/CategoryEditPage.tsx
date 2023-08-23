import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ICategoryEdit } from "./types";

const CategoryEditPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  let init: ICategoryEdit = {
    name: "",
    image: "",
    description: "",
  };
  useEffect(() => {
    axios
      .get<ICategoryEdit>(`http://localhost:8080/category/${id}`)
      .then((response) => {
        const category = response.data;
        formik.setValues(category);
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  }, [id]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    image: Yup.string().required("Image is required"),
    description: Yup.string().required("Description is required"),
  });

  const onFormikSubmit = async (values: ICategoryEdit) => {
    try {
      let res = await axios.put(
        `http://localhost:8080/category/${id}`,
        values
      );
      console.log("updated!");
      navigate("/");
    } catch {
      console.log("Server error");
    }
  };

  const formik = useFormik({
    initialValues: init,
    validationSchema: validationSchema,
    onSubmit: onFormikSubmit,
  });
  const { values, handleChange, handleSubmit } = formik;
  return (
    <>
      <h1 className="text-center">Змінити категорію</h1>
      <div className="container">
        <form className="col-md-8 offset-md-2" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Назва
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={values.name}
              onChange={handleChange}
              name="name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Фото
            </label>
            <input
              type="text"
              className="form-control"
              id="image"
              value={values.image}
              onChange={handleChange}
              name="image"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Опис
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={values.description}
              onChange={handleChange}
              name="description"
            />
          </div>
            <button
              onClick={() => {
                navigate("/");
              }}
              className="btn btn-secondary "
            >
              Скасувати
            </button>
            <button type="submit" className="btn btn-primary">
              Змінити
            </button>

        </form>
      </div>
    </>
  );
};

export default CategoryEditPage;