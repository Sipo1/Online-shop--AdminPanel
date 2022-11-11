import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';

const EditModal = (props) => {
    const [modal, setModal] = useState(false);
    // const [imgBase64, setImgBase64] = useState('');

    const toggle = () => setModal(!modal);
    const [editedState, setEditedState] = useState({
        itemName: props.name || '',
        description: props.desc || '',
        price: props.price || '',
        img: props.src || '',
    })


    const handleFileRead = async (e) => {
        const file = e.target.files[0]
        const base64 = await convertBase64(file)
        // setImgBase64(base64)
        setEditedState(prev => {
            return {
                ...prev,
                img: base64
            }
        })
    };
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    };

    const submit = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/gadjetPut/${props.itemName}/${props.id}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editedState)
            })
            const data = await res.json()
            window.location.reload()
            setModal(false)
        } catch (e) { alert("Image Format Is Incorrect") }


    }

    return (
        <div>
            <img style={{ cursor: "pointer" ,width: "30px",height:"30px"}} src="/edit.png" onClick={toggle} />
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}> Edit {name} </ModalHeader>
                <ModalBody style={{ height: "500px", display: "flex", flexDirection: "column" }} >
                    <Label>
                        <strong>Name</strong>
                        <Input
                            style={{ margin: "5px" }}
                            value={editedState.itemName}
                            onChange={e => setEditedState({ ...editedState, itemName: e.target.value })}
                            type='text'
                        />
                    </Label>
                    <Label>
                        <strong>Description</strong>
                        <Input
                            style={{ margin: "5px" }}
                            value={editedState.description}
                            onChange={e => setEditedState({ ...editedState, description: e.target.value })}
                            type='text'
                        />

                    </Label>
                    <Label>
                        <strong>Price</strong>
                        <Input style={{ margin: "5px" }}
                            value={editedState.price}
                            onChange={e => setEditedState({ ...editedState, price: e.target.value })}
                            type='text'
                        />

                    </Label >
                    <Label >
                        <strong>Image </strong>
                        <Input style={{ margin: "5px" }}
                            type='file'
                            onChange={e => handleFileRead(e)}
                        />
                    </Label>


                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={submit} >
                        Edit
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default EditModal




