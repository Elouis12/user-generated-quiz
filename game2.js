// FORM
let form = document.getElementById("form");

// GAME FORM
let gameForm = document.getElementById("gameForm");

// TEXTBOXES
let linkTextBox = document.getElementById("link-text");
let answerTextBox = document.getElementById("answer-text");

// TOPIC
let topic = document.getElementById("topic-text");

// CONTAINER FALLERY DIV
let container = document.getElementById("container");

// CHOOSE HOW IT WILL SHOW ON GRID
let gridPosition = new Array("", "w-3 h-2", "w-3 h-3", "h-2", "w-4 h-1", "h-2", "w-3 h-4", "w-1 h-1");

// STORE LINKS AND ANSWERS
let linksArray = new Array();
let choicesArray = new Array();
let questionArray = new Array();

let challengeCount = 1;

// IF WE END UP CHANGING H3 AND DIV IN MENU DIV THEN CAHNGE LAST .CHILDREN IN PLAYIT
// AND CHNAGE FORIN EDIT ITEM


form.addEventListener("submit", (e)=>{

	e.preventDefault();

	add(e);

})

// VERIFY INPUTS
function verify(e){

	let linkTextBox = document.getElementById("link-text");
	let answerTextBox = document.getElementById("answer-text");
	let textTextBox = document.getElementById("text-text");


	if( ( linkTextBox.value && textTextBox.value && answerTextBox.value ) || // all field are filled
	( linkTextBox.value.trim() == "" && textTextBox.value.trim() == "" && answerTextBox.value.trim() == "" ) || // all fields are not filled

	( ( linkTextBox.value && answerTextBox.value ) && textTextBox.value.trim() === "" ) || // link and answer is filled but text is not filled
		( ( textTextBox.value && answerTextBox.value ) && linkTextBox.value.trim() === "" )  ){ // text and answer is filled but link is not filled

		linkTextBox.setAttribute("class", "gallery-input");
		answerTextBox.setAttribute("class", "gallery-input");
		textTextBox.setAttribute("class", "gallery-input");

	}else if( answerTextBox.value.trim() == "" ){ // entered nothing for answer box

		answerTextBox.className = "dodgerRed"

	}else if( ( linkTextBox.value.trim() == "" && textTextBox.value.trim() == "" ) ){ // entered at answer but link and text ar enot filled

		linkTextBox.className = "dodgerRed"
		textTextBox.className = "dodgerRed"

	}

	if( topic.value ){ // when we clicked play it gave it red if not entered, but when we enter give back its color

		topic.setAttribute("class", "gallery-input");
	}

}

function add(e){

	let linkTextBox = e.target.children[0].children[1].children[0].children[1];
	let answerTextBox = e.target.children[0].children[2].children[1];
	let textTextBox = e.target.children[0].children[1].children[2].children[1];
	let content;


	if( ( linkTextBox.value.trim() || textTextBox.value.trim() ) && answerTextBox.value.trim() ){

		let enterImg = "" // if a link is given
		let enterDiv = "" // if no link is given

		if( linkTextBox.value.trim() == "" ){

			enterDiv = `<div class="gradient"></div>`
		
		}else{

			 enterImg = `<img src="${linkTextBox.value.trim()}" alt="${answerTextBox.value.trim()}">`

		}


		content = `<div class="gallery-container ${ gridPosition[ Math.floor( Math.random() * gridPosition.length ) ] } ${linkTextBox.value.trim() === ""? "gradient":""}">
  						<div class="gallery-item">
    						<div class="image">

    						${linkTextBox.value.trim() === ""? enterDiv:enterImg}

    						</div>
    						<div class="menu">

  								<h6 class="question">${textTextBox.value.trim()}</h6>
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
		textTextBox.value = "";

		linkTextBox.focus();

	}else if( ( linkTextBox.value.trim() || textTextBox.value.trim() ) && answerTextBox.value === "" ){

		answerTextBox.focus();

	}else if( answerTextBox.value == "" && ( linkTextBox.value == "" && textTextBox.value === "" ) ){

		linkTextBox.className = "dodgerRed"
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
		}

		editLink.setAttribute("src", change);

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

		editQuestion.innerHTML = change;
		editQuestion.setAttribute("alt", change);
	}

}


function deleteItem(e){

	let galleryContainer = e.parentElement.parentElement.parentElement;

	galleryContainer.remove();

}

function playIt(){

	if( container.children.length > 3  ){

		if( topic.value ){

			let title = document.getElementById("title");
			title.innerHTML = topic.value.trim().toUpperCase();

			form.className = "hide";
			container.className = "hide";
			gameForm.className = "show";

			let link;
			let choice;
			let question;

			for( x = 0; x < container.children.length; x+=1 ){

				link = container.children[x].children[0].children[0].children[0].getAttribute("src")

				choice = container.children[x].children[0].children[1].children[1].innerHTML;

				question = container.children[x].children[0].children[1].children[0].innerHTML;

				linksArray[x] = link;

				choicesArray[x] = choice;

				questionArray[x] = question;

			}	

			shuffle3(linksArray, choicesArray, questionArray)

			loadChallenge(challengeCount++);

		}else{

			topic.className = "dodgerRed";
		}

	}else{

		alert("enter at least 4 items")
	}

}

function clearAll(){

		while( container.children[0] ){

			container.children[0].remove();
		}

}


// CAN REMOVE STUFF PAS HERE _________________


let fillButtons = new Array();
let copyChoicesArray = new Array();

// LOAD CHALLENGE
function loadChallenge(chalNum){

	clicks = 0;

    let chalDiv = document.getElementById(`challenge`)
    let img = document.getElementById(`gameImg`);
    let gameH3 = document.getElementById(`gameH3`);
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

   if( linksArray[ chalNum - 1 ] == "" ){ // if user did not give an image

   	img.className = "hideVisibility";

	   Object.assign(img, {
      // src: linksArray[chalNum-1],
      // alt: picAlt,
      value: picAlt 
	   });
   	// img.setAttribute("value", picAlt);


   }else{

   	img.className = "showVisibility";

	   Object.assign(img, {
	         src: linksArray[chalNum-1],
	         alt: picAlt,
	   });
   }

   if( questionArray[ chalNum-1 ] === "" ){ // if user did not give a question

   	gameH3.className ="hideVisibility";

   }else{

   	img.setAttribute("value", picAlt);

   	gameH3.className ="statement";
   	gameH3.innerHTML = questionArray[ chalNum-1 ];
   }


}


// RESET BUTTONS
function resetButtons(){

	let challenge = document.getElementById("challenge");

	for( x = 1; x < 5; x+=1 ){

		challenge.children[x].className = "buttons"

	} 
}


// NEXT
function next(){

	resetButtons();

	let nextButton = document.getElementById("nextButton");

	if( challengeCount == linksArray.length ){ // at the last one

		Object.assign( nextButton, {

			value: "End",
		})
		nextButton.setAttribute("onclick", "restart()")
		restartButton.className = "hide"// hide restart button

	}

	if( clicks == 1 ){ // if the user has clicked a choice
			
		loadChallenge(challengeCount++);

	}else if( clicks == 0 ){ // if the user has not clicked a choice


		if( confirm("are you sure next") ){

			loadChallenge(challengeCount++); // load the next challenge

		}
	}

}

// SHOW ANSWER
function showAnswer(){

	if( clicks === 0 ){ 

		if( confirm("are you sure?") ){ // if the user has not clicked yet and wants to see it

			let img = document.getElementById("gameImg");

			let button;

			for( x = 1; x < 5; x+=1 ){

				button = document.getElementById(`button${x}`);

				if( button.getAttribute("value") ===  ( img.getAttribute("alt") || img.getAttribute("value") ) ){

					button.className = "correct"
				}
			}
		}

	}
	
	clicks = 1;

}

// CHOOSE CORRECT
function chooseCorrect(e){

	let buttonClicked = e;

	if( clicks === 0 ){

		let img = document.getElementById("gameImg");


		if( buttonClicked.getAttribute("value") === ( img.getAttribute("alt") || img.getAttribute("value") ) ){

			buttonClicked.className = "correct"

		}else{

			buttonClicked.className = "wrong";
		}

	}
	
	clicks = 1;

}

// RESTART
function restart(){

	resetButtons();

	form.className = "show";
	container.className = "container"
	gameForm.className = "hide";

	linkTextBox.value = "";
	answerTextBox.value = "";

	challengeCount = 1;
	clicks = 0;

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