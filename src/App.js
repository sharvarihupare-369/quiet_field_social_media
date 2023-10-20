import logo from './logo.svg';
import './App.css';
import MainRoutes from './pages/MainRoutes';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useEffect } from 'react';
import Sidebar from './components/Sidebar';

function App() {
  
  return (
    <div className="App">
        {/* <Sidebar/> */}
       <MainRoutes/>
       {/* <Login/> */}
       {/* <Signup/> */}
    </div>
  );
}

export default App;
