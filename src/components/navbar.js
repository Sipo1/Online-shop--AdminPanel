import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { navbarList } from './static/index';

// styles
import styles from "../../styles/Navbar.module.css"

const Navbar = () => {
    const {pathname}  = useRouter()
   
    return (
        <div className={styles.wrapper}>
            {navbarList.map((item) => {
                return <div className={styles.nav} key={item.id}>
                    <Link href={item.path} >
                        <p className={pathname.slice(0,6) === item.path  ? styles.active : styles.p}   key={item.id} >{item.name}</p>
                    </Link>
                </div>
            })}
        </div>
    );
}

export default Navbar;
