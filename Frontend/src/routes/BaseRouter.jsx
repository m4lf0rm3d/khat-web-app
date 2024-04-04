import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login/Index";
import { Signup } from "../pages/Signup/Index";
import { Home } from "../pages/Home/Index";

export const BaseRouter = () => {
    return(
      <BrowserRouter>
      <Routes>        
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="home" element={<Home />}/>
      </Routes>
     </BrowserRouter>
    );
}