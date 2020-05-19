/******************************************
Treehouse Techdegree:
FSJS project 5 - Public API Requests
Chris Leichsenring
******************************************/



//Global variables
const galleryDiv = document.getElementById('gallery');
const body = document.querySelector('body');
let users = []
let activeUsers = []
//Random user fetch
//Image, First Last Name, Email, City or location, cell, detailed address, birthday
const randomAPI = fetch('https://randomuser.me/api/?results=12&nat=US')
  .then(res => res.json())
  .then(data => {
    data.results.map(user => {
      users.push(user);
      activeUsers.push(user);
      createCard(user, users.length-1);
    });
    }
  );


//Gallery
const createCard = (user, index) => {
  const div = document.createElement('div');
  div.className = 'card';
  div.setAttribute('user-index', index);

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
  div.addEventListener('click', (e) => updateModal(index));
}




/**
 * Creates empty hidden modal view and appends to body
 */
const createModal = () => { 
  const container = document.createElement('div');
  const div = document.createElement('div');
  const buttonDiv = document.createElement('div');

  container.className = 'modal-container';
  div.className = 'modal';
  buttonDiv.className = 'modal-btn-container'
  container.style.display = 'none';
  
  const data = `
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container" user-index="#">
      <img class="modal-img" src="#" alt="profile picture">
      <h3 id="name" class="modal-name cap"></h3>
      <p id="email" class="modal-text"></p>
      <p id="city" class="modal-text cap"></p>
      <hr>
      <p id="phone" class="modal-text"></p>
      <p id="address" class="modal-text"></p>
      <p id="dob" class="modal-text"></p>
    </div>
  `;
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
  document.getElementById('modal-close-btn').addEventListener('click', e => {
    container.style.display = 'none';
  });

}
createModal();


const updateModal = index => {
  document.querySelector('.modal-container').style.display = ''
  const user = activeUsers[index];
  const birthday = new Date(user.dob.date);
  document.querySelector('.modal-img').src = user.picture.large;
  document.querySelector('.modal-name').innerHTML = `${user.name.first} ${user.name.last}`;
  document.querySelector('#email').innerHTML = user.email;
  document.querySelector('#city').innerHTML = user.location.city;
  document.querySelector('#phone').innerHTML = user.cell;
  document.querySelector('#address').innerHTML = `${user.location.street.number} ${user.location.street.name} <br> ${user.location.city}, ${user.location.state} ${user.location.postcode}`
  document.querySelector('.modal-info-container').setAttribute('user-index', index )
  document.querySelector('#dob').innerHTML = `Birthday: ${birthday.toLocaleDateString()}`;
}


// Selects search container and appends search box
const searchDiv = document.querySelector('.search-container');
searchDiv.innerHTML = `
<form action="#" method="get">
  <input type="search" id="search-input" class="search-input" placeholder="Search...">
  <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>
`;

const searchUser = search => {
activeUsers = []
const cards = document.querySelectorAll('.card').forEach(card => card.remove());
users.forEach(user => {
  const name = `${user.name.first} ${user.name.last}`
  if(search.length !== 0 && name.toLowerCase().includes(search)){
    activeUsers.push(user);
  }
});

if(activeUsers.length > 0) {
  console.log(activeUsers)
} else {
  console.log('No user found')
}
}









  //Event listeners

document.getElementById('modal-prev').addEventListener('click', () => {
  const currentIndex = parseInt(document.querySelector('.modal-info-container').getAttribute('user-index'), 10)
  currentIndex === 0 ? updateModal(activeUsers.length - 1) : updateModal(currentIndex - 1);
});
document.getElementById('modal-next').addEventListener('click', () => {
  const currentIndex = parseInt(document.querySelector('.modal-info-container').getAttribute('user-index'), 10);
  currentIndex === activeUsers.length - 1 ? updateModal(0) : updateModal(currentIndex + 1);
});
