import { useEffect, useState } from "react";

import { IProductItem } from "../../../../entities/Product";
import http_common from "../../../../http_common";
import ListGroup from "../../../common/ListGroup";

const ProductListPage = () => {
  const [list, setList] = useState<Array<IProductItem>>([]);

  useEffect(() => {
    http_common
      .get("api/products", {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      })
      .then((resp) => {
        setList(resp.data);
      });
  }, []);
  console.log("List data: ", list);

  const handleDelete = async (id: number) => {
    try {
      await http_common
        .delete(`api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then(() => {
          http_common
            .get("api/products", {
              headers: {
                Authorization: `Bearer ${localStorage.token}`,
              },
            })
            .then((resp) => {
              setList(resp.data);
            });
        });
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <ListGroup
        label={"Товарів"}
        DeleteProductHandler={handleDelete}
        items={list}
      />
    </>
  );
};

export default ProductListPage;
