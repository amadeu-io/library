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

// renders library array on screen
function renderLibrary() {
  // add 'hide-head' class only when there are books
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
    tableRead.textContent = book.read ? "Yes" : "No";
    const removeIcon = document.createElement("img");
    removeIcon.src = "icons/remove.svg";
    tableRemove.appendChild(removeIcon);

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

// program starts here

const form = document.querySelector("form");
const tbody = document.querySelector("tbody");
const thead = document.querySelector("thead");
const errorMessages = document.querySelectorAll(".error-message");

let library = [
  // example books, can be removed
  new Book("The Great Gatsby", "F. Scott Fitzgerald", 218, true),
  new Book("1984", "George Orwell", 328, false),
];

renderLibrary();

form.addEventListener("submit", function (event) {
  event.preventDefault(); // do not reload the page

  // only 'show' error message when value is missing
  errorMessages[0].classList.toggle("show", title.validity.valueMissing);
  errorMessages[1].classList.toggle("show", author.validity.valueMissing);
  errorMessages[2].classList.toggle("show", pages.validity.valueMissing);

  // if all inputs are valid
  if (form.checkValidity()) {
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

    // render the updated library to screen
    renderLibrary();
  }
});
