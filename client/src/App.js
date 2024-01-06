import React ,{useState}  from 'react';
import './App.css';
import  { Route , Routes } from 'react-router-dom'
import Navbar from './Navbar';
const LazyLogin = React.lazy(()=> import ('./Routes/Login'));
const LazyRegister = React.lazy(()=> import ('./Routes/Register'));
const LazyMychat = React.lazy(()=> import('./Routes/Mychat'));
const LazySettings = React.lazy(()=> import('./Routes/Settings'));
const LazyNetwork = React.lazy(()=> import('./Routes/Network'));

function App() {
  let [login ,setLogin] = useState(false);
  return (
    <>
      <Navbar login={login}/>
      <Routes>
         <Route path="/register" element={<React.Suspense fallback='Loading'>
            <LazyRegister/>
         </React.Suspense>}/>
         <Route path="/" element={<React.Suspense fallback="Loading...">
            <LazyLogin setLogin={setLogin}/>
         </React.Suspense>}/>
         <Route path="/mychat" element={<React.Suspense fallback="Loading...">
            <LazyMychat/>
         </React.Suspense>}/>
         <Route path="/network" element={<React.Suspense fallback="Loading...">
            <LazyNetwork/>
         </React.Suspense>}/>
         <Route path="/settings" element={<React.Suspense fallback="Loading...">
            <LazySettings setLogin={setLogin}/>
         </React.Suspense>}/>
      </Routes>
    </>
  );
}

export default App;
