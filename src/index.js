let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', (e) => newToy(e))
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  loadAllToys()
});

function loadAllToys(){
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(json => renderToys(json))
}

function renderToys(toys){
  let toyBox = document.getElementById('toy-collection')
  toys.forEach(toy => {
    let div = document.createElement('div')
    div.className = 'card'
    let h2 = document.createElement('h2')
    let p = document.createElement('p')
    let img = document.createElement('img')
    let button = document.createElement('button')

    h2.innerText = toy.name
    p.innerText = `Likes: ${toy.likes}`
    button.innerText = 'Like'
    button.className = 'like-btn'
    button.addEventListener('click', (e) => {
      likes(e, toy)
    })
    img.src = toy.image
    img.className = 'toy-avatar'

    div.appendChild(h2)
    div.appendChild(img)
    div.appendChild(button)
    div.appendChild(p)
    toyBox.appendChild(div)
  })
}

function newToy(event){
  event.preventDefault()

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify({
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0
    })
  })
}

function likes(event, toy){
  toy.likes ++ 
  let div = event.target.parentElement 
  let p = div.querySelector('p')
  p.innerText = `Likes ${toy.likes}`
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify({
      likes: toy.likes 
    })
  })
}