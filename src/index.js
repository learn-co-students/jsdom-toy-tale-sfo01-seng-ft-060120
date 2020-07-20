const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const form = document.querySelector('.add-toy-form')
const toyContainer = document.getElementById('toy-collection')
let addToy = false;

// YOUR CODE HERE 

const fetchAllToys = () => {
  fetch(`http://localhost:3000/toys`)
  .then(res => res.json())
  .then(json => json.forEach(toy => buildToy(toy)))
}

fetchAllToys()

const updateLikes = (toy) => {
  let data = {likes: toy.likes+= 1}
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method:'PATCH',
    headers: {
      'Content-Type': 'application/json',
        Accept: "application/json"
    },
    body: JSON.stringify(data),
  })
  .then(res => res.json())
  .then(json => {
    let currentToy = document.getElementById(json.id)
    let p = currentToy.querySelector('p')
    p.textContent = `${json.likes} likes`

  })


}

const postNewToy = (toy) => {
  fetch(`http://localhost:3000/toys`, {
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
        Accept: "application/json"
    },
    body: JSON.stringify(toy),
  })
  .then(res => res.json())
  .then(json => buildToy(json))

}

// DOM elements

const buildToy = (toy) => {
  let div = document.createElement('div')
  div.id = toy.id
  div.innerHTML = `
  <div class="card" id=${toy.id}>
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p>${toy.likes} likes </p>
  <button class="like-btn">Like <3</button>
</div>` 

  toyContainer.appendChild(div)
  let card = document.getElementById(toy.id)
  let btn = card.querySelector('button')
  btn.addEventListener('click', (e)=> updateLikes(toy))

}

const addNewToy = (e) => {
  e.preventDefault()
  console.log(e.target)
  let toy = {
    name:e.target.name.value, 
    image:e.target.image.value,
    likes: 0
  } 
  postNewToy(toy)
}


// Event Listeners
form.addEventListener('submit', (e)=> addNewToy(e))

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
});
