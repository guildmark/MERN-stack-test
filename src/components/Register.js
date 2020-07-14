import React, {useState } from 'react';
import axios from 'axios';

function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [registered, setRegistered] = useState(false);

    const AddUsername = (e) => {
        setUsername(e.target.value);
    } 
    const AddPassword = (e) => {
        setPassword(e.target.value);
    }
    const AddEmail = (e) => {
        setEmail(e.target.value);
    }

    const SubmitForm = (e) => {
        e.preventDefault();

        const user = {
            username: username,
            password: password,
            email: email,
            points: 0
        }

        console.log(user);
        axios.post("http://localhost:5000/users/register", user)
            .then(res => console.log(res.data))
            .then(() => setRegistered(true));

        window.location = "/welcome";
    }

    return( 
        
        <div className="centered">
            <div>
                <h2>Registering</h2>
            <form onSubmit={SubmitForm}>
                <div className="form-group">
                    <label>Användarnamn</label>
                    <br/>
                    <input type="text"  style={{width: 500 + "px"}} value={username} className="form-control" onChange={AddUsername}/>
                </div>
                <div className="form-group">
                    <label>Lösenord</label>
                    <br/>
                    <input type="text" className="form-control" style={{width: 500 + "px"}} value={password}  onChange={AddPassword}/>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <br/>
                    <input type="text" className="form-control" style={{width: 500 + "px"}} value={email}  onChange={AddEmail}/>
                </div>
                <input type="submit" value="Registrera" className="btn btn-primary"/>
            </form>

        {registered === true && <h2>User registered!</h2> }
        </div>
        </div>
    )

}
export default Register;