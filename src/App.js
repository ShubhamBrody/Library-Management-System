import Base from "./components/Base/Base.js";
import RegistrationForm from "./components/Registration/RegistrationForm.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.js";
import Login from "./components/Registration/Login.js";
import AddBook from "./components/AdminSideFrontEnd/AddBook/AddBook.js";
// import { useContext, useEffect } from "react";
// import AuthContext from './components/store/AuthContext.js';


// function PrivateRoute ({component: Component, authed, ...rest}) {
//   return (
//     <Route
//       {...rest}
//       render={(props) => authed === true
//         ? <Component {...props} />
//         : <Redirect to={{pathname: '/register', state: {from: props.location}}} />}
//     />
//   )
// }

// eslint-disable-next-line import/no-anonymous-default-export
function App() {
  return (<BrowserRouter>
    <Navbar />
    <Routes>
      <Route exact path="/" element={<Base />} />
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/login" element={<Login />} />
      <Route path="/addbook" element={<AddBook />} />
    </Routes>
  </BrowserRouter>
)};

export default App;