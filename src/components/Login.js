import React, {useState} from 'react';
import axios from 'axios';


function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginToken, setLoginToken] = useState(sessionStorage.getItem("loginToken"));


    const AddUsername = (e) => {
        setUsername(e.target.value);
    } 
    const AddPassword = (e) => {
        setPassword(e.target.value);
    }

    const submitForm = (e) => {

        e.preventDefault();

        //Get user input for username and password
        const user = {
            username: username,
            password: password
        }

        //Make post request to login and save the JWT token that is recieved
        axios.post("http://localhost:5000/users/login", user)
            .then(res => setLoginToken(res.data));

        sessionStorage.setItem("loginToken", loginToken);
        sessionStorage.setItem("username", username);

        console.log("Current username: " + sessionStorage.getItem("username"));
        console.log("Current login token: " + sessionStorage.getItem("loginToken"));

        //window.location="/lists";
    }



    return(
        <div className="centered">
            <div>
            <h2>Välkommen till LISTR!</h2>
            <form onSubmit={submitForm}>
            <div className="form-group">
                    <label>Användarnamn</label>
                    <br/>
                    <input type="text" className="form-control" style={{width: 500 + "px"}} value={username} onChange={AddUsername} />
                </div>
                <div className="form-group">
                    <label>Lösenord</label>
                    <br/>
                    <input type="text" className="form-control" style={{width: 500 + "px"}} value={password} onChange={AddPassword}  />
                </div>
                <input type="submit" value="Logga in" className="btn btn-primary"/>
            </form>
            </div>
        </div>
    )
}

export default Login;