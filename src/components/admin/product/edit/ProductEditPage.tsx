import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import http_common from "../../../../http_common";
import InputGroup from "../../../common/InputGroup";
import SelectGroup from "../../../common/SelectGroup";
import InputFileGroup from "../../../common/InputFileGroup";
import { ICategoryItem } from "../../../../entities/Category";
import { IPorductEdit } from "../../../../entities/Product";
import { IProductImage } from "../../../../entities/ProductImage";
import EditorTiny from "../../../common/EditorTiny";

const ProductEditPage = () => {
  const navigator = useNavigate();
  const { id } = useParams();

  const [model, setModel] = useState<IPorductEdit>({
    name: "",
    category_id: "",
    price: 0,
    description: "",
    files: [],
    removeFiles: [],
  });

  async function downloadAndConvertImages(images: string[]): Promise<File[]> {
    const files: File[] = [];
    for (const image of images) {
      const file = await downloadImage(image);
      files.push(file);
    }
    return files;
  }

  async function downloadImage(filename: string): Promise<File> {
    const response = await http_common.get(`/uploading/600_${filename}`, {
      responseType: "blob",
    });
    const blob = response.data;
    return new File([blob], filename);
  }

  const [categories, setCategories] = useState<Array<ICategoryItem>>([]);

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
    .get(`api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    })
    .then((resp) => {
      const images = resp.data.images.map(
        (image: IProductImage) => `${image.image}`,
      );

      downloadAndConvertImages(images).then((files) => {
        setModel((prevValues) => ({
          ...prevValues,
          name: resp.data.name,
          description: resp.data.description,
          categoryId: resp.data.categoryId,
          images: files,
        }));
      });
    });
  }, []);

  const createProductSchema = Yup.object().shape({
    name: Yup.string().required("Назва обов'язкова"),
    price: Yup.number().required("Ціна обов'язкова"),
    category_id: Yup.number().required("Категорія обов'язкова"),
    description: Yup.string(),
  });

  const formik = useFormik({
    initialValues: model,
    validationSchema: createProductSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("price", values.price.toString());
        formData.append("category_id", values.category_id.toString());
        formData.append("description", values.description);

        for (let i = 0; i < values.files.length; i++) {
          formData.append("files", values.files[i]);
        }

        await http_common.put(`api/products/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.token}`, },
        });

        navigator("/");
      } catch (error: any) {
        console.error("Error: ", error);
      }
    },
  });

  return (
    <div className="mx-auto max-w-7xl px-6">
      <h1 className="font-medium text-3xl">Зміна товару</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mt-8 grid lg:grid-cols-1 gap-4">
          <InputGroup
            label={"Назва"}
            value={formik.values.name}
            handleChange={formik.handleChange}
            field={"name"}
            error={formik.errors.name}
            handleBlur={formik.handleBlur}
          />

          <InputGroup
            label={"Ціна"}
            value={formik.values.price}
            handleChange={formik.handleChange}
            field={"price"}
            type={"number"}
            error={formik.errors.price}
            handleBlur={formik.handleBlur}
          />

          <SelectGroup
            label={"Категорія"}
            field={"category_id"}
            value={formik.values.category_id}
            onChange={formik.handleChange}
            items={categories}
          />

          <EditorTiny
            label="Description"
            field="description"
            onEditorChange={(text: string) => {
              formik.setFieldValue("description", text);
            }}
            error={formik.errors.description}
            touched={formik.touched.description}
            value={formik.values.description}
          ></EditorTiny>
          <InputFileGroup
            images={formik.values.files}
            setFieldValue={formik.setFieldValue}
            error={formik.errors.files}
            touched={formik.touched.files}
          ></InputFileGroup>
        </div>
        <div className="space-x-4 mt-8">
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
          >
            Save
          </button>
          <button onClick={()=>{navigator("/");}} className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductEditPage;
