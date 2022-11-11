
import axios from "axios"
import styles from "../../styles/UserPage.module.css"

export async function getServerSideProps(context) {
    const { id } = context.params
    const response = await axios.get(`http://localhost:5000/api/auth/getOneUser/${id}`)
    const user = response.data.user
    return {
        props: { user },
    }
}


const UserPage = ({ user }) => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.innerBlock}>
                <div className={styles.imgBlock}>
                <img src={user.img ? user.img : "/user.png"} style={{ width: "100%", height: "100%" }} />
                </div>
                <div className={styles.infoBlock}>
                <p className={styles.username}>  Name :: {user.username}</p>
                </div>


            </div>
         
        </div>
    )
}

export default UserPage



{/* 
<div className={styles.innerBlock}>
    <div className={styles.Image}>
    </div>
    <div className={styles.info}></div>
</div> */}