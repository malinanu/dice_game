import { useFrame, extend } from "@react-three/fiber";
import { Button } from "antd";
import Login from "./Login.jsx";
import Home from "./Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./Signup.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

extend({ Button });

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
