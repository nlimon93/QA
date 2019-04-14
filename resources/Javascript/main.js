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
class questionObj {
    constructor() {
        this.text = "This is a sample Question, Double Click to Change",
            this.args = {
                TF: "False"
            },
            this.answer = {
                one: ["true", "This is a sample Answer, Double click to change"],
                two: ["true", "This is a sample Answer, Double click to change"],
                three: ["false", "This is a sample Answer, Double click to change"],
                four: ["false", "This is a sample Answer, Double click to change"],
                five: ["false", "This is a sample Answer, Double click to change"]
            };
    }
}

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
    if (type == "folderN") {
        const input = document.createElement("input");
    } else {
        const input = document.createElement("textarea");
    }
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
        node.setAttribute("onclick", "queryQuestionList(" + folderID + ", " + user + ")")
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

async function queryQuestionList(folder, user) {
    const QBox = document.getElementById("QuestionBox");
    //Clear Box and Regenerate
    QBox.innerHTML = "";
    let data = new FormData();
    data.append("question", folder)
    data.append("query", "true")
    data.append("user", user)
    const response = await fetch("pushRoomSetup.php", {
        method: 'POST',
        body: data
    });
    if (!response.ok) {
        console.log("something went wrong");
    } else {
        let qList = await response.json();
        //Itterate through the list
        console.log(qList[0].questionID)

        for (let i = 0; i < qList.length; i++) {
            let Q = JSON.parse(qList[i].question);
            let qid = qList[i].questionID;
            //Build Element
            const Qbtn = document.createElement("div");
            Qbtn.classList = "question";
            Qbtn.setAttribute("id", "Q:" + qid);
            Qbtn.innerHTML = "<div class='QHead'><div class='text'>" + Q.text + "</div><div class='arrow'>Arrow</div></div>"
            Qbtn.innerHTML += "<div id='" + qid + ":" + 1 + "' class='answer'>" + Q.answer.one[1] + "</div>"
            Qbtn.innerHTML += "<div id='" + qid + ":" + 2 + "' class='answer'>" + Q.answer.two[1] + "</div>"
            Qbtn.innerHTML += "<div id='" + qid + ":" + 3 + "' class='answer hidden'>" + Q.answer.three[1] + "</div>"
            Qbtn.innerHTML += "<div id='" + qid + ":" + 4 + "' class='answer hidden'>" + Q.answer.four[1] + "</div>"
            Qbtn.innerHTML += "<div id='" + qid + ":" + 5 + "' class='answer hidden'>" + Q.answer.five[1] + "</div>"
            Qbtn.innerHTML += "<div class='btnHolder'><button>Add Answer Choice</button><button>TrueFalse</button><button>Trash</button></div>"
            QBox.appendChild(Qbtn);
        }
        //Create New question button
        console.log("Make New Button");
        const newQbtn = document.createElement("div");
        newQbtn.setAttribute("onclick", "newQuestion(" + folder + ", " + user + ")");
        newQbtn.setAttribute("id", "newQbtn");
        newQbtn.innerText = "Create New Question";
        QBox.appendChild(newQbtn);

    }
}
async function newQuestion(folder, user) {
    //Define Element Components
    const QBox = document.getElementById("QuestionBox");
    const newQbtn = document.getElementById("newQbtn");
    const Qbtn = document.createElement("div");
    const Q = new questionObj();
    //Make Entry into database
    const data = new FormData();
    data.append("question", true);
    data.append("newQ", true)
    data.append("location", folder);
    data.append("user", user);
    data.append("data", JSON.stringify(Q));
    const response = await fetch("pushRoomSetup.php", {
        method: 'POST',
        body: data
    });
    if (!response.ok) {
        console.log("something went wrong");
    } else {
        const result = await response.text();
        let qid = result;
        console.log(result);
        //Basic Structure of the Question Object
        Qbtn.classList = "question";
        Qbtn.setAttribute("id", "Q:" + qid);
        Qbtn.innerHTML = "<div class='QHead'><div class='text'>" + Q.text + "</div><div class='arrow'>Arrow</div></div>"
        Qbtn.innerHTML += "<div id='" + qid + ":" + 1 + "' class='answer'>" + Q.answer.one[1] + "</div>"
        Qbtn.innerHTML += "<div id='" + qid + ":" + 2 + "' class='answer'>" + Q.answer.two[1] + "</div>"
        Qbtn.innerHTML += "<div id='" + qid + ":" + 3 + "' class='answer hidden'>" + Q.answer.three[1] + "</div>"
        Qbtn.innerHTML += "<div id='" + qid + ":" + 4 + "' class='answer hidden'>" + Q.answer.four[1] + "</div>"
        Qbtn.innerHTML += "<div id='" + qid + ":" + 5 + "' class='answer hidden'>" + Q.answer.five[1] + "</div>"
        Qbtn.innerHTML += "<div class='btnHolder'><button>Add Answer Choice</button><button>TrueFalse</button><button>Trash</button></div>"

        //Build Element
        QBox.insertBefore(Qbtn, newQbtn);
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