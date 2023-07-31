import Routes from "./routes";
import {ToastContainer} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import './GlobalStyle.css'; 

const App = ()=>{
    return(
      <>
      <Routes/>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"/>
      </>
    )
}

export default App; 