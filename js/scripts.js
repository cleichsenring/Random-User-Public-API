/******************************************
Treehouse Techdegree:
FSJS project 5 - Public API Requests
Chris Leichsenring
******************************************/



//Global variables
const galleryDiv = document.getElementById('gallery');
const body = document.querySelector('body');

let users = []
//Random user fetch
//Image, First Last Name, Email, City or location, cell, detailed address, birthday
const randomAPI = fetch('https://randomuser.me/api/?results=12&nat=US')
  .then(res => res.json())
  .then(data => data.results.map(user => users.push(user)));
  //.then(users.forEach(user => createCard(user)))


//Gallery
const createCard = user => {
  const div = document.createElement('div');
  div.className = 'card';

  const data = `
    <div class="card-img-container">
      <img class="card-img" src="${user.picture.medium}" alt="profile picture">
    </div>
    <div class="card-info-container">
      <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
      <p class="card-text">${user.email}</p>
      <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
    </div>
  `;
  div.innerHTML = data;
  galleryDiv.appendChild(div);
  div.addEventListener('click', (e) => {
  })
}


//Modal
const createModal = card => {
  console.log(card)
  const birthday = new Date(card.dob.date);

  const container = document.createElement('div');
  const div = document.createElement('div');
  const buttonDiv = document.createElement('div');

  container.className = 'modal-container';
  div.className = 'modal';
  buttonDiv.className = 'modal-btn-container'
  
  const data = `
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container">
      <img class="modal-img" src="${card.picture.large}" alt="profile picture">
      <h3 id="name" class="modal-name cap">${card.name.first} ${card.name.last}</h3>
      <p class="modal-text">${card.email}</p>
      <p class="modal-text cap">${card.location.city}</p>
      <hr>
      <p class="modal-text">${card.cell}</p>
      <p class="modal-text">${card.location.street.number} ${card.location.street.name}, ${card.location.city}, ${card.location.state} ${card.location.postcode}</p>
      <p class="modal-text">Birthday: ${birthday.toLocaleDateString()}</p>
    </div>
  `;//Update/fix State abbrev
  const buttons = `
    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
    <button type="button" id="modal-next" class="modal-next btn">Next</button>
  `;

  div.innerHTML = data;
  buttonDiv.innerHTML = buttons;

  container.appendChild(div);
  container.appendChild(buttonDiv);
  body.appendChild(container);

//Event listeners
  document.getElementById('modal-close-btn').addEventListener('click', e => container.remove());
  
  document.getElementById('modal-prev').addEventListener('click', e => {
    console.log('Modal PREV event listener working');
  });
  document.getElementById('modal-next').addEventListener('click', e => {
    console.log('Modal NEXT event listener working');
  });

}


//Search bar
const searchDiv = document.querySelector('.search-container');
searchDiv.innerHTML = `
<form action="#" method="get">
  <input type="search" id="search-input" class="search-input" placeholder="Search...">
  <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>
`;


searchDiv.addEventListener('submit', e => {

});