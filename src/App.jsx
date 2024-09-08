import { ToastContainer } from 'react-toastify';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Buyer from './Pages/Buyer';
import Seller from './Pages/Seller';
import DeliGuy from './Pages/DeliGuy';
import UserChoice from './Pages/root';
import Map from './components/Map';
const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<UserChoice />} />
          <Route path='/seller' element={<Seller />} />
         <Route path='/buyer' element={<Buyer />} />
          <Route path='/deliguy' element={<DeliGuy />} />
          <Route path='/Maps' element={Map}/>
        </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};
export default Router