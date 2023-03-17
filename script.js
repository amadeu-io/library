// constructor function
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// add book to library
function addBookToLibrary(book) {
  myLibrary.push(book);
}

// appends book to table
function addBookToTable(book) {
  table.innerHTML += 
  `
  <tr>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.pages}</td>
    <td>${book.read}</td>
  </tr>
  `
};

// adds books from library to table
function addLibraryToTable() {
  for (let i = 0; i < myLibrary.length; i++) {
    addBookToTable(myLibrary[i])
  };
};

// program starts here
let myLibrary = [];
let table = document.querySelector('table');

// define books and add to library
let book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, "No");
let book2 = new Book("Harry Potter", "J.K. Rowling", 647, "No");
let book3 = new Book("The Theory of Relativity", "Albert Einstein", 123, "Yes");
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

addLibraryToTable();




