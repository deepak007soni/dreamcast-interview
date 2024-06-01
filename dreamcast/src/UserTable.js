import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import "./UserTable.css";
import {
  fetchUsers,
  addUser,
  deleteUser,
  editUser,
} from "./features/usersSlice";
// } from "../features/usersSlice";
import { Table, Modal, Form, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const UserTable = () => {
  const [show, setShow] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    zip: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = () => {
    dispatch(
      addUser({
        id: users.length + 1,
        address: { city: userData.city, zipcode: userData.zip },
        ...userData,
      })
    );
    handleClose();
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  const handleEditUser = () => {
    dispatch(
      editUser({
        ...editingUser,
        address: { city: userData.city, zipcode: userData.zip },
        ...userData,
      })
    );
    handleClose();
  };

  const handleEditButtonClick = (user) => {
    setEditingUser(user);
    setUserData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      city: user.address.city,
      zip: user.address.zipcode,
    });
    handleShow();
  };

  return (
    <Container className="mt-4">
      <Button variant="primary" onClick={handleShow} className="mb-3">
        Add User
      </Button>
      <Table responsive bordered hover className="user-table">
        <thead className="table-dark">
          <tr>
            <th>ID :</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City with Zip Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, key) => (
            <tr key={user.id}>
              <td>{key + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                {user.address.city}, {user.address.zipcode}
              </td>
              <td>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => handleEditButtonClick(user)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingUser ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formPhone" className="mt-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                value={userData.phone}
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formCity" className="mt-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                value={userData.city}
                onChange={(e) =>
                  setUserData({ ...userData, city: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formZip" className="mt-3">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter zip code"
                value={userData.zip}
                onChange={(e) =>
                  setUserData({ ...userData, zip: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={editingUser ? handleEditUser : handleAddUser}
          >
            {editingUser ? "Save Changes" : "Add User"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserTable;
