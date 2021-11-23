// FORM
let menuForm = document.getElementById("menuForm");

// GAME FORM
let gameForm = document.getElementById("challengeDiv");

// TEXTBOXES
let linkTextBox = document.getElementById("image-input");
let answerTextBox = document.getElementById("answer-input");

// TOPIC
let topic = document.getElementById("topic-input");

// CONTAINER GALLERY DIV
let container = document.getElementById("container");

// TO RANDOMLY CHOOSE HOW IT WILL SHOW ON GRID
let gridPosition = new Array("w-4 h-4", "w-4 h-3", "w-3 h-4", "w-3 h-3", "w-2 h-3", "w-3 h-2", "w-2 h-2"/*, "w-3 h-3", "h-2", "w-4 h-1", "h-2", "w-3 h-4", "w-1 h-1"*/);

// STORE LINKS AND ANSWERS
let linksArray = new Array();
let choicesArray = new Array();
let questionArray = new Array();

let challengeCount = 1;
let question = 1;
let correct = 0;
let wrong = 0;

// https://source.unsplash.com/1600x900/?travel

menuForm.addEventListener("submit", (e)=>{

	e.preventDefault();

	add(e);


})


// link and drag

function linkAndDrag(){

	let choiceOfInput = "";

	let linkTextBox = document.getElementById("image-input");

	let browse = document.getElementById("browse");

	// checks if user drag and droped image or entered image link

	if( linkTextBox.value.length > 0 && dropArea.children.length < 7 ){ // entered image link then disbaled drag and drop

		browse.disabled = "true"
		choiceOfInput = "link";

	}else if( linkTextBox.value.length <= 0 && dropArea.children.length > 6 ){

		linkTextBox.disabled = "true"
		choiceOfInput = "file"

	}else if( linkTextBox.value.length <= 0 && dropArea.children.length < 7 ){

		linkTextBox.removeAttribute("disabled");
		browse.removeAttribute("disabled");
	}

	return choiceOfInput;
}

// VERIFY INPUTS
function verify(e){


	let linkTextBox = document.getElementById("image-input");
	let answerTextBox = document.getElementById("answer-input");
	let questionTextBox = document.getElementById("question-input");



	if( ( linkTextBox.value && questionTextBox.value && answerTextBox.value ) || // all field are filled
	( linkTextBox.value.trim() == "" && questionTextBox.value.trim() == "" && answerTextBox.value.trim() == "" ) || // all fields are not filled

	( ( linkTextBox.value && answerTextBox.value ) && questionTextBox.value.trim() === "" ) || // link and answer is filled but text is not filled
		( ( questionTextBox.value && answerTextBox.value ) && linkTextBox.value.trim() === "" )  ){ // text and answer is filled but link is not filled

		linkTextBox.setAttribute("class", "gallery-input");
		answerTextBox.setAttribute("class", "gallery-input");
		questionTextBox.setAttribute("class", "gallery-input");

	}else if( answerTextBox.value.trim() == "" ){ // entered nothing for answer box

		answerTextBox.className = "dodgerRed"

	}else if( ( linkTextBox.value.trim() == "" && questionTextBox.value.trim() == "" ) ){ // entered at answer but link and text ar enot filled

		linkTextBox.className = "dodgerRed"
		questionTextBox.className = "dodgerRed"

	}

	if( topic.value ){ // when we clicked play it gave it red if not entered, but when we enter give back its color

		topic.setAttribute("class", "gallery-input");
	}

}

function add(e){

	let linkTextBox = e.target.children[1].children[0].children[0];
	let questionTextBox = e.target.children[2].children[0];
	let answerTextBox = e.target.children[3].children[0];

	let content;


	let choiceOfInput = linkAndDrag();

	if( ( ( choiceOfInput == "link" || choiceOfInput == "file" ) || questionTextBox.value.trim() ) &&
	    answerTextBox.value.trim() ){ // if either ( ( link or file ) OR queston ) AND ( answer )

		let enterImg = "" // if a link is given
		let enterDiv = "" // if no link is given

		if( choiceOfInput === "" && dropArea.children.length < 7  ){ // give it a div as a place holder if link text box is empty or file not dragged and dropped

			enterDiv = `<div class="gradient"></div>`
		
		}else{

			let imageFromDragAndDropSource = "";


			if( choiceOfInput === "file" ){ // if choice of image input was from choosing a file
				
				imageFromDragAndDropSource = document.getElementById("image").getAttribute("src");

			}
			let imgSource = ( choiceOfInput == "link"? linkTextBox.value.trim() : imageFromDragAndDropSource )

			 enterImg = `<img src="${imgSource}" alt="${answerTextBox.value.trim()}" />`

		}

		let lastElementOfQuestionBox = questionTextBox.value.trim()[ questionTextBox.value.trim().length - 1 ]; // check is user entered a question mark at end of question

		// displays/fills the contents onto the screen
		content = `<div class="gallery-container ${ gridPosition[ Math.floor( Math.random() * gridPosition.length ) ] } ${linkTextBox.value.trim() === ""? "gradient":""}">
  						<div class="gallery-item">
    						<div class="image">

    						${choiceOfInput === ""? enterDiv:enterImg}

    						</div>
    						<div class="menu">

  								<h6 class="question">${ ( ( lastElementOfQuestionBox == "?" || questionTextBox.value.trim() == "" ) ? questionTextBox.value.trim() : ( questionTextBox.value.trim() ) + "?" )}</h6>
    							<div id="answer" class="text">${answerTextBox.value.trim()}</div>
    							<input class="gallery-buttons" type="button" value="Edit Link" onclick="editItem(this)">
    							<input class="gallery-buttons" type="button" value="Edit Question" onclick="editItem(this)">
    							<input class="gallery-buttons" type="button" value="Edit Answer" onclick="editItem(this)">
    							<input class="gallery-buttons" type="button" value="Delete" onclick="deleteItem(this)">

							</div>
  						</div>
					</div>`

		container.insertAdjacentHTML("beforeend", content );

		linkTextBox.value ="";
		answerTextBox.value ="";
		questionTextBox.value = "";

		linkTextBox.focus();

		resetStuff();

	}else if( ( linkTextBox.value.trim() || questionTextBox.value.trim() ) && answerTextBox.value === "" ){ // enetered nothing for answer box

		answerTextBox.focus();

	}else if( answerTextBox.value == "" && ( linkTextBox.value == "" && questionTextBox.value === "" ) ){ // entered nothing for all 3 boxes

		linkTextBox.className = "dodgerRed";
		questionTextBox.className = "dodgerRed"
		answerTextBox.className = "dodgerRed";
	}

}


function editItem(e){

	// EDIT LINK
	let editLink = e.parentElement.parentElement.children[0].children[0];

	// EDIT ANSWER
	let editAnswer = e.parentElement.children[1];

	// EDIT ANSWER
	let editQuestion = e.parentElement.children[0];

	// CHANGE
	let change;


	if( e.getAttribute("value") == "Edit Link" ){

		change = prompt("Edit link", editLink.getAttribute("src"));

		if( change == null ){ // incase user clicks "cancel" so it doesn't return an empty string

			return;

		}else if(change == "" ){ // user decides to not use an image then show div block with gradient

			editLink.parentElement.insertAdjacentHTML("beforeend", '<div class="gradient"></div>'); // add new div gradient
			editLink.remove(); // then remove image tag
			return;
		}

		editLink.parentElement.insertAdjacentHTML("beforeend",`<img src=${change}/>`); // add new div gradient
		editLink.remove();


	}else if( e.getAttribute("value") == "Edit Answer" ){

		change = prompt("Edit answer", editAnswer.innerHTML);

		if( change == null ){

			return;
		}

		editAnswer.innerHTML = change;
		editAnswer.setAttribute("alt", change);

	}else if( e.getAttribute("value") == "Edit Question" ){

		change = prompt("Edit answer", editQuestion.innerHTML);

		if( change == null ){

			return;
		}

		// editQuestion.innerHTML = ( ( change.trim()[ change.trim().length -1 ] == "?" ) ?  change.trim() : change.trim() + "?"  ); // adds question mark if none is added
		
		editQuestion.innerHTML = ( ( change.trim() == ""  && change.length <= 0) ?  change.trim() : change.trim() + "?"  ); // adds question mark if none is added

		editQuestion.setAttribute("alt", change);
	}

}


function deleteItem(e){

	let galleryContainer = e.parentElement.parentElement.parentElement;

	galleryContainer.remove();

}

function playIt(){

	if( container.children.length >= 4 ){ // make sure we have at least 4 questions

		if( topic.value ){ // has to have a topic added

			let title = document.getElementById("title");
			title.innerHTML = topic.value.trim().toUpperCase();


			let link;
			let choice;
			let question;

			for( x = 0; x < container.children.length; x+=1 ){

				link = container.children[x].children[0].children[0].children[0].getAttribute("src")

				choice = container.children[x].children[0].children[1].children[1].innerHTML;

				question = container.children[x].children[0].children[1].children[0].innerHTML;

				linksArray[x] = ( link == null? "" : link ); // replace the link with a string

				choicesArray[x] = choice;

				questionArray[x] = question;

			}


			menuForm.className = "hide";
			container.className = "hide";
			gameForm.setAttribute("style", "display:flex");
			// gameForm.className = "show";
			total.className = "total"; // show tracker
			info.style.visibility = "hidden"	

					resetStuff();


			shuffle3(linksArray, choicesArray, questionArray)

			loadChallenge(challengeCount++);

		}else{

			topic.className = "dodgerRed";
			topic.focus();
		}

	}else{

		alert("Enter At Least 4 Items")
	}

}

function clearAll(){ // clears all content from menu


	if( container.children.length > 0 && confirm("Are You Want To Clear All?") ){

		while( container.children[0] ){

			container.children[0].remove();
		}

		// reset arrays
		linksArray = new Array();
		choicesArray = new Array();
		questionArray = new Array();

	}

}


//__________________________________________________

let fillButtons = new Array();
let copyChoicesArray = new Array();

// LOADS THE CHALLENGES ONE BY ONE
function loadChallenge(chalNum){


   total.innerHTML = ` <br/> ${correct}/${question} <br/> ${percent(correct/( (question <= 1? question : question-1 ) ))}%`    // so it does not 'update' score when loading a new tracker, score is updated until user selects an option


	clicks = 0;

    let img = document.getElementById(`card-image`);
    let gameH3 = document.getElementById(`question`);
    let picAlt;
    let buttonId;

    // SETS CHOICE VALUES
   let button;

   let correctChoice = choicesArray[chalNum-1];

   let newArray = copyChoicesArray.concat(choicesArray);

   shuffle1( newArray );

   if( linksArray.length > 4 ){ // there will be duplicates

   	   fillButtons = [ newArray[0], newArray[1], newArray[2], correctChoice  ];

		removeDuplicates(newArray, fillButtons, fillButtons[ fillButtons.length - 1 ] );

   }else{ // just take the only 4

   		fillButtons = [ newArray[0], newArray[1], newArray[2], newArray[3] ]
   }
   shuffle1(fillButtons);

   for( x = 1; x < 5; x+=1){

		button = document.getElementById(`button${x}`);	
	   Object.assign(button, {

	      value: `${ fillButtons[x-1] }`,

		});
   }

      
   // SETS THE IMG ALT AND SRC IF WE NEED TO
   picAlt = choicesArray[chalNum-1];

 	if( linksArray[ chalNum - 1 ] != "" /*&& linksArray[ chalNum - 1 ]*/ ){ // only display image if user gave one

   	img.style.backgroundImage = `url(${linksArray[chalNum-1]})`;
   	img.setAttribute("alt", picAlt);

   }else{

   	img.style.backgroundImage = `url("")`;
   	img.setAttribute("alt", picAlt);
   }


   if( questionArray[ chalNum-1 ] != "" ){ // only display question if user gave one

		img.setAttribute("alt", picAlt)

   	gameH3.className ="statement";
   	gameH3.innerHTML = questionArray[ chalNum-1 ];

   }else{

		gameH3.innerHTML = "";

   }


}


function allowToEnd(){

		if( challengeCount-1 == linksArray.length ){ // allow to end

		nextButton.className = "endButtonNormal";
		nextButton.disabled = false;
		nextButton.style.cursor = "pointer";

	}
}


// RESET BUTTONS
function resetButtons(){

	let button = document.getElementById("card-stats");

	for( x = 0; x < 4; x+=1 ){

		button.children[x].className = "buttons"

	} 
}


// NEXT
function next(){

	resetButtons(); // when going to next question / restarting removes green and red styles( "resetting each button")

	question += 1; // increment question count

	let nextButton = document.getElementById("nextButton");

	if( challengeCount-1 == linksArray.length-1 ){ // at the last one

		Object.assign( nextButton, {

			value: "End",
		})
		nextButton.setAttribute("onclick", "restart()")
		nextButton.disabled = true;
		nextButton.className = "endButton";
		nextButton.style.cursor = "not-allowed";
		restartButton.className = "hide"// hide restart button

	}

	if( clicks == 1 ){ // if the user has clicked a choice
			
		loadChallenge(challengeCount++);

	}else if( clicks == 0 ){ // if the user has not clicked a choice


		if( confirm("Are You Sure You Would Like To Go To The Next?") ){

			loadChallenge(challengeCount++); // load the next challenge

		}
	}

}

// SHOW ANSWER
function showAnswer(){

	let img = document.getElementById("card-image");

	let button;

	if( clicks === 0 ){ // opting to view correct choice( will mark wrong )

		if( confirm("Are You Sure You Want To Show?") ){ // if the user has not clicked yet and wants to see it

			for( x = 1; x < 5; x+=1 ){ // goes through button to select / show correct one

				button = document.getElementById(`button${x}`);

				if( button.getAttribute("value") ===  ( img.getAttribute("alt") || img.getAttribute("value") ) ){

					button.className = "correct";



               total.innerHTML = ` <br/> ${correct}/${question} <br/> ${percent(correct/question)}%`
               wrong+=1;
               clicks = 1;

               // allowToEnd();
               break;

				}
			}
		}

	}else{

      for(y = 1; y < 5; y += 1){

			button = document.getElementById(`button${y}`);

         if( button.getAttribute("value") ===  ( img.getAttribute("alt") || img.getAttribute("value") ) ){

            /*if( button.classList.contains("correct") && clicks >=1 ){


            }*/
            button.className = "correct"  

            break;


         }
      }


   } 

allowToEnd();

      clicks = 1 	

}

// CHOOSE CORRECT
function chooseCorrect(e){

	let buttonClicked = e;

	if( clicks === 0 ){

		let img = document.getElementById("card-image");


		if( buttonClicked.getAttribute("value") === ( img.getAttribute("alt") || img.getAttribute("value") ) ){

			buttonClicked.className = "correct"
			correct += 1;
         total.innerHTML = ` <br/> ${correct}/${question} <br/> ${percent(correct/question)}%`


		}else{

			buttonClicked.className = "wrong";
			wrong += 1;
         total.innerHTML = ` <br/> ${correct}/${question} <br/> ${percent(correct/question)}%`

		}

	}

allowToEnd();
	clicks = 1;

}


function percent(x){ // TURNS SCORE INTO PERCENT

   let value = x

   return ( value * 100 ).toFixed(2)
}

// RESTART
function restart(){

	resetButtons();

	// if(confirm("Are you sure you want to restart?") && restartButton.getAttribute("value") != "End" ){ // when not at the last 



	// }

	menuForm.className = "menuForm";
	container.className = "container";
	gameForm.style.display = "none";
	// gameForm.className = "hide";
	info.style.visibility = "visible"	

	linkTextBox.value = "";
	answerTextBox.value = "";

	challengeCount = 1;
	clicks = 0;
	correct = 0;
	question = 1;
	wrong = 0;
	total.className = "hide"; // hides tracker


	Object.assign( nextButton, {

		value: "Next",
	})
	nextButton.setAttribute("onclick", "next()")
	restartButton.className = "restartButton"// show restart button

}


function shuffle1(array) {
   var y, z;
   for (x = array.length - 1; x > 0; x--) {

      y = Math.floor(Math.random() * (x + 1));
      z = array[x];
      array[x] = array[y];
      array[y] = z;
   }

}

function shuffle3(array1, array2, array3) {
   var y, z;
   for (x = array1.length - 1; x > 0; x--) {

      y = Math.floor(Math.random() * (x + 1));

      // shuffle array 1
      z = array1[x];
      array1[x] = array1[y];
      array1[y] = z;

      // shuffle array 2
      z = array2[x];
      array2[x] = array2[y];
      array2[y] = z;

      // shuffle array 3
      z = array3[x];
      array3[x] = array3[y];
      array3[y] = z;
   }

}

// REMOVE DUPLICATES
function removeDuplicates(newArray, fillButtons, value){

	for( x = 0; x < 3; x+=1 ){

		if( fillButtons[x] == value ){

			fillButtons[x] = newArray[4];
		}
	}
}


// DARK MODE

let toggleCount = 0;
function darkMode(){ // DARK BACKGROUND

   let body = document.getElementById("body");
   let info = document.getElementById("info")
   let h3;
   let h1 = document.getElementById("title"); 
   let total = document.getElementById("total"); 
   let img = document.getElementsByTagName("IMG");
   let toggle = document.getElementById("toggle");

      if( toggleCount%2 === 0 ){

      toggle.setAttribute('title', "Dark Mode");

   }else{

      toggle.setAttribute('title', "Light Mode");
   }

   document.body.classList.toggle("darkMode");

   info.classList.toggle("info-white")
}

function spin(){

   let title = document.getElementsByTagName("H1")
   let x = 0;

   // while(x<1){

         title.className = "title"
      // x+=1
   // }
}
spin();




// disables enter key( it brought up file dialog )
window.addEventListener('keydown',function(e){if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){if(e.target.nodeName=='INPUT'&&e.target.type=='text'){e.preventDefault();return false;}}},true);


