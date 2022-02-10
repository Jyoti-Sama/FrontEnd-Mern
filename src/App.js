import {  Route, BrowserRouter as Router, Routes } from "react-router-dom";
import About from "./routes/About";
import Home from "./routes/Home";
import NavBar from "./NavBar";
import LoginPage from "./routes/LoginPage";

import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterPage from "./routes/RegisterPage";
function App() {
  return (
    <Router>          
          <NavBar />
           <Routes>
                 <Route exact path='/' element={< Home />}></Route>
                 <Route exact path='/about' element={< About />}></Route>
                 <Route exact path='/login' element={< LoginPage />}></Route>
                 <Route exact path='/register' element={< RegisterPage />}></Route>
          </Routes>         
       </Router>
  )
}

export default App;
