const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
button = dropArea.querySelector("button"),
input = dropArea.querySelector("input")
let file; 

let browse = document.getElementById("browse");
let inputFile = document.getElementById('fileInput');
let deleteButton = document.getElementById("delete");

browse.onclick = ()=>{

  inputFile.click(); //if user click on the button then the input also clicked
}


 let preventFileDialog = function(e)
 {
  e.disabled = true;
  setTimeout(function() { e.disabled = false; }, 1);
 
 };

input.addEventListener("change", function(){
  //getting user select file and selects first file if user selects more than one
  file = this.files[0];
  dropArea.classList.add("active");
  showFile(); //calling function
});


//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", ()=>{
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

//If user drop File on DropArea
dropArea.addEventListener("drop", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  
  if( dropArea.children.length > 6 ){ // attempting to redrop another image then remove the previous one before you can

    dropArea.children[6].remove();
  }

  var img = event.dataTransfer.getData("text/html");


  file = event.dataTransfer.files[0];


if( img.slice(0,4) === "<img" ){ // if user dragged an image from online

  drop(event);

}else{ // if user dragged an image from computer
  
  showFile();

}


});


function drop(evt) {
    evt.stopPropagation();
    evt.preventDefault(); 
    var imageUrl = evt.dataTransfer.getData('text/html');

    var rex = /src="?([^"\s]+)"?\s*/;
    var url, res;

    url = rex.exec(imageUrl);

    let imgTag = `<img id="image" src="${url[1]}" alt="">`; //creats an img tag and passes the user selected file source inside src attribute
    let deleteButtonTag = `<button id="delete" class="hide" onclick="resetStuff()">Delete</button>`
      
      for(x = 0; x < dropArea.children.length; x+=1){

          dropArea.children[x].className = "hide";

      }
      
      dropArea.insertAdjacentHTML("beforeend", imgTag); // adds image tag that wil be displayed once user drops image
   
}

function showFile(){

  let fileType = file.type; //getting selected file type
  
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
  
  if( validExtensions.includes(fileType) ){ //if user selected file is an image file
    let fileReader = new FileReader(); //creats a new FileReader object
    fileReader.onloadend = ()=>{
      let fileURL = fileReader.result; //passing user file source in fileURL variable
      
      let imgTag = `<img id="image" src="${fileURL}" alt="">`; //creats an img tag and passes the user selected file source inside src attribute
      let deleteButtonTag = `<button id="delete" class="hide" onclick="resetStuff()">Delete</button>`
      

      for(x = 0; x < dropArea.children.length; x+=1){

          dropArea.children[x].className = "hide";

      }
      
      dropArea.insertAdjacentHTML("beforeend", imgTag); // adds image tag that wil be displayed once user drops image
    }
    fileReader.readAsDataURL(file);
    
  }else{
    alert("This is not an Image File!");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}


let image = document.getElementById("image");

function showDelete(){

  if( dropArea.children.length == 7 ){ // whne the user has dropped or dragged an image

   deleteButton.className = "showDeleteButton"

  }
}

function hideDelete(){

    deleteButton.className = "hide"
}



function resetStuff(){

  if( dropArea.children.length > 6 ){ // attempting to redrop another image then remove the previous one before you can

    dropArea.children[6].remove();
  }
  for(x = 0; x < dropArea.children.length; x+=1){

      dropArea.children[x].classList.remove("hide");

  }

    deleteButton.className = "hide";
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";


    linkTextBox.removeAttribute("disabled");
    browse.removeAttribute("disabled");

}
