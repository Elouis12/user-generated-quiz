let backToTop = document.getElementById("backToTop");


// scroll back to top
backToTop.addEventListener('click', ()=>{


	window.scrollTo({

		top:0,
		left:0,
		behavior:"smooth"
	});


})



// show back to top button when scrolling down
window.addEventListener("scroll", ()=>{


	let y = window.scrollY;
			

	if( y >= 50 ){

		backToTop.className = "backToTop"; // apply the class

	}else{

		backToTop.className = "hide";

	}

});
