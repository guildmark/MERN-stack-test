import React, {useState } from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';

function UpdateList() {

    //Create variables to use in creating list
    //const [username, setUsername] = useState("");
    const [type, setType] = useState("Shopping List");
    const [headline, setHeadline] = useState("");
    const [content, setContent] = useState("1. ");
    const [content2, setContent2] = useState("2. ");
    const [content3, setContent3] = useState("3. ");
    const [contentArray, setContentArray] = useState([]);


    const location = useLocation();

    const ChangeType = (e) => {
        setType(e.target.value);
    }
    
    const ChangeHeadline = (e) =>{
        setHeadline(e.target.value);
    }
    const ChangeContent = (e) =>{
        setContent(e.target.value);
    }
    const ChangeContent2 = (e) =>{
        setContent2(e.target.value);
    }
    const ChangeContent3 = (e) =>{
        setContent3(e.target.value);
    }

    const ChangeContentArray = (e) => {
        setContentArray(contentArray.concat(e.target.value));
    }

    const SubmitForm = (e) => {
        e.preventDefault();

        if(type === "Todo List" || type === "Shopping List") {
            const list = {
                type: type,
                headline: headline,
                content: content + "  " + content2 + "  " + content3
            }
    
            console.log(list);
    
            //Get the id from the URL parameters
            const pathname = location.pathname;
            const idName = (pathname.substring('/edit/'.length));
    
            //Send the http request to the server to add list to database
            axios.post("http://localhost:5000/lists/edit/" + idName, list)
                .then(res => console.log(res.data));
        }
        else {
            const list = {
                type: type,
                headline: headline,
                content: content
            }
    
            console.log(list);
    
            //Get the id from the URL parameters
            const pathname = location.pathname;
            const idName = (pathname.substring('/edit/'.length));
    
            //Send the http request to the server to add list to database
            axios.post("http://localhost:5000/lists/edit/" + idName, list)
                .then(res => console.log(res.data));
        }
 
        
        window.location = "/lists";
    }

    //Use form to create list
    return(
        <div style={{marginLeft: 25 + "px"}} >
            <h2>Uppdatera Lista</h2>
            <label>Typ</label>
             <br/>

            <select name="type" className="form-control" style={{width: 500 + "px"}} value={type} onChange={ChangeType}>
               <option value="Shopping List">Shopping List</option>
               <option value="Todo List">Todo List</option>
               <option value="Blog Entry">Blog Entry</option>    
            </select>
           
            <form onSubmit={SubmitForm}>
                {/* Use drop down menu to select the type of list to create */}
                <div className="form-group">
                    <label>Rubrik</label>
                    <br/>
                    <input type="text" className="form-control" style={{width: 500 + "px"}} value={headline} onChange={ChangeHeadline}/>
                </div>
                <div className="form-group">
                <label>Innehåll</label>
                    <br/>
                    {type === "Shopping List" && 
                    <div>
                        
                        <input type="textarea" className="form-control" style={{width: 500 + "px"}}value={content} onChange={ChangeContent}/> 
                        <input type="textarea" className="form-control" style={{width: 500 + "px"}}value={content2} onChange={ChangeContent2}/>
                        <input type="textarea" className="form-control" style={{width: 500 + "px"}}value={content3} onChange={ChangeContent3}/>
                    
                    </div>
                    }
                    {type === "Todo List" && 
                    <div>
                        <input type="textarea" className="form-control" style={{width: 500 + "px"}}value={content} onChange={ChangeContent}/> 
                        <input type="textarea" className="form-control" style={{width: 500 + "px"}}value={content2} onChange={ChangeContent2}/>
                        <input type="textarea" className="form-control" style={{width: 500 + "px"}}value={content3} onChange={ChangeContent3}/>
                      
                    </div>
                    }
                     {type === "Blog Entry" &&
                        <textarea className="form-control" style={{width: 500 + "px"}}value={content} onChange={ChangeContent}/> 
                    }
                </div>
                <div className="form-group">
                    <input type="submit" value="Uppdatera" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
}
 
export default UpdateList;