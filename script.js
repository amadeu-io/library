// functions

// book constructor function
function Book(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
}

// read toggle function
Book.prototype.toggleRead = function () {
  return (this.read = this.read === "Yes" ? "No" : "Yes");
};

// add book object to table with an HTML id
function addBookToTable(book, id) {
  tbody.innerHTML += `
  <tr id=${id}>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${extractNumbers(book.pages)}</td>
    <td class='read'>${book.read}</td>
    <td class='remove'><img src="icons/remove.svg"></td>
  </tr>
  `;
}

// hide thead
function hideThead() {
  thead.style.display = "none";
}

// show thead
function showThead() {
  thead.style.display = "table-header-group";
}

// takes a string and returns only the numbers in it
function extractNumbers(str) {
  const regex = /\d+/g;
  return str.match(regex) ? str.match(regex).join("") : "";
}

// program starts here

let myLibrary = []; // array of book objects
let count = 0; // id assigner
let form = document.querySelector("form");
let thead = document.querySelector("thead");
let tbody = document.querySelector("tbody");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // do not reload the page

  // show thead
  showThead();

  // initialize new book
  let newBook = {};

  // take form input and build newBook object
  const formData = new FormData(form);
  newBook = new Book(
    formData.get("title"),
    formData.get("author"),
    formData.get("pages"),
    formData.get("read"),
    count // id
  );

  // add newBook to library
  myLibrary.push(newBook);

  // add newBook to table and assign matching HTML id
  addBookToTable(newBook, count);

  count++; // increases every time submit is pressed

  // remove book
  let remove = document.querySelectorAll(".remove");
  for (let i = 0; i < remove.length; i++) {
    remove[i].addEventListener("click", function (event) {
      // find current <tr> and HTML id
      let currentRow = remove[i].closest("tr"); // <tr> parent of the current removed item
      let currentId = currentRow.id; // id of the removed item

      // remove the current <tr> from table
      currentRow.remove();

      // find the book oject with matching id
      let removeIndex = myLibrary.findIndex(function (book) {
        return book.id == currentId;
      });

      // remove the object from myLibrary
      myLibrary.splice(removeIndex, 1);

      // remove thead when there are no books
      myLibrary.length ? null : hideThead();
    });
  }

  // toggle read status
  let read = document.querySelectorAll(".read");
  for (let j = 0; j < read.length; j++) {
    read[j].addEventListener("click", function (event) {
      // toggle the <tr> HTML content
      read[j].innerHTML = read[j].innerHTML === "Yes" ? "No" : "Yes";

      // find HTML id
      let currentRow = read[j].closest("tr"); // <tr> parent of the current toggled item
      let currentId = currentRow.id; // id of the removed item

      // find the book oject with matching id
      let toggleIndex = myLibrary.findIndex(function (book) {
        return book.id == currentId;
      });

      // toggle the object read status
      myLibrary[toggleIndex].toggleRead();
    });
  }
});
