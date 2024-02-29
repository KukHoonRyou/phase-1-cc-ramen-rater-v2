// index.js

// Callbacks
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

const handleSubmit = (e) => {
  e.preventDefault()
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

const addSubmitListener = () => {
  const ramenForm = document.querySelector("#new-ramen");
  if (ramenForm) {
    ramenForm.addEventListener("submit", handleSubmit);
  };
};

const displayRamen = (newRamen) => {
  const ramenMenuDiv = document.getElementById("ramen-menu");
  const img = document.createElement("img");
  img.src = newRamen.image;
  img.alt - newRamen.name;
  img.classList.add("image-slider")
  img.addEventListener("click", (e) => handleClick(newRamen, e));
  ramenMenuDiv.appendChild(img);
};

const displayRamens = () => {
  fetch("http://localhost:3000/ramens")
  .then((res) => res.json())
  .then((ramens) => {
    document.getElementById("ramen-menu").innerHTML = "";
    ramens.forEach(displayRamen)
  })
  .catch((error) => console.log(error));
};
 
const main = () => {
  addSubmitListener();
  displayRamens(); 
};

main()

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
