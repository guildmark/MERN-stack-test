import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';



function Navbar() {


    const [username, setUsername] = useState(sessionStorage.getItem("username"));
    //const [navbarCount, setNavbarCount] = useState(1);
    
    useEffect(() => {
        /*
        if(navbarCount === 1) {
            setNavbarCount(2);
        }
        else {
            setNavbarCount(1);
        }
        */
        
        setUsername(sessionStorage.getItem("username"));
        console.log("Component rerendered, username: " + sessionStorage.getItem("username"));
    }, [])
    
    //Clear storage on logout
    const clearsessionStorage = () => {
        sessionStorage.clear();
        setUsername(null);
        console.log("Local storage cleared, current storage: " + sessionStorage.getItem("username"));
        window.location = "/";
    }

        return ( 
            
        
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <Link to="/lists" className="navbar-brand">LISTR</Link>
            {/* Add the links to navbar*/}
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link to="/lists" className="nav-item nav-link active" href="#">Alla listor</Link>
                    {username != null && <Link to="/createlist" className="nav-item nav-link active" href="#">Skapa Lista</Link> }
                    {username === null && <Link to="/register" className="nav-item nav-link active" href="#">Registrera</Link>  }
                    {username != null && <Link to="/" className="nav-item nav-link active" href="#" onClick={clearsessionStorage}>Logga ut</Link>}
                    {username === null && <Link to="/" className="nav-item nav-link active" href="#">Logga in </Link>}
                   
                </div>
            </div>
            
        </nav> 
        )
}

 
export default Navbar;