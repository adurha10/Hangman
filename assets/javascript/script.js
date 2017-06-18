// Handler when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function(){
  	
  	//Declare global variables
	var solution;
	var lives = 0;
	var solutionDisplay =[];
	var letters = ["a", 
					"b", 
					"c", 
					"d", 
					"e", 
					"f", 
					"g", 
					"h", 
					"i", 
					"j", 
					"k", 
					"l", 
					"m", 
					"n", 
					"o", 
					"p", 
					"q", 
					"r", 
					"s", 
					"t", 
					"u", 
					"v", 
					"w", 
					"x", 
					"y", 
					"z"]
	var wordList = ["Lannister",
					"Arryn",
					"Baratheon",
					"Bolton",
					"Cerwyn",
					"Greyjoy",
					"Hightower",
					"Hornwood",
					"Karstark",
					"Martell",
					"Mormont",
					"Oakheart",
					"Penrose",
					"Piper",
					"Targaryen",
					"Tully",
					"Tyrell",
					"Westerling"]
	var startButton = document.getElementById("start");
	startButton.onclick = start;
	var hintButton = document.getElementById("hint");
	hintButton.onclick = hint;
	var letterGrid = ""


	//Funtion to reprint lives counter
	function updateLives(){
		document.getElementById("lives").innerHTML = "Lives Remaining: " + lives;
	}

	function resetLives(){
		lives = 6;
	}

	function resetButtons(){
		var primaryBtn = document.getElementsByClassName("btn");
		var resetNumber = primaryBtn.length
		for (var i = 0; i < resetNumber; i++) {
			primaryBtn[i].classList.add("btn-primary");
			primaryBtn[i].classList.remove("btn-danger");
		}
	}

	function clearInstructions(){
		document.getElementById("instructions").innerHTML = "";
	}

	//Reprint solution display
	function updateSolutionDisplay(){
		document.getElementById("solution").innerHTML = "";
		console.log(document.getElementById("solution"));
		console.log(solution);
		console.log(solutionDisplay);
		document.getElementById("solution").innerHTML = solutionDisplay.join(" "); 
	}

	//Function to choose a word from the word bank and display appropriate blanks
	function chooseSolution(){
		var choice = Math.floor(Math.random() * wordList.length);
		solution = wordList[choice].toLowerCase();
		solution = solution.split("");
		solutionDisplay=[];
		for (var i = 0; i < solution.length; i++) {
			solutionDisplay.push("_");
		}
	}

	function start(){
		solution = [];
		resetLives();
		updateLives();
		chooseSolution();
		resetButtons();
		clearInstructions();
		updateSolutionDisplay();
	}
	
	function gameOver(){
		document.getElementById("instructions").innerHTML = "GAME OVER!! Click 'Start' to try again!";
	}

	function hint(){
		if (solutionDisplay.indexOf("_") !== -1){
			console.log(solution);
			var random = Math.floor(Math.random() * solution.length);
			console.log(random);
			console.log(solutionDisplay[random]);
			 while (solutionDisplay[random] !== "_"){
			 	random = Math.floor(Math.random() * solution.length)
			 	console.log(solutionDisplay[random])
			 }

			var randomLetter = solution[random];
			console.log(randomLetter);

			for (var i = 0; i < solution.length; i++) {
				console.log("loop: " + i);
					if (randomLetter === solution[i]){
						console.log("letter match on index: " + i);
						solutionDisplay[i] = randomLetter;
						console.log(solutionDisplay);
						if (solutionDisplay.indexOf("_") === -1) {
							document.getElementById("instructions").innerHTML = "Awesome! You only needed a little help. Click 'Start' to try again!";
						} 
					} 
				}
			updateSolutionDisplay();	
		}			
	}

	//Function to update button css to "picked" and to update solution display
	function letterClick(){
		if (lives > 0){
				this.classList.add("btn-danger");
				this.classList.remove("btn-primary");

				var letterClicked = this.getAttribute("data-letter");
				
				if (solution.indexOf(letterClicked) !== -1){
					for (var i = 0; i < solution.length; i++) {
						if (letterClicked === solution[i]){
							solutionDisplay[i] = letterClicked;
							if (solutionDisplay.indexOf("_") !== -1) {

							} else {
								document.getElementById("instructions").innerHTML = "Awesome! Click 'Start' to try again!";
								solution.empty();
							}
						} 
					}
				} else {
					lives--;
					if (lives === 0){
						gameOver();
					}
					updateLives();
				}
				updateSolutionDisplay();
		} else {
			document.getElementById("instructions").innerHTML = "Out of lives - Click 'Start' to try again!";
		}
	}

	//Dynamically create the letter grid 
	
	for (var i = 0; i < letters.length; i++) {
		letterGrid = document.createElement("button");
		letterGrid.innerHTML = letters[i];
		letterGrid.classList.add("col-xs-3");
		letterGrid.classList.add("btn");
		letterGrid.classList.add("btn-primary");
		letterGrid.setAttribute("data-letter", letters[i]);
		letterGrid.onclick =  letterClick;
		document.getElementById("letter-grid").appendChild(letterGrid);
	}
});