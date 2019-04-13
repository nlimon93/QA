//    main.js file by Matthew Nelson
//
//
//
//----------------------------------//
/////////////////////////
// Important Variables //
/////////////////////////

const modal = document.getElementById('id01');


//----------------------------------//

//////////////////////
// On Load function //
//////////////////////

window.addEventListener("load", function() {

}, false);


function timer(arg) {
    switch (arg) {
        case "start":
            timeKeeper = setInterval(updateClock, 1000);
            break;
        case "clear":
            clearInterval(timeKeeper)
            time = 0
        case "pause":
            clearInterval(timeKeeper)
    }
}

function updateClock() {
    var watch = document.getElementById("Watch");
    watch.innerHTML = "Time: " + time;
    time += 1;
}
//----------------------------------//

////////////////////////////
// Object Definition Zone //
////////////////////////////


//----------------------------------//

////////////////////
// Event Handlers //
////////////////////

//Closes window, TODO replace with new code, used as test
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//Converts a Text line to a form
function convertToForm(select, type, secondary, userID, folderID) {
    select.setAttribute("style", "display:none")
    const input = document.createElement("input");
    input.setAttribute("value", select.innerHTML);
    input.setAttribute("autofocus", true);
    input.setAttribute("onkeyup", "updateFolderFromForm(this, '" + type + "', '" + secondary + "', " + userID + ", " + folderID + ", false)")
    input.setAttribute("onfocusout", "updateFolderFromForm(this, '" + type + "', '" + secondary + "', " + userID + "," + folderID + ", true)")
    select.parentNode.insertBefore(input, select.nextSibling)
}

//Updates parent elements from input data, updates the sql to reflect new form data. carries on.
async function updateFolderFromForm(origin, type, secondary, userID, folderID, clickoff) {
    if ((!event.shiftkey & event.keyCode == 13) || clickoff) {
        target = origin.previousSibling;
        //Replace content from input to dom
        origin.previousSibling.innerHTML = origin.value;

        //Send to server
        let data = new FormData();
        data.append("folder", "true");
        data.append(type, origin.value);
        data.append("alternative", secondary);
        data.append("user", userID);
        data.append("folderID", folderID);
        // Fetch implementation
        const response = await fetch("pushRoomSetup.php", {
            method: 'POST',
            body: data
        });
        if (!response.ok) {
            console.log("something went wrong");
        } else {
            let result = await response.text();
            console.log(result);
        }

        /* xmlhttprequest implementation
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log("response given")
                console.log(this.getResponseHeader)
            }
        }

        xmlhttp.open("POST", "pushRoomSetup.php", true);
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        xmlhttp.send(data);
        */

        //remove form and reenable node
        target.setAttribute("style", "display:block");
        origin.parentNode.removeChild(origin);
    } else if (event.keyCode == 27) {
        //Escape Pressed, Cancel everything
    }
}

//Deletes Folder, Remove element and ping server's php to remove from memory
async function deleteFolder(target, folderid, user) {
    const node = target.parentNode
    let data = new FormData();
    data.append("folder", true);
    data.append("delFold", folderid);
    data.append("user", user);
    const response = await fetch("pushRoomSetup.php", {
        method: 'POST',
        body: data
    });
    if (!response.ok) {
        console.log("something went wrong in delete folder");
    } else {
        //Finally delete the node
        let result = await response.text()
        console.log(result);
        node.parentNode.removeChild(node);
    }
}

//Creates Folder, Pings PHP to create the default, initialaizes form, runs updateElementFromForm when values are entered and converts to normal
async function newFolder(user) {
    const folderbox = document.getElementById("FolderBox");
    const tempFolName = "Folder Name";
    const tempFolDesc = "Double Click to edit Folder Name or Folder Description";
    //Tell Server to make a new DB entry with user
    let data = new FormData();
    data.append("folder", "true");
    data.append("newFold", user);
    data.append("fname", tempFolName);
    data.append("fdesc", tempFolDesc);
    const response = await fetch("pushRoomSetup.php", {
        method: 'POST',
        body: data
    });
    if (!response.ok) {
        console.log("something went wrong");
    } else {
        let result = await response.text();
        console.log(result);

        //the PHP returns the ID of the folder
        const folderID = result;
        //Make the Div using the ID
        const node = document.createElement("div");
        const h1 = document.createElement("h1");
        const p = document.createElement("p");
        const btn = document.createElement("button");

        //configure node
        node.setAttribute("class", "folderIter dragable")
            //configure h1
        h1.setAttribute("ondblclick", "convertToForm(this, 'folderN', '" + tempFolDesc + "', " + user + ", " + folderID + ")");
        h1.setAttribute("class", "renamable")
        h1.innerText = tempFolName;
        //configure p
        p.setAttribute("ondblclick", "convertToForm(this, 'folderD', '" + tempFolName + "', " + user + ", " + folderID + ")");
        p.setAttribute("class", "renamable")
        p.innerText = tempFolDesc;

        //configure btn
        btn.setAttribute("type", "button");
        btn.setAttribute("onclick", "deleteFolder(this, " + folderID + ", " + user + ")")
        btn.innerText = "TRASHICON";
        //assemble node
        folderbox.appendChild(node);
        node.appendChild(h1);
        node.appendChild(p);
        node.appendChild(btn);
    }
}

//Swaps the login form to enable Registration
function adjustFormToRegister() {

    logele = document.getElementsByClassName("login");
    regele = document.getElementsByClassName("register");

    Array.prototype.forEach.call(logele, function(ele) {
        ele.setAttribute("style", "display:none");
        console.log(ele);
        console.log("i tried first");
    });
    Array.prototype.forEach.call(regele, function(ele) {
        ele.setAttribute("style", "display:block");
        console.log("i tried");
    });


    document.getElementById("regemail").required = true;
    document.getElementById("regpswconf").required = true;
    document.getElementById("regswitch").value == "true";
}

//Swaps the Registration form to enable login
function adjustFormToLogin() {

    logele = document.getElementsByClassName("login");
    regele = document.getElementsByClassName("register");

    Array.prototype.forEach.call(logele, function(ele) {
        ele.setAttribute("style", "display:block");
    });
    Array.prototype.forEach.call(regele, function(ele) {
        ele.setAttribute("style", "display:none");
    });


    document.getElementById("regemail").required = false;
    document.getElementById("regpswconf").required = false;
    document.getElementById("regswitch").value == "false";
}

//----------------------------------//