
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';
import styles from "../../../styles/Create.module.css"

const CreateModal = ({ name,setCategories }) => {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const [post, setPost] = useState({
        itemName: '',
        description:  '',
        price:'',
        img: '',
        type:name
    })
    const handleFileRead = async (e) => {
        const file = e.target.files[0]
        const base64 = await convertBase64(file)
        setPost(prev => {
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
            const res = await fetch(`http://localhost:5000/api/gadjetPost/${name}`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(post)
            })
            const data = await res.json()
            
           data && setCategories((prev) => {
                return [
                    ...prev,
                    data
                ]
            })
            setModal(false)
        } 
        
        catch (e) { alert("Image Format Is Incorrect") }


    }
    return (
        <div>
            <div className={styles.createBtn} onClick={toggle}  >
                <button className={`${styles.iconbtn} ${styles.addbtn}`}>
                    <div className={styles.addicon}></div>
                    <div className={styles.btntxt}>Create</div>
                </button>
            </div>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody style={{height:"400px",display:"flex",flexDirection:"column",justifyContent:"center" }}>
                    <Label>
                        <strong>Name</strong>
                        <Input
                            style={{ margin: "5px" }}
                            value={post.itemName}
                            onChange={e => setPost({ ...post, itemName: e.target.value })}
                            type='text'
                        />
                    </Label>
                    <Label>
                        <strong>Description</strong>
                        <Input
                            style={{ margin: "5px" }}
                            value={post.description}
                            onChange={e => setPost({ ...post, description: e.target.value })}
                            type='text'
                        />

                    </Label>
                    <Label>
                        <strong>Price</strong>
                        <Input style={{ margin: "5px" }}
                            value={post.price}
                            onChange={e => setPost({ ...post, price: e.target.value })}
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
                    <Button color="primary" onClick={submit}>
                        Create
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default CreateModal;