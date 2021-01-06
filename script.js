// Constructor of book objects.
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Example book to add to library.
const normalPeople = new Book('Normal People', 'Sally Rooney', 100, false)

let myLibrary = [normalPeople];

// Create form variables.
const newBookForm = document.querySelector('form');
let isFormVisible = false;

// Creates new book object and pushes to library array.
function addBookToLibrary() {
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const pages = document.querySelector('#pages');
    const read = document.querySelector('#read');

    let book = new Book(title.value, author.value, pages.value, read.value);
    myLibrary.push(book);

    // Update display.
    displayBook(book);
}

// Removes book from library and display shelf when remove btn is clicked.
function removeBookFromLibrary(e) {
    console.log(e);
}

function toggleDisplayForm() {
    if (!isFormVisible) {
        newBookForm.classList.add('visible');
        isFormVisible = true;
    } else {
        newBookForm.classList.remove('visible');
        isFormVisible = false;
    }
}

const newBookBtn = document.querySelector('#new-book-btn');
newBookBtn.addEventListener('click', toggleDisplayForm);

// Button to submit new book form.
const submitBtn = document.querySelector('#submit-btn');
submitBtn.addEventListener('click', addBookToLibrary);

const shelf = document.querySelector('#shelf');

// Function runs when adding a new book to display. Takes book object as arg.
function displayBook(book) {
    let bookCard = document.createElement('div');
    bookCard.classList.add('book');
    bookCard.textContent = book.title;
    // Add data attribute of book's index in library array.
    bookCard.dataset.index = myLibrary.indexOf(book);

    let removeBtn = document.createElement('button');
    removeBtn.textContent = '-';
    // Make it so clicking button will remove book from library.
    removeBtn.addEventListener('click', removeBookFromLibrary);
    bookCard.appendChild(removeBtn);

    shelf.appendChild(bookCard);
}

function displayAllBooks() {
    for (book of myLibrary) {
        displayBook(book);
    }
}

// Initially display library.
displayAllBooks();
