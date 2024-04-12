import axios from "axios";
import React, { useEffect, useState } from "react";
import DiceApp from "./diceApp";
import { useNavigate } from "react-router-dom";

function Home() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:5003/home")
      .then((res) => {
        if (res.data.valid) {
          setEmail(res.data.email);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <DiceApp />
    </>
  );
}

export default Home;
