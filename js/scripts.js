/******************************************
Treehouse Techdegree:
FSJS project 5 - Public API Requests
Chris Leichsenring
******************************************/



//Global variables
const galleryDiv = document.getElementById('gallery');
const searchDiv = document.getElementsByClassName('search-container');


//Random user fetch
//Image, First Last Name, Email, City or location, cell, detailed address, birthday
const randomAPI = fetch('https://randomuser.me/api/?results=12')
  .then(res => res.json())
  .then(data => console.log(data))


//Gallery



//Modal
const createModal = (card) => {

}

//Search