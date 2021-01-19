import React, {useState, Component, useEffect} from "react";
import { App } from "../app/App";
import WaitingWindow from "../components/waitingWindow";
import BoardPage from "./boardPage";
import {Navbar} from "../components/navbar";
import {Link, Redirect} from "react-router-dom";
import httpClient from "../tools/httpClient";
import { render } from "@testing-library/react";


const UserPage = () => {

 
    var [username, setUsername] = useState("");
    var [name, setName] = useState("chujnik");
    var [surname, setSurname] = useState("");
    var [password, setPassword] = useState("")

    var [settingsWindowVisibility,  setSettingsWindowVisibility] = useState("hidden");
    var [createBoardWindowVisibility, setCreateBoardWindowVisibility] = useState("hidden");
    var [settingNumber, setSettingNumber] = useState(null);
    var [boardsList, editBoardsList] = useState([]);

    getDetails();
    getBoards();
    


    async function getDetails(){
        try{
        const user = await httpClient.getUserDetails();
        console.log(user);
        setUsername(user.username);
        setName(user.name);
        setSurname(user.surname);
        }
        catch(err){
            console.error(err);
        }
        
    }

    async function changeDetails(param, paramType){
        
        try{
            if(paramType===1){
            await httpClient.changeUserDetails({
                username: param
            })
            }
            else if(paramType===2){
                await httpClient.changeUserDetails({
                    name: param
                })
            }
            else if(paramType===3){
                await httpClient.changeUserDetails({
                    surname: param
                })
            }
        }
        catch(err){
            console.error(err.message);
        }
    }

    function setSettingsWindow(visibility, settingNr, e){
        e.preventDefault();
        setSettingsWindowVisibility(()=>{
            settingsWindowVisibility = `${visibility}`;
            return settingsWindowVisibility;
        })
        if(visibility==="hidden"){
            var window = document.getElementById("settings-window");
            if(settingNumber===4){              
                window.removeChild(window.lastElementChild);
                window.removeChild(window.lastElementChild);
            }
            window.style.visibility="hidden";
        }
        else if(visibility==="visible"){
            switch(settingNr){
                case 1:
                    document.getElementById("settings-h3").textContent = "Enter new username:";
                    setSettingNumber(1);
                    break;
                case 2:
                    document.getElementById("settings-h3").textContent = "Enter new name:";
                    setSettingNumber(2);
                    break;
                case 3: 
                    document.getElementById("settings-h3").textContent = "Enter new surname:";
                    setSettingNumber(3);
                    break;
                case 4:
                    setSettingNumber(4);
                    var window = document.getElementById("settings-window");
                    var changePassword = document.getElementById("setting-input");
                    var repeatPassword = document.createElement("input");
                    var repeatPasswordLabel = document.createElement("h3");
                    changePassword.type = "password";
                    repeatPassword.type = "password";
                    repeatPassword.id = "repeat-password";
                    repeatPasswordLabel.is = "repeat-password-label"
                    repeatPassword.style.border = "1px solid black";
                    repeatPasswordLabel.textContent = "Repeat password:";
                    document.getElementById("settings-h3").textContent = "Enter new password:";
                    window.appendChild(repeatPasswordLabel);
                    window.appendChild(repeatPassword);

                    break;
            }
        }
    }

    function saveNewValue(settingNr,e){
        e.preventDefault();
        var window = document.getElementById("settings-window");
            if(settingNr===4){
                window.removeChild(window.lastElementChild);
                window.removeChild(window.lastElementChild);
            }

            switch(settingNr){
                case 1:
                    var usrNm = document.getElementById("setting-input").value;
                    changeDetails(usrNm, 1);
                    break;
                case 2:
                    var nm = document.getElementById("setting-input").value;
                    changeDetails(nm, 2);
                    break;
                case 3:
                    var srnm = document.getElementById("setting-input").value;
                    changeDetails(srnm, 3);
                    break;
                case 4:
                    break;
            }
            setSettingsWindowVisibility(()=>{
               settingsWindowVisibility = "hidden";
               return settingsWindowVisibility;
            })
            getDetails();
    }

    async function deleteAccount(e){
        e.preventDefault();
        displayBoards();
        if (window.confirm("Are you sure you want to delete your account?\nThis operation is irreversible!")){
            try{
                await httpClient.deleteUser();
                document.getElementById("to-login-link").click();
            }
            catch(err){
                console.error(err.message);
            }
        }
    }

    async function addBoard(e){
        e.preventDefault();
        var boardName = document.getElementById("board-name-input").value;
        try{
            await httpClient.addBoard({
                name: boardName
            });
            setCreateBoardWindowVisibility("hidden");
        }
        catch(err){
            console.error(err.message)
        }
    }

    async function getBoards(){
        var tmp = boardsList;
        try{
            const boards = await httpClient.getUserBoards();
            editBoardsList(prevState=>{

               return boards;
            })
        }
        catch(err){
            console.error(err.message)
        }
    }


    function displayBoards(){
 
        var list = document.getElementById("board-list");
        var boardLink = document.getElementById("to-user-board-link");
       
        list.innerHTML = "";

        for(var i=0;i<boardsList.length;i++){
            
            var listElement = document.createElement("li");
            listElement.id="item-board";

            var button = document.createElement("button");
            button.textContent = boardsList[i].name;
            button.id = "item-board-button";
            button.className = "board-button";
            var id = boardsList[i].id;
            var name = boardsList[i].name;
            var exactLink = boardLink.cloneNode(true);
            exactLink.to = `board/${id}`;
            console.log(id);
            //var boardLink = React.createElement("Link",{to: `/board/${id}`})
            button.addEventListener('click',()=>{
                exactLink.click();
            })
            
            var moreInfo = document.createElement("p");

            listElement.appendChild(button);
            list.appendChild(listElement);
    }

    }

    

    return(
        <div>
            <Navbar status="logged" name={name} />
        <header id="user-header">{username}'s profile</header>
        <div className="user-container">
            <div className="boardlist-container">

                        <div id="create-board-window" style={{visibility: `${createBoardWindowVisibility}`}}>
                                <button style={{position: "absolute", marginLeft: "230px"}} onClick={(e)=>{
                                    e.preventDefault();
                                    setCreateBoardWindowVisibility("hidden")}}>X</button>
                                <h3>Enter board name:</h3>
                                <input type="text" id="new-name" id="board-name-input" name="text"/>
                                <input type="submit" id="add-board-btn" onClick={(e)=>addBoard(e)} name="submit" value="Confirm"/>
                        </div>
                <h2 className="user-container-header" onClick={displayBoards}>Boards list</h2>
                <ul id="board-list">
                </ul>
                <button id="show-add-board-window-btn" onClick={(e)=>{
                    e.preventDefault();
                    setCreateBoardWindowVisibility("visible")}}>CREATE BOARD</button>
            </div>
            <div className="settings-container">
                        <div className="user-settings-window" id="settings-window" style={{visibility: `${settingsWindowVisibility}` }}>
                                <button style={{position: "absolute", marginLeft: "230px"}} onClick={(e)=>setSettingsWindow("hidden",0,e)}>X</button>
                                <h3 id="settings-h3">Enter new value:</h3>
                                <input type="text" className="new-name" id="setting-input" name="text"/>
                                <input type="submit" id="setting-submit-btn" onClick={(e)=>saveNewValue(settingNumber,e)} name="submit" value="Confirm"/>
                        </div>
                        
                <h2 className="user-container-header">Settings</h2>
                <button id="edit-username-btn" onClick={(e)=>setSettingsWindow("visible",1,e)}>Edit Username</button>
                <button id="edit-name-btn" onClick={(e)=>setSettingsWindow("visible",2,e)}>Edit Name</button>
                <button id="edit-surname-btn" onClick={(e)=>setSettingsWindow("visible",3,e)}>Edit Surname</button>
                <button id="edit-password-btn" onClick={(e)=>setSettingsWindow("visible",4,e)}>Change Password</button>
                <button id="delete-account-btn" onClick={(e)=>deleteAccount(e)} >Delete Account</button>
            </div>
        </div>
        <Link to="/login" id="to-login-link"></Link>
        <Link to="/board" id="to-user-board-link"></Link>
        </div>
    )
}

export default UserPage;

