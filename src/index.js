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
  fetchAll()
});

const fetchAll = () => {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toys => {
    toys.forEach(toy => showOneToy(toy))
  })
}

const showOneToy = (toy) => {
  const toyFormContainer = document.querySelector("#toy-collection");
  let card = document.createElement('div');
  card.className = 'card'
  card.id = toy.id

  card.innerHTML =`
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
  `
  let p = document.createElement('p')
  p.innerText = `${toy.likes} Likes`
  card.appendChild(p)

  let likeButton = document.createElement('button')
  likeButton.innerText = '❤'
  card.appendChild(likeButton)

  toyFormContainer.appendChild(card)

  likeButton.addEventListener('click', (e) => likeToy(e, toy))
}

const likeToy = (e, toy) => {

  let newLikes = toy.likes +=1
  let data = {
    likes: newLikes
  }

  let currentCard = document.getElementById(toy.id)
  let p = currentCard.querySelector('p')
  p.innerText = `${newLikes} Likes`

  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(data),
  })
  .then(res => res.json())
  .then(console.log)
}