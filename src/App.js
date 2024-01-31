import Container from "@mui/material/Container";
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import {Route,Routes, Navigate}  from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {fetchUserMe } from "./redux/slices/auth";
function App() {
  const db = useDispatch()


  useEffect(() => {
    db(fetchUserMe())
  },[])
  
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/posts/:id" element={<FullPost/>} />
          <Route path="/add-post" element={<AddPost/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Registration/>} />
          <Route path="*" element={<Navigate to='/' replace />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
