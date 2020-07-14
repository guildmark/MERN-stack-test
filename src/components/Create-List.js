import React, {useState } from 'react';
import axios from 'axios';


function CreateList() {

    //Create variables to use in creating list
    //const [username, setUsername] = useState("");
    const [type, setType] = useState("Shopping List");
    const [headline, setHeadline] = useState("");
    const [content, setContent] = useState("1. ");
    const [content2, setContent2] = useState("2. ");
    const [content3, setContent3] = useState("3. ");
    const [content4, setContent4] = useState("");
    const [inputCounter, setInputCounter] = useState(0);
    const [contentArray, setContentArray] = useState([]);
    
    const ChangeType = (e) => {
        setType(e.target.value);
        console.log("Type changed to: " + e.target.value);
    }
    
    const ChangeHeadline = (e) =>{
        setHeadline(e.target.value);
    }


    //Have several contents (for different lists)
    const ChangeContent = (e) =>{
        setContent(e.target.value);
    }

    const ChangeContent2 = (e) =>{
        setContent2(e.target.value);
    } 
    const ChangeContent3 = (e) =>{
        setContent3(e.target.value);
    }
    const ChangeContent4 = (e) =>{
        setContent4(e.target.value);
    }
    
    const IncrementCounter = () => {
        setInputCounter(inputCounter + 1);
    }

    const AddContent = (e) => {
        setContentArray(contentArray.concat(e.target.value));
    }

    /*
    const addInput = (c) => {

        console.log("Adding input form.");
        return contentArray.map(c => {
            return (
                <input type="textarea" className="form-control" style={{width: 500 + "px"}} value={content} onChange={AddContent} />
            );
        });
     
    }*/

    const SubmitForm = (e) => {
        e.preventDefault();
        console.log("Current type: " + type)
        if(type === "Todo List" || type === "Shopping List") {
            
            const list = {
                type: type,
                headline: headline,
                content: content + "  " + content2 + "  " + content3 + "  " + content4,
                
            }


            console.log(sessionStorage.getItem("loginToken"));
            //Send the http request to the server to add list to database, send auth token to show user
            axios.post("http://localhost:5000/lists/add", list, { 
                headers: {"auth-token": sessionStorage.getItem("loginToken")}
            })
                .then(res => console.log(res.data));
            
            
        }
        else {
            const list = {
                type: type,
                headline: headline,
                content: content
            }

            console.log(sessionStorage.getItem("loginToken"));
            //Send the http request to the server to add list to database, send auth token to show user
            axios.post("http://localhost:5000/lists/add", list, { 
                headers: {"auth-token": sessionStorage.getItem("loginToken")}
            })
                .then(res => console.log(res.data));
            
           
        }

    
        window.location = "/lists";
    }

    //Use form to create list
    return(
        <div>
            <h2>Skapa ny lista</h2>
            
            <form onSubmit={SubmitForm} style={{marginLeft: 25 + "px"}}>
                {/* Use drop down menu to select the type of list to create */}
                <div className="form-group">
                    <label>Typ</label>
                    <br/>
                    {/*
                    <Select
                        options={listTypes}
                        value={type}
                        onChange={ChangeType}
                    />
                    */}
                    <select name="type" className="form-control" style={{width: 500 + "px"}} value={type} onChange={ChangeType}>
                        <option value="Shopping List">Shopping List</option>
                        <option value="Todo List">Todo List</option>
                        <option value="Blog Entry">Blog Entry</option> 
                        <option value="Test" >Test</option>  
                    </select>
                
                    <label>Rubrik</label>
                    <br/>
                    <input type="text" className="form-control" style={{width: 500 + "px"}} value={headline} onChange={ChangeHeadline}/>
                </div>
                {/*Create different types of input depending on what type of list the user wants to create */}
                <div className="col-xs-1">
                    <label>Innehåll</label>
                    <br/>
                    {type === "Shopping List" && 
                    <div>
                        
                        <input type="textarea" className="form-control" style={{width: 500 + "px"}}value={content} onChange={ChangeContent}/> 
                        <input type="textarea" className="form-control" style={{width: 500 + "px"}}value={content2} onChange={ChangeContent2}/>
                        <input type="textarea" className="form-control" style={{width: 500 + "px"}}value={content3} onChange={ChangeContent3}/>
                        {inputCounter > 0 && <input type="textarea" className="form-control" style={{width: 500 + "px"}}value={content4} onChange={ChangeContent4}/> }
                        <a href="#" onClick={IncrementCounter}>+</a>

                    </div>
                    }
                    {type === "Todo List" && 
                    <div>
                        <input type="textarea" className="form-control" style={{width: 500 + "px"}}value={content} onChange={ChangeContent}/> 
                        <input type="textarea" className="form-control" style={{width: 500 + "px"}}value={content2} onChange={ChangeContent2}/>
                        <input type="textarea" className="form-control" style={{width: 500 + "px"}}value={content3} onChange={ChangeContent3}/>
                        {inputCounter > 0 && <input type="textarea" className="form-control" style={{width: 500 + "px"}}value={content4} onChange={ChangeContent4}/> }
                        <a href="#" onClick={IncrementCounter}>+</a>
                    </div>
                    }
                  
                    {type === "Test" && 
                    <div>
                        <input type="textarea" className="form-control" style={{width: 500 + "px"}} value={contentArray[0]} onChange={AddContent}/> 
                        <input type="textarea" className="form-control" style={{width: 500 + "px"}} value={contentArray[1]} onChange={AddContent}/>
                        <input type="textarea" className="form-control" style={{width: 500 + "px"}} value={contentArray[2]} onChange={AddContent}/>
                        
                        <a href="#" onClick={IncrementCounter}>+</a>
                    </div>
                    }
              

                    {type === "Blog Entry" &&
                        <textarea className="form-control" style={{width: 500 + "px"}}value={content} onChange={ChangeContent}/> 
                    }
                </div>
                <div className="form-group">
                    <input type="submit" value="Skapa" className="btn btn-primary"/>
                   
                </div>
            
            </form>
        </div>
    )
}
 
export default CreateList;