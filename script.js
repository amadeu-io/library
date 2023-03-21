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
    <th>Title</th>
    <th>Author</th>
    <th>Pages</th>
    <th>Read</th>
    <th>Close</th>
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
let count = 0;

form.addEventListener("submit", function (event) {
  // initialize new book
  let newBook = {};

  // take form input and build newBook object
  event.preventDefault();
  const formData = new FormData(form);
  for (const [key, value] of formData) {
    newBook[key] = value;
  }

  // add unique id to each book
  newBook.id = count;
  count++;

  // add newBook to library
  myLibrary.push(newBook);

  // add myLibrary to page
  addLibraryToPage(myLibrary);

  // remove book
  let close = document.querySelectorAll(".close");
  for (let i = 0; i < close.length; i++) {
    close[i].addEventListener("click", function (event) {
      let currentRow = close[i].closest("tr"); // finds <tr> parent of the current close button
      currentRow.remove();

      // find the index of the book which id matches the closed row
      let closeIndex = myLibrary.findIndex(function (object) {
        return object.id == i;
      });

      // delete that book from library
      myLibrary.splice(closeIndex, 1);
    });
  }
});
