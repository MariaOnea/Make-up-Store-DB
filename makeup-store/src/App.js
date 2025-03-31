import './App.css';
import NavbarElements from "./components/Navbar/NavbarElements";
import Home from "./pages/Home";
import Brands from "./pages/Brands";
import Produse from "./pages/Produse";
// import Ten from "./pages/Ten";
// import Ochi from "./pages/Ochi";
// import Buze from "./pages/Buze";
// import Contact from "./pages/Contact";
// import Sprancene from "./pages/Sprancene";
// import Unghii from "./pages/Unghii";
// import Login from "./pages/Login";
// import Signin from "./pages/Signin";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return(
    <Router>
        <NavbarElements />
      <Routes>
        <Route path="/produse" element={<Produse />} />
        <Route path="/" element={<Home />} />
        <Route path="/brands" element={<Brands />} />

      </Routes>
        </Router>
  ); 
     }


export default App;