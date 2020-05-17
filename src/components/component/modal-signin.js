import React, {useState} from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';

function ModalSignIn() {
    const [show, setShow] = useState(false);
    const username = "";
    const password = "";

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <React.Fragment>
            <>
                <Button
                    onClick={handleShow}
                    size="md"
                    variant="danger"
                    className="ml-auto font-weight-bold navigationBar"
                    style={{ width: `10vw` }}>
                    <h5 className="h6 align-items-center my-auto font-weight-bold p-1">
                        Sign in
                    </h5>
                </Button>

                <Modal size="md"
      centered show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="font-weight-bold text-dark">Sign In</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="p-5 my-2">
                            <Form.Group controlId="formBasicEmail" className="mb-3">
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    placeholder="Username"
                                    className="input-group"
                                    onChange={(event) => {
                                    this.updateUsername(event.target.value)
                                    }}
                                    value={username}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword" className="mb-3">
                                <Form.Control
                                    size="lg"
                                    type="password"
                                    placeholder="Password"
                                    className="input-group"
                                    onChange={(event) => {
                                    this.updatePassword(event.target.value)
                                    }}
                                    value={password}
                                />
                            </Form.Group>
                            
                            <Button
                                variant="danger"
                                size="lg"
                                block
                                className="rounded-button"
                                onClick={() => {
                                    this.submit(username, password)
                                }}
                            >
                                <b>SIGN IN</b>
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className="d-block text-center">
                        <Link
                        to="/register"
                        className="text-decoration-none h5">
                            Create an account
                        </Link>
                    </Modal.Footer>
                </Modal>
            </>
        </React.Fragment>
    );
}

export default ModalSignIn;