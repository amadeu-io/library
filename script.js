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

// program starts here

let form = document.querySelector("form");
let tbody = document.querySelector("tbody");
let thead = document.querySelector("thead");

let library = [
  new Book("The Great Gatsby", "F. Scott Fitzgerald", 218, true),
  new Book("1984", "George Orwell", 328, false),
];

function renderLibrary() {
  // show thead only when there are books
  thead.classList.toggle("hide-thead", library.length === 0);

  tbody.innerHTML = "";
  library.forEach((book, index) => {
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

    // book removal functionality
    tableRemove.addEventListener("click", () => {
      library.splice(index, 1);
      renderLibrary();
    });

    // toggle read functionality
    tableRead.addEventListener("click", () => {
      book.toggleRead();
      renderLibrary();
    });
  });
}

renderLibrary();

form.addEventListener("submit", function (event) {
  event.preventDefault(); // do not reload the page

  // get form data, construct new book & add it to library
  const formData = new FormData(form);
  library.push(
    new Book(
      formData.get("title"),
      formData.get("author"),
      formData.get("pages"),
      Boolean(formData.get("read"))
    )
  );

  // render the new library to screen
  renderLibrary();
});
