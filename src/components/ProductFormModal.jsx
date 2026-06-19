import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  Input,
  Label,
} from "reactstrap";

function ProductFormModal({ isOpen, toggle, onSave, initialData }) {
  const [form, setForm] = useState({
    id: null,
    name: "",
    details: "",
    price: "",
    quantity: "",
  });
  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = () => {
    if (!form.name || !form.price) return alert("Name and Price are required!");
    onSave(form);
  };
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        {form.id ? "Edit Product" : "Add Product"}
      </ModalHeader>
      <ModalBody>
        <Form>
          <Label>Name</Label>
          <Input name="name" value={form.name} onChange={handleChange} />
          <Label className="mt-2">Details</Label>
          <Input name="details" value={form.details} onChange={handleChange} />
          <Label className="mt-2">Price</Label>
          <Input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
          />
          <Label className="mt-2">Quantity</Label>
          <Input
            name="quantity"
            type="number"
            value={form.quantity}
            onChange={handleChange}
          />
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>
          Save
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
export default ProductFormModal;
