let myLibrary = [];

// Constructor of book objects.
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

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

    let removeBtn = document.createElement('button');
    removeBtn.textContent = '-';
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
