
import axios from 'axios';
import React, { useState } from 'react';
import { Button, Modal, ModalFooter, ModalHeader} from 'reactstrap';

const DeleteModal = ({item,setUsers}) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const removeUser = async (id) => {
        const response = await axios.delete(`http://localhost:5000/api/auth/users/${id}`)
        setUsers((prev => prev.filter(item => item._id !== id)))
        setModal(!modal)

    }

   
return (
    <div>
        <p onClick={toggle}>Delete</p>
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Are you sure?</ModalHeader>
            <ModalFooter>
                <Button color="primary" onClick ={ () => removeUser(item._id)}>
                    Yes
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>
                    No
                </Button>
            </ModalFooter>
        </Modal>
    </div>
);
}

export default DeleteModal;