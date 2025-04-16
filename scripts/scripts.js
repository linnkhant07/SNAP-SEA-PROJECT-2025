import { capsule } from './capsule.js';

let entries = [...capsule];


// to display all cards on the page
function showCards() {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const templateCard = document.querySelector(".card");

  //loop through each and produce a card
  for (let entry of entries) {
    const card = templateCard.cloneNode(true);
    editCardContent(card, entry);
    cardContainer.appendChild(card);
  }
}

//ADD operation: : prompt user for new entry and add to the list
function addNewEntry() {
    const year = parseInt(prompt("Enter year:"));
    const title = prompt("Enter title for the event:");
    const description = prompt("What happened that year?");
    const personal = prompt("Why does this matter to you?");
    const image = prompt("Paste an image URL (or leave blank for placeholder):");

    if (!year || !title || !description || !personal) {
        alert("Please fill out all fields.");
        return;
    }

    //push to entries array
    entries.push({
        year,
        title,
        image: image || "/images/timetravel.png",
        description,
        personalConnection: personal
    });

    //sort to keep order after add
    const sortValue = document.getElementById("sort-select")?.value || "asc";
    applyYearSort(sortValue);
    showCards();
}

// renders a card's content (including edit/delete functionality buttons)
function editCardContent(card, data) {
    card.style.display = "block";
  
    const front = card.querySelector(".card-front");
    front.innerHTML = `
      <h2>${data.year} — ${data.title}</h2>
      <img src="${data.image}" alt="Image from ${data.year}" />
    `;
  
    const back = card.querySelector(".card-back");
    back.innerHTML = `
      <ul>
        <li class="desc">Description: ${data.description}</li>
        <li class="personal">Personal Connection: ${data.personalConnection}</li>
      </ul>
      <div class="card-actions">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;
  
    const editBtn = back.querySelector('.edit-btn');
    const deleteBtn = back.querySelector('.delete-btn');
  
    editBtn.addEventListener('click', () => {
      const newDesc = prompt("Edit description:", data.description);
      const newPersonal = prompt("Edit personal connection:", data.personalConnection);
        
      //update the current cards
      if (newDesc !== null) data.description = newDesc;
      if (newPersonal !== null) data.personalConnection = newPersonal;
  
      showCards();
    });
  
    deleteBtn.addEventListener('click', () => {
      deleteEntryByYear(entries, data.year);
      showCards();
    });
}

//SORT operation: sort entries by year
function applyYearSort(direction) {
    if (direction === "asc") {
      entries.sort((a, b) => a.year - b.year);
    } else if (direction === "desc") {
      entries.sort((a, b) => b.year - a.year);
    }
}

//DELETE operation
function deleteEntryByYear(array, year) {

    //find the index of that card, and remove it from array
    const index = array.findIndex(entry => entry.year === year);
    if (index !== -1) {
      array.splice(index, 1);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    
    document.getElementById("add-btn").addEventListener("click", addNewEntry);

    const sortSelect = document.getElementById("sort-select");
    if (sortSelect) {
        sortSelect.addEventListener("change", () => {
        applyYearSort(sortSelect.value);
        showCards();
        });
    }
  
    showCards(); // initial render
});