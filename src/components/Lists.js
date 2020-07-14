import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
//import { response } from 'express';

function Lists() {

    //Start with empty array of lists
    const [lists, setLists] = useState([]);
   //const [username, setUsername] = useState(sessionStorage.getItem("username"));

    //Get the list of lists at the start and continually update when the page is updated
    useEffect(() => {
        
        axios.get("http://localhost:5000/lists/")
        .then(res => {
            setLists(res.data)
            console.log(res.data)
        })
        .catch(err => {
            console.log(err);
        })
        
        console.log(sessionStorage.getItem("loginToken"));


    }, []);
    
    //Convert the array of objects by mapping and creating a table to show the lists in
    const convertList = (l) => {


        return lists.map(l => {
            return ( 
                
               <tr>
                    <th>Typ av lista</th>
                    <td>{l.type}</td>
                    <th>Rubrik</th>
                    <td>{l.headline}</td>
                    <th>Innehåll</th>
                    <td>{l.content}</td>
                    {/* Add CRUD so we can edit and delete the lists, but make sure user is logged in */}
                    {sessionStorage.getItem("username") != null &&
                    <td>
                       <Link to={"/edit/" + l._id}>Redigera</Link> <a href="#" onClick={() => {deleteList(l._id)}}>Ta bort</a>
                    </td>
                    }
               </tr>

            );
            
        });

    }

    const deleteList = (id) => {
        axios.delete("http://localhost:5000/lists/" + id, { 
            headers: {"auth-token": sessionStorage.getItem("loginToken")}
        })
            .then(res => console.log(res.data));
        
        //Redirect to refresh window again.
        window.location = "/lists";
    }
        
    return (
        <div>
            <table align="center" className="table">
                <tbody>
                    {convertList(lists)} 
                </tbody>
            </table>
        <p>Logged in as: {sessionStorage.getItem("username")}</p>
        </div>
    )
}
 
export default Lists;