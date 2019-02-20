//    main.js file by Matthew Nelson
//
//
//
//----------------------------------//
	/////////////////////////
	// Important Variables //
	/////////////////////////

var modal = document.getElementById('id01');
	
	
//----------------------------------//

	//////////////////////
	// On Load function //
	//////////////////////
	
window.addEventListener("load", function() {
	
},false);


function timer(arg) {
	switch(arg) {
		case "start":
			timeKeeper = setInterval(updateClock,1000);
			break;
		case "clear":
			clearInterval(timeKeeper)
			time=0
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

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//----------------------------------//

