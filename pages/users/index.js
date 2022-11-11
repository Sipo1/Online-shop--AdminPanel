import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import styles from "../../styles/Users.module.css"
import DeleteModal from './../../src/components/modal/deleteModal';
import Link from 'next/link';

const Users = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/auth/users")
            .then(res => setUsers(res.data))
    }, []);

    return (
        <div className={styles.wrapper}>
            <p className={styles.title}>Users ({users.length})</p>
            <div className={styles.userWrapper}>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Photo</th>
                            <th>Username</th>
                            <th>options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map((item, index) => (
                            <tr key={index}>
                                <th scope="row" className={styles.idPart}>{index + 1}</th>
                                <td style={{ width: "150px" }} ><img src={item.img ? item.img : "/user.png"} style={{ width: "80px", height: "80px", borderRadius: "50%" }} /></td>
                                <td className={"w-50"}>{item.username}</td>

                                <td style={{ width: "2%" }}>
                                    <button className={styles.btn}>
                                        <DeleteModal item={item} setUsers={setUsers} />
                                        <Link href={{ pathname : `/users/${item._id}`,}}>
                                            <p style={{color:"blue"}}>Details</p>
                                        </Link>

                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default Users;
