let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  }); 


// accessible variables
const toyUrl = 'http://localhost:3000/toys' //render all the toys
const toyContainer = document.getElementById('toy-collection') //container
// 


const fetchAllToys = () => {
  fetch(toyUrl)
  .then(res => res.json())
  .then(json => json.forEach(toy => renderToys(toy)))
}
fetchAllToys()

const renderToys = (toy) =>{
// console.log(toy)
  const toyCard = document.createElement('div')
  toyCard.className = 'card'
  toyCard.id = toy.id
  // //add an id to the card to make each card unique 
  toyCard.innerHTML = `
     <h2>${toy.name}</h2>
     <img src=${toy.image} class="toy-avatar" />
     <p>${toy.likes} Likes </p>
     <button class="like-btn"> likes <3</button>
     <button id="delete-btn" data-delete="delete">Delete</button>
     </div>
   `

  toyContainer.appendChild(toyCard)
  // console.log(toyContainer)

  // // likes event listener
  // // we want this here to persist with every post created 
  let card = document.getElementById(toy.id) // we need to be able to click a specific button from each card 
  const btn = card.querySelector('button') //we can do this b/c we are grabbing a specific button from a specific card  
  btn.addEventListener('click', (e) => updateLikes(toy))
  
  const deleteBtn = card.querySelector('button#delete-btn')
  deleteBtn.addEventListener('click', () => deleteCard(toy))
  // console.log(deleteBtn)
}

// // PATCH REQUEST
// // here we make new piece of data
const updateLikes = (toy) => {
//   // this is the only information we want patched
    data = {likes: toy.likes += 1}
   fetch(`http://localhost:3000/toys/${toy.id}`, {
     method: 'PATCH',
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(json => { 
    //target the current toy id and its likes html and change the inner text with every update 
    let currentToy = document.getElementById(json.id) 
    console.log(currentToy)
    let p = currentToy.querySelector('p')
    p.textContent = `${json.likes} likes`
    console.log(p)
    // this is what pessimistic rendering looks like
  })
}


// POST 

const listenForPost = () => {
  const form = document.querySelector('form.add-toy-form')
  // console.log(form)
  form.addEventListener('submit', (e) => {
    // debugger
    e.preventDefault()
    // console.log(e)
    postFetch(e)
  })
 
}
listenForPost()


const postFetch = (e) =>{
  data = {
    name: e.target[0].value,
    image: e.target[1].value,
    likes: 0
  }
  console.log(data)

  fetch(toyUrl, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(json => renderToys(json)) //pessimistic render
  //   {
  //   const newToyCard = document.createElement('div')
  //   // console.log(toyCard)
  //   // //add an id to the card to make each card unique 
  //   newToyCard.innerHTML = `
  //      <div class="card" id="${json.id}"> 
  //      <h2>${json.name}</h2>
  //      <img src=${json.image} class="toy-avatar" />
  //      <p>${json.likes} Likes </p>
  //      <button class="like-btn"> likes <3</button>
  //      </div>
  //    `
  //   toyContainer.appendChild(newToyCard)
  // })
  // optimist rendering
  // debugger
}

// create a delete button here
const deleteCard = (toy) => {
  fetch(`http://localhost:3000/toys/${toy.id}`,{
    method: 'DELETE',
  })
  .then(res => res.json())
  .then(json => {
    console.log(json)
    // console.log('card deleted')
    const deletedCard = document.getElementById(toy.id)
    deletedCard.remove()
    console.log(deletedCard)
  })

}


}); //DOM Content Load ends here
