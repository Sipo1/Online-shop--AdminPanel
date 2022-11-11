import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../../../styles/Login.module.css"


const Login = () => {
  const navigate = useRouter();
  const [errorMessage,setErrorMessage] = useState("")

  const [loginForm, setLoginForm] = useState({
    username: {
      value: "",
    },
    password: {
      value: "",
    },
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setLoginForm((prev) => {
      return {
        ...prev,
        [name]: {
          ...prev[name],
          value,
        },
      };
    });
  };

  const onSubmit = async  (e) => {
    e.preventDefault();

    const {
      username: { value: username },
      password: { value: password },
    } = loginForm;

    const formData = {
      username,
      password,
    };

    try {
      await  axios.post("http://localhost:5000/api/auth/login", formData)
        .then((res) => {
          if (res.data.role[0] == "ADMIN") {
            localStorage.setItem("role", JSON.stringify(res.data.role[0]))
            navigate.push("/pages")
            
          }
          if (res.data.role[0] == "USER") {
            setErrorMessage("Your Role is User")
          }
        });
    } catch (e) {
      console.log(e.response);
      setErrorMessage("Wrong Password/Username")
    }
  };
  return (
    <div className={styles.wrapper}>
      <p style={{fontSize:"25px",color:"white"}}>Welcome!</p>
      <form className={styles.form} onSubmit={onSubmit}>
        <p className={styles.errorMessage}>{errorMessage}</p>

        <div>
          <label htmlFor="usernameId">Username</label>
          <input
            id="usernameId"
            value={loginForm.username.value}
            name="username"
            placeholder=" username"
            type="username"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="passwordId">Password</label>
          <input
            id="passwordId"
            name="password"
            value={loginForm.password.value}
            placeholder=" Password"
            type="password"
            onChange={handleChange}
          />
        </div>
        <button className={styles.formButton}>Login</button>
      </form>

    </div>

  );
}

export default Login;
