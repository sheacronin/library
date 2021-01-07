// Constructor of book objects.
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.toggleReadStatus = function() { // Method to toggle book's read status.
        this.read = !this.read;
    }
}

// Method to toggle book's read status.
// Moved from prototype to constructor b/c local storage
        // stripped objs of prototypes.
// Book.prototype.toggleReadStatus = function() {
    
// }

// Library array to store book objects.
let myLibrary = [];

// Local storage code.
if(!localStorage.getItem('mylibrary')) {
    // Example book / Empty library
} else {
    // Update page with user's library
    myLibrary = JSON.parse(localStorage.getItem('mylibrary')); // Parse to un-stringify array.
}

// Create form variables.
const newBookForm = document.querySelector('form');
let isFormVisible = false;

function toggleDisplayForm() {
    if (!isFormVisible) {
        newBookForm.classList.add('visible');
        isFormVisible = true;
    } else {
        newBookForm.classList.remove('visible');
        isFormVisible = false;
    }
}

// Event listener to toggle display form when NEW BOOK btn clicked.
const newBookBtn = document.querySelector('#new-book-btn');
newBookBtn.addEventListener('click', toggleDisplayForm);


// Creates new book object and pushes to library array.
function addBookToLibrary() {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = parseInt(document.querySelector('#pages').value);
    const read =  document.querySelector('#read').value === 'on' ? true : false;

    let book = new Book(title, author, pages, read);
    myLibrary.push(book);

    // Update display.
    displayBook(book);

    // Update myLibrary array in storage.
    localStorage.setItem('mylibrary', JSON.stringify(myLibrary)); // Convert array & objects to string.
}

// Removes book from library and display shelf when remove btn is clicked.
function removeBookFromLibrary(e) {
    let thisBook = e.toElement.parentElement;
    let i = thisBook.dataset.index;
    myLibrary.splice(i, 1);

    // Call another function to remove it from display.
    removeBookFromDisplay(thisBook);

    // Update myLibrary array in storage.
    localStorage.setItem('mylibrary', JSON.stringify(myLibrary));
}

// Button to submit new book form.
const submitBtn = document.querySelector('#submit-btn');
submitBtn.addEventListener('click', addBookToLibrary);

// Shelf element to display books.
const shelf = document.querySelector('#shelf');

// Function runs when adding a new book to display. Takes book object as arg.
function displayBook(book) {
    let bookCard = document.createElement('div');
    bookCard.classList.add('book');
    bookCard.textContent = book.title;
    // Add data attribute of book's index in library array.
    bookCard.dataset.index = myLibrary.indexOf(book);

    // Add button to remove book from library.
    let removeBtn = document.createElement('button');
    removeBtn.textContent = '-';
    removeBtn.addEventListener('click', removeBookFromLibrary);
    bookCard.appendChild(removeBtn);

    // Add button to toggle read status.
    let readBtn = document.createElement('button');
    readBtn.textContent = 'Read?';
    readBtn.addEventListener('click', () => {
        book.toggleReadStatus();
    });
    bookCard.appendChild(readBtn);

    shelf.appendChild(bookCard);
}

function removeBookFromDisplay(book) {
    shelf.removeChild(book);

    // Update book element data attributes to reflect new indexes.
    for (let i = 0; i < shelf.children.length; i++) {
        shelf.children[i].dataset.index = i;
    }
}

function displayAllBooks() {
    for (book of myLibrary) {
        displayBook(book);
    }
}

// Initially display library.
displayAllBooks();
