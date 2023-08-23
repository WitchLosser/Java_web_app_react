import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

interface ICategoryItem {
  id: number;
  name: string;
  image: string;
  description: string;
}
const CategoryListPage = () => {
  const navigate = useNavigate();
  const [list, setList] = useState<ICategoryItem[]>([]);

  const [showModal, setShowModal] = useState(false);

  const [categoryIdToDelete, setCategoryIdToDelete] = useState<number | null>(
    null
  );

  const handleDelete = (categoryId: number) => {
    setCategoryIdToDelete(categoryId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (categoryIdToDelete) {
      axios
        .delete(
          `http://localhost:8080/category/${categoryIdToDelete}`
        )
        .then(() => {
          console.log("deleted!");
          setShowModal(false);
        })
        .catch((error) => {
          console.error(error);
          setShowModal(false);
          setList(list.filter(x=>x.id!==categoryIdToDelete));
        });
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    axios
      .get<ICategoryItem[]>("http://localhost:8080/category")
      .then((resp) => {
        console.log("Categories", resp.data);
        setList(resp.data);
      });
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="text-center">Список категорій</h1>
        <Link to="/category/create" className="btn btn-success">
          Додати
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Назва</th>
              <th scope="col">Фото</th>
              <th scope="col">Опис</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {list.map((c) => {
              return (
                <tr key={c.id}>
                  <th scope="row">{c.id}</th>
                  <td>{c.name}</td>
                  <td>{c.image}</td>
                  <td>{c.description}</td>
                  <td>
                    <Link
                      to={`/category/edit/${c.id}`}
                      className="btn btn-info"
                    >
                      Змінити
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(c.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal show={showModal} onHide={closeModal} top>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this category?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CategoryListPage;