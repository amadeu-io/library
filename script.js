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

// add library to page. library is an array of book objects
function addLibraryToPage(library) {
  // remove previous content
  table.innerHTML = `
  <tr>
    <th>Name</th>
    <th>Author</th>
    <th>Pages</th>
    <th>Read</th>
    <th>Remove</th>
  </tr>
  `;

  // iterate trough library and add every single book to table
  for (let i = 0; i < library.length; i++) {
    table.innerHTML += `
    <tr>
      <td>${library[i].title}</td>
      <td>${library[i].author}</td>
      <td>${library[i].pages}</td>
      <td>${library[i].read}</td>
      <td class='close'>✖️</td>
    </tr>
    `;
  }
}

let myLibrary = []; // array of book objects
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

  // add newBook to library
  myLibrary.push(newBook);

  // add myLibrary to page
  addLibraryToPage(myLibrary);

  // remove book capability
  let close = document.querySelectorAll(".close");

  for (let i = 0; i < close.length; i++) {
    close[i].addEventListener("click", function (event) {
      console.log(i);
      console.log(close[i]);
    });
  }
});
