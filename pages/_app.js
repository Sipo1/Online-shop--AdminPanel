import SideBar from '../src/components/sideBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }) => {
  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
