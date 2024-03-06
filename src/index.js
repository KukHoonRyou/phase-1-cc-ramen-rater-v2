

// This function receives the information of the clicked ramen 
// and displays the corresponding details on the screen.

const handleClick = (ramen) => {
  const detailName = document.querySelector("#ramen-detail > .name");
  const detailRestaurant = document.querySelector("#ramen-detail > .restaurant");
  const detailImg = document.querySelector("#ramen-detail > .detail-image");
  const detailsRating = document.getElementById("rating-display");
  const detailsComment = document.getElementById("comment-display");

  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailImg.src = ramen.image;
  detailImg.alt = ramen.name;
  detailsRating.textContent = ramen.rating;
  detailsComment.textContent = ramen.comment;
};

//submitted ramen information to be processed when the form is submitted, 
//displaying that information on the screen, and enabling the addition, update, and deletion of data.

const handleSubmit = (e) => {
  e.preventDefault() //prevent the default behavior of refreshing the page when an event occurs.
  const name = e.target['new-name'].value;
  const restaurant = e.target.restaurant.value;
  const image = e.target.image.value;
  const rating = e.target.rating.value;
  const comment = e.target ['new-comment'].value;
  const newRamen= {name, restaurant, image, rating, comment};
  e.target.reset();
  
  displayRamen(newRamen);
  addNewRamen(newRamen);
  updateRamen(newRamen);
  deleteRamen(newRamen);
};

//this function sets up an event listener for the submit event on the "new-ramen" form, 
//ensuring that when the form is submitted, 
//the handleSubmit function is called to handle the form data.

const addSubmitListener = () => {
  const ramenForm = document.querySelector("#new-ramen"); //new-ramen id select
  if (ramenForm) {
    ramenForm.addEventListener("submit", handleSubmit);
  };
};

//receive and display new ramen information
//handle click event

const displayRamen = (newRamen) => {
  const ramenMenuDiv = document.getElementById("ramen-menu"); //container for displaying ramen menu
  const img = document.createElement("img"); //creat new image
  img.src = newRamen.image;
  img.alt = newRamen.name;
  img.classList.add("image-slider") //apply image style -> slider
  img.addEventListener("click", (e) => handleClick(newRamen, e));//call handleClick function
  ramenMenuDiv.appendChild(img); //add image to the contatiner
};

//connect server and display remens

const displayRamens = () => {
  fetch("http://localhost:3000/ramens") //api
  .then((res) => res.json()) //response trangit to JSON
  .then((ramens) => { //receive JSON type list
    document.getElementById("ramen-menu").innerHTML = ""; //empty ramen-munu id
    ramens.forEach(displayRamen) //itereate each ramen list and display
  })
  .catch((error) => console.log(error)); //if error occur, display
};
 
const main = () => {
  addSubmitListener(); //handling e when submitting new ramen infor to the server
  displayRamens(); //displaying the initial list of ramen fetched from the server 
};

main() //invoke both function

// //Edit rating
// let ramen = {
//   rating: 0,
// };

// const detailsRating = document.querySelector('#rating-display');
// detailsRating.addEventListener('click', () => {
//   const newRating = prompt('Enter a new rating (1-10):', ramen.rating);
//   if(newRating === null || newRating.trim() === '') {
//    return;
//    }
// });

//     const parsedRating = parseInt(newRating);
//     if(isNaN(parsedRating) || parsedRating < 1 || parsedRating > 10) {
//      alert('Please enter a valid rating between 1 and 10.');  
//   }
//    ramen.rating = parsedRating;
//    detailsRating.textContent = ramen.rating; {
//    return;
// }

// //Edit comment
// const detailsComment = document.querySelector('#comment-display');
// detailsComment.addEventListener('click', () => {
//   const newComment = prompt('Enter a new comment:', ramen.comment);
//   if(newComment === null || newComment.trim() === '') {
//     return;
//   }
  
//   ramen.comment = newComment;
//   detailsComment.textContent = ramen.comment;
// });

//Delete
// document.querySelector('#ramen-detail > .detail-image').addEventListener('click', () => {
//   document.innerHTML = '';
//   deleteRamen(newRamen.id);
//  });
 

//POST
function addNewRamen(newRamen) {
  fetch("http://localhost:3000/ramens", {
    method: 'POST',
    headers: {
      'Content-Type': "application/json"
    },
    body:JSON.stringify(newRamen)
    })
    .then(res => res.json())
    .then(ramens = console.log(ramens))
    .catch((error) => console.log(error));
}

//PATCH
function updateRamen(newRamen) {
  fetch(`http://localhost:3000/ramens/${newRamen.id}`,{
    method: 'PATCH',
    headers: {
      'Content-Type': "application/json"
    },
    body:JSON.stringify(newRamen),
    })
    .then(res => res.json())
    .then(ramens => console.log(ramens))
    .catch((error) => console.log(error));
}

//Delete
function deleteRamen(id) {
  fetch(`http://localhost:3000/ramens/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type':'application.json'
    }
  })
  .then(res => res.json())
  .then(ramens => console.log(ramens))
  .catch((error) => console.log(error));
}

// Export functions for testing
export {
  handleClick,
  handleSubmit,
  addSubmitListener,
  displayRamen,
  displayRamens,
  main,
};
