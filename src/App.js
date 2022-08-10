import HomePage from "./components/HomePage/HomePage";
import RegistrationForm from "./components/Registration/RegistrationForm.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.js";
import Login from "./components/Registration/Login.js";
import AddBook from "./components/AdminSideFrontEnd/AddBook/AddBook.js";
import UserProfile from "./components/UserProfilePage/UserProfile";
import { useContext, useEffect } from "react";
import AuthContext from "./components/store/AuthContext.js";
import PageNotFound from "./components/NotFound/PageNotFound.js";
import axios from "axios";
import { MyBackend } from "./components/Api/ApiLinkGen";

// eslint-disable-next-line import/no-anonymous-default-export
function App() {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    var time = new Date(window.localStorage.getItem("LMS_LOGINTIME"));
    console.log(typeof time);
    var currentTime = new Date();
    var diff = currentTime.getTime() - time.getTime();
    console.log("TIME DIFF : ", diff);
    const user = JSON.parse(window.localStorage.getItem("LMS_USER"));
    console.log("USER : ", user);
    if (!authContext.isLoggedIn && diff < 86400000) {
      axios
        .post(MyBackend({ work: "verifydetails/" }), {
          email: user.email,
          password: user.password,
          isAdmin: window.localStorage.getItem("LMS_ISADMIN") === 'true',
        })
        .then((d) => {
          console.log("LOGGING IN VIA APP>JS");
          if (
            (d.data.isAdmin === true &&
              window.localStorage.getItem("LMS_ISADMIN") !== "true") ||
            (d.data.isAdmin === false &&
              window.localStorage.getItem("LMS_ISADMIN") !== "false")
          ) {
            window.localStorage.setItem("LMS_ISADMIN", d.data.isAdmin);
          }
          authContext.login(d.data.isAdmin, d.data.user);
          window.localStorage.setItem("LMS_LOGINTIME", new Date());
          window.localStorage.setItem("LMS_USER", JSON.stringify(d.data.user));
          window.localStorage.setItem("LMS_ISADMIN", d.data.isAdmin);
          console.log("LOGGING IN VIA APP>JS");
        })
        .catch((error) => {
          if (error.status === 401 || error.status === 404) {
            window.localStorage.clear();
            authContext.logout();
          }
        });
      // authContext.login(
      //   window.localStorage.getItem("LMS_ISADMIN") === 'true', user);
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
        {authContext.isAdmin && <Route path="/addbook" element={<AddBook />} />}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
