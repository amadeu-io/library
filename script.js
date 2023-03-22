myLibraryy = [
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: 295,
    read: "No",
  },
  {
    title: "The Theory of Relativity",
    author: "Albert Einstein",
    pages: 123,
    read: "Yes",
  },
];

// add book to table. Book is an object and id should be unique every time
function addBookToTable(book, id) {
  table.innerHTML += `
  <tr>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.pages}</td>
    <td>${book.read}</td>
    <td class='remove' id=${id}>✖️</td>
  </tr>
  `;
  // every time a new row is added, it is assigned a unique id
}

let myLibrary = []; // array of book objects
let count = 0; // id assigner
let table = document.querySelector("table");
let form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  // initialize new book
  let newBook = {};

  // take form input and build newBook object
  event.preventDefault();
  const formData = new FormData(form);
  for (const [key, value] of formData) {
    newBook[key] = value;
  }

  // add id to each book
  newBook.id = count;

  // add newBook to library
  myLibrary.push(newBook);

  // add newBook to table and assign every row the matching id
  addBookToTable(newBook, count);

  count++; // increases every time submit is pressed

  // remove book
  let remove = document.querySelectorAll(".remove");
  for (let i = 0; i < remove.length; i++) {
    remove[i].addEventListener("click", function (event) {
      let currentId = remove[i].id; // id of the removed item
      let currentRow = remove[i].closest("tr"); // <tr> parent of the current removed item
      currentRow.remove(); // removes the current <tr> from <table>

      // finds & removes the book with the id that matches the html id, so myLibrary
      // is always synced with the table
      let removeIndex = myLibrary.findIndex(function (book) {
        return book.id == currentId;
      });
      myLibrary.splice(removeIndex, 1);
    });
  }
});
