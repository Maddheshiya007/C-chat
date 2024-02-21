import SetAvatar from './Pages/SetAvatar';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chat from './Pages/Chat';
import Register from './Pages/Register';
import Login from './Pages/Login';
// import 'react-toastify/dist/ReactToastify.css';
import Toaster from './Utils/Toaster';

function App() {
  return (
    <div className="app">
      <Toaster/>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/setAvatar" element={<SetAvatar/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;