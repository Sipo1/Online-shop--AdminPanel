import { useEffect } from 'react'
import styles from '../styles/Home.module.css'
import Login from '../src/components/login/index.jsx';
import { useRouter } from 'next/router';

const Home = () => {
  const navigate = useRouter()
  useEffect(() => {
    JSON.parse(localStorage.getItem("role")) == "ADMIN" ? navigate.push("/pages") : navigate.push("/")
  }, [])
  return (
    <Login />
  )
}

export default Home