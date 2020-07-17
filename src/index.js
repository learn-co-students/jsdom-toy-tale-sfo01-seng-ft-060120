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
});

// add toy info to the card
fetch('http://localhost:3000/toys')
.then(res => res.json())
.then(json => json.forEach(item => addToys(item)))

function addToys(item) {
  const toyContainer = document.querySelector('#toy-collection')
  let card = document.createElement('div')
  card.innerHTML = `
    <div class='card' id='${item.id}'>
      <h2>${item.name}</h2>
      <img src='${item.image}' class='toy-avatar' />
      <p>${item.likes} Likes</p>
      <button class="like-btn">Like <3</button>
    </div>
  `
  let button = card.querySelector('button')
  button.addEventListener('click', (e) => fetchOne(`${item.id}`))

  toyContainer.appendChild(card)
}

// add a new toy
const toyForm = document.getElementsByClassName('add-toy-form')
toyForm[0].addEventListener('submit', (e) => addOneToy(e))

const addOneToy = (e) => {
  e.preventDefault()
  let data = {
    name:e.target[0].value,
    image:e.target[1].value,
    likes:0
  }

  fetch('http://localhost:3000/toys', {
    method:'POST',
    headers:{
      'Content-Type':'application/json',
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(json => addToys(json))
}

// increase toy's likes
const fetchOne = (id) => {
  fetch(`http://localhost:3000/toys/${id}`)
  .then(res => res.json())
  .then(json => increaseToyLike(json))
}

function increaseToyLike(obj) {
  obj.likes += 1
  fetch(`http://localhost:3000/toys/${obj.id}`, {
    method:'PATCH',
    headers: 
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": obj.likes
      })
  })
  .then(res => res.json())
  .then(json => {
    let currentToy = document.getElementById(json.id)
    let p = currentToy.querySelector('p')
    p.textContent = `${json.likes} Likes`
  })
}



