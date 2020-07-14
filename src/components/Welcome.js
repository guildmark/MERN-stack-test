import React from 'react';
import {Link} from 'react-router-dom';

//Welcome screen to show after registration
function Welcome() {

    return (
        <div style={{textAlign: "center"}}>
            <h2>Tack för din registrering!</h2>
            <Link to = {"/"} >Logga in för att skapa en ny lista </Link>
        </div>
    )
}

export default Welcome;