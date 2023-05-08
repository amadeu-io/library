// functions

// book constructor function
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  // read toggle function
  toggleRead() {
    this.read = !this.read;
  }
}

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

let form = document.querySelector("form");
let thead = document.querySelector("thead");
let tbody = document.querySelector("tbody");

let masterArray = [
  new Book("The Great Gatsby", "F. Scott Fitzgerald", 218, false),
  new Book("To Kill a Mockingbird", "Harper Lee", 281, false),
  new Book("1984", "George Orwell", 328, false),
];

function renderMasterArray() {
  tbody.innerHTML = "";
  masterArray.forEach((book, index) => {
    // create table row
    const tableRow = document.createElement("tr");
    const tableTitle = document.createElement("td");
    const tableAuthor = document.createElement("td");
    const tablePages = document.createElement("td");
    const tableRead = document.createElement("td");
    const tableRemove = document.createElement("td");

    // add classes to each cell
    tableTitle.className = "title";
    tableAuthor.className = "author";
    tablePages.className = "pages";
    tableRead.className = "read";
    tableRemove.className = "remove";

    // add content to each cell
    tableTitle.textContent = book.title;
    tableAuthor.textContent = book.author;
    tablePages.textContent = book.pages;
    tableRead.textContent = book.read ? "Read" : "Not Read";
    tableRemove.textContent = "❌";

    // append cells to table row
    tableRow.appendChild(tableTitle);
    tableRow.appendChild(tableAuthor);
    tableRow.appendChild(tablePages);
    tableRow.appendChild(tableRead);
    tableRow.appendChild(tableRemove);

    // append row to tbody
    tbody.appendChild(tableRow);
  });
}

showThead();
renderMasterArray();

form.addEventListener("submit", function (event) {
  event.preventDefault(); // do not reload the page
});
