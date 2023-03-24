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
  tbody.innerHTML += `
  <tr id=${id}>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${extractNumbers(book.pages)}</td>
    <td class='read'>${book.read}</td>
    <td class='remove'>✖️</td>
  </tr>
  `;
  // every time a new row is added, it is assigned a unique id
}

function hideThead() {
  thead.style.display = "none";
}

function showThead() {
  thead.style.display = "table-header-group";
}

// takes a string and returns only the numbers in it
function extractNumbers(str) {
  const regex = /\d+/g;
  return str.match(regex) ? str.match(regex).join("") : "";
}

let myLibrary = []; // array of book objects
let count = 0; // id assigner
let form = document.querySelector("form");
let thead = document.querySelector("thead");
let tbody = document.querySelector("tbody");

console.log(extractNumbers("sl"));

form.addEventListener("submit", function (event) {
  event.preventDefault();
  showThead();

  // initialize new book
  let newBook = {};

  // take form input and build newBook object
  const formData = new FormData(form);
  for (const [key, value] of formData) {
    newBook[key] = value;
  }

  // add id to each book
  newBook.id = count;

  // add newBook to library
  myLibrary.push(newBook);

  // add newBook to table and assign id
  addBookToTable(newBook, count);

  count++; // increases every time submit is pressed

  // remove book
  let remove = document.querySelectorAll(".remove");
  for (let i = 0; i < remove.length; i++) {
    remove[i].addEventListener("click", function (event) {
      let currentRow = remove[i].closest("tr"); // <tr> parent of the current removed item
      let currentId = currentRow.id; // id of the removed item
      currentRow.remove(); // removes the current <tr> from <table>

      // finds & removes the book with the id that matches the html id, so myLibrary
      // is always synced with the table
      let removeIndex = myLibrary.findIndex(function (book) {
        return book.id == currentId;
      });
      myLibrary.splice(removeIndex, 1);

      // remove thead if there are no books
      myLibrary.length ? null : hideThead();
    });
  }

  // toggle read status
  let read = document.querySelectorAll(".read");
  for (let j = 0; j < read.length; j++) {
    // html content
    read[j].addEventListener("click", function (event) {
      if (read[j].innerHTML == "Yes") {
        read[j].innerHTML = "No";
      } else {
        read[j].innerHTML = "Yes";
      }

      // myLibrary object
      let currentRow = read[j].closest("tr"); // <tr> parent of the current removed item
      let currentId = currentRow.id; // id of the removed item

      // finds the book with the id that matches the html id, so myLibrary
      // is always synced with the table
      let toggleIndex = myLibrary.findIndex(function (book) {
        return book.id == currentId;
      });
      myLibrary[toggleIndex].read = read[j].innerHTML; // update the object's read status
    });
  }
});
