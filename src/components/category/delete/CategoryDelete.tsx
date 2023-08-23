import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const CategoryDelete: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState<number | null>(null);

  const handleDelete = (categoryId: number) => {
    setCategoryIdToDelete(categoryId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (categoryIdToDelete) {
      axios.delete(`http://localhost:8080/category/${categoryIdToDelete}`)
        .then(() => {
          // Handle successful deletion (e.g., show success message)
          // Optionally, you can update the list of categories in the state or refetch them
          setShowModal(false);
        })
        .catch((error) => {
          console.error(error);
          // Handle error case (e.g., show error message)
          setShowModal(false);
        });
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };


  return (
    <div>

      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this category?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CategoryDelete;