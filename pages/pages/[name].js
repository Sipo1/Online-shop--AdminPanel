import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table } from 'reactstrap';
import styles from "../../styles/SinglePageCategories.module.css"
import EditModal from '../../src/components/modal/editModal'
import CreateModal from "../../src/components/modal/createModal"

export const getServerSideProps = async (context) => {
    const { name } = context.params
    return {
        props: {
            name
        }
    }
}

const SinglePageCategories = ({ name }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`http://localhost:5000/api/gadjetGet/${name}`)
            .then((res) => {
                setLoading(false)
                return setCategories(res.data)
            })

    }, [setLoading]);

    const deleteOneCard = async (id) => {
        const res = await axios.delete(`http://localhost:5000/api/gadjetDelete/${name}/${id}`)
        res.data && setCategories((prev) => {
            return prev.filter(item => item._id != id)
        })
    }

    return (<>
        {loading ?
            <div className={styles.loader}>
                <span>Loading...</span>
            </div>
            :

            <div className={styles.wrapper}>
                <CreateModal name={name} setCategories={setCategories} />
                <div style={{width: '90%', overflowY: 'scroll'}}>
                    <Table style={{ width: "100%" }} responsive hover bordered >
                        <thead >
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((item, index) => (
                                index == 0
                                    ?
                                    <p className={styles.title} key={item._id}>{item.name} ({categories.length - 1})</p>
                                    :
                                    <tr key={item._id}>
                                        <th scope="row">{index}</th>
                                        <td className={styles.image} ><img src={item.img} /></td>
                                        <td className={styles.name}>{item.name}</td>
                                        <td className={styles.desc}>{item.description}</td>
                                        <td className={styles.price}>{item.price}</td>
                                        <td>
                                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                                <button onClick={() => deleteOneCard(item._id)} style={{ marginBottom: "30px", background: "red", color: "white", border: "none" }}>X</button>
                                                <EditModal
                                                    itemName={name}
                                                    name={item.name}
                                                    desc={item.description}
                                                    price={item.price}
                                                    id={item._id}
                                                    src={item.img} />
                                            </div>

                                        </td>

                                    </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

            </div>
        } </>

    )
}
export default SinglePageCategories



