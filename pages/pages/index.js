import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

// styles
import styles from "../../styles/Pages.module.css"

const Pages = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5000/api/categoriesGet")
            .then(res => setCategories(res.data))
    }, []);

    return <div className={styles.wrapper}>
        <div className={styles.categoriesBlock}>
            {categories.map((item) => {
                return <div key={item._id} className={styles.categoriesCard}>
                    <Link href={`pages/${item.name}`}>
                        <div className={styles.nameAndImg}>
                            <p>{item.name}</p>
                            <img src={item.img} className={styles.cardImg} />
                        </div>
                    </Link>
                </div>
            })}
        </div>
    </div>
}

export default Pages;
