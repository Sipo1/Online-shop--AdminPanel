import React from 'react'
import Navbar from './navbar'

// styles
import styles from "../../styles/SideBar.module.css"
import { useRouter } from 'next/router'

const SideBar = () => {
    const {pathname}  = useRouter()

    return (
        pathname == "/" ? null :
        <div className={styles.wrapper}>
            <div className={styles.userImg}>
                <img src="/user.png" />
            </div>
            <Navbar />
        </div>
    )
}

export default SideBar