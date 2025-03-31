import { Link } from 'react-router-dom';

function NavbarElements() {
   return(
   
    <div className="navbar">
        <Link to="/produse">Produse</Link>
        <Link to="/">Home</Link>
        <Link to="/brands">Brands</Link>
        
    </div> 
        );

}

export default NavbarElements;