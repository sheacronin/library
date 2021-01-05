let myLibrary = ['Harry Potter', 'Normal People'];

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
function addBookToLibrary(e) {
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const pages = document.querySelector('#pages');
    const read = document.querySelector('#read');

    let book = new Book(title.value, author.value, pages.value, read.value);
    myLibrary.push(book);
    console.log(myLibrary);

    // Update display.
    displayBooks();
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

function displayBooks() {
    for (book of myLibrary) {
        let bookCard = document.createElement('div');
        bookCard.classList.add('book');
        bookCard.textContent = book;
        shelf.appendChild(bookCard);
    }
}

displayBooks();