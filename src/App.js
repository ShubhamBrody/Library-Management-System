import HomePage from './components/HomePage/HomePage'
import RegistrationForm from "./components/Registration/RegistrationForm.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.js";
import Login from "./components/Registration/Login.js";
import AddBook from "./components/AdminSideFrontEnd/AddBook/AddBook.js";
import UserProfile from "./components/UserProfilePage/UserProfile";
import { useContext, useEffect } from "react";
import AuthContext from "./components/store/AuthContext.js";
import PageNotFound from "./components/NotFound/PageNotFound.js";

// eslint-disable-next-line import/no-anonymous-default-export
function App() {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    var time = new Date(window.localStorage.getItem("LMS_LOGINTIME"));
    console.log(typeof time)
    var currentTime = new Date();
    var diff = currentTime.getTime() - time.getTime();
    console.log("TIME DIFF : ", diff);
    const user = JSON.parse(window.localStorage.getItem("LMS_USER"));
    console.log("USER : ",user);
    if (!authContext.isLoggedIn && diff < 86400000) {
      authContext.login(
        window.localStorage.getItem("LMS_ISADMIN") === 'true', user);
    }
  }, [authContext]);
  return (
    <BrowserRouter>
      <Navbar />
      {/* {!authContext.isLoggedIn ? <Navigate to="/register" /> : <></>} */}
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/myprofilepage" element={<UserProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addbook" element={<AddBook />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
