//    main.js file by Matthew Nelson
//
//
//
//----------------------------------//
/////////////////////////
// Important Variables //
/////////////////////////

var modal = document.getElementById('id01');
var storage = { nodeStorage: [] };

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
function convertToForm(select, position) {
    console.log("test convert to form")
    select.setAttribute("style", "display:none")
    var input = document.createElement("input");
    input.setAttribute("value", select.innerHTML);
    input.setAttribute("autofocus", true);
    input.setAttribute("name", position);
    var index = storage.nodeStorage.push(select) - 1;
    input.setAttribute("onkeyup", "updateElementFromForm(" + index + ", this, false)")
    input.setAttribute("onfocusout", "updateElementFromForm(" + index + ", this, true)")
    select.parentNode.insertBefore(input, select.nextSibling)
}

//Updates parent elements from input data, updates the sql to reflect new form data. carries on.
function updateElementFromForm(target, origin, clickoff) {
    if ((!event.shiftkey & event.keyCode == 17) || clickoff) {
        console.log("Test updateElementFromForm" + ' ' + storage.nodeStorage);
        target = origin.previousSibling;
        //Replace content from input to dom
        origin.previousSibling.innerHTML = origin.getAttribute('value');
        console.log("Target Value :" + origin.previousSibling.innerHTML + " Value to be inserted : " + origin.innerHTML);
        //Send to server

        //remove form and reenable node
        target.setAttribute("style", "display:block");
        origin.parentNode.removeChild(origin);
    } else if (event.keyCode == 27) {
        //Escape Pressed, Cancel everything
    }
}

//Deletes Folder, Remove element and ping server's php to remove from memory
function deleteFolder(target) {

}

//Creates Folder, Pings PHP to create the default, initialaizes form, runs updateElementFromForm when values are entered and converts to normal
function newFolder() {

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