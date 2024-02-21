import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
const Toaster = () => {
  return (
    <div>
       <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    </div>
  )
}

export default Toaster
