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

  // load all toys
  const fetchAll = () => {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(json => json.forEach(toy => createCard(toy)))
  }

  fetchAll()

  // add a toy
  const toyForm = document.querySelector('.add-toy-form')
  toyForm.addEventListener('submit', (e) => {
    postNewToy(e)
  })


});



// additional methods

const createCard = (toy) => {
  const toyContainer = document.querySelector('#toy-collection')

  // create elements
  let card = document.createElement('div')
  card.className = 'card'
  card.id = toy.id

  let h2 = document.createElement('h2')
  h2.innerText = toy.name
  card.appendChild(h2)

  let img = document.createElement('img')
  img.src = toy.image
  img.className = 'toy-avatar'
  card.appendChild(img)

  let p = document.createElement('p')
  p.innerText = `${toy.likes} Likes`
  card.appendChild(p)

  let button = document.createElement('button')
  button.className = 'like-btn'
  button.innerText = ' ❤ '

  button.addEventListener('click', (e) => {
    // find the like button
    addLike(e, toy)
    // retrieve and modify like button value
    // update database
  })

  card.appendChild(button)

  toyContainer.appendChild(card)

  // toyContainer.innerHTML += `
  //   <div class='card' id='${toy.id}'>
  //     <h2>${toy.name}</h2>
  //     <img src='${toy.image}' height=300px >
  //     <p></p>
  //     <button class='like-btn'> ❤ </button>
  //   </div>
  // `

  // update likes
  // let button = document.querySelector('.like-btn')
  // console.log(currentCard)

}

const addLike = (e, toy) => {
  e.preventDefault()
  let newLikeValue = parseInt(toy.likes) + 1
  let data = {
    "likes": newLikeValue
  }

  fetch(`http://localhost:3000/toys/${toy.id}`,{
    method: 'PATCH',
    headers: {
      'Content-Type':'application/json',
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(json => updateLikesView(json))
}

const updateLikesView = (toy) => {
  let currentCard = document.getElementById(toy.id)
  let p = currentCard.querySelector('p')
  p.textContent = `${toy.likes} Likes`
}

const postNewToy = (e) => {
  e.preventDefault()
  let randId = Math.floor((Math.random() * 100) + 1)
  let data = {
    "id": randId,
    "name": e.target[0].value ,
    "image": e.target[1].value,
    "likes": 0
  }

  fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(json => createCard(json))

}
