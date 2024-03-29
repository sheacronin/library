// Class for Book objects.
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    // Method to toggle book's read status.
    toggleReadStatus() {
        this.read = !this.read;
        console.log('Toggled read status of ' + this.title + ' to ' + this.read);
    
        // Update stored library.
        updateLocalStorageLib(); 
    }
    // Method to provide information about the book.
    info() {
        let readString = this.read ? 'read' : 'not read yet';
        return [this.title, `by ${this.author}`, `${this.pages} pages`, readString];
    }
}

// Function to update library in local storage.
function updateLocalStorageLib() {
    localStorage.setItem('mylibrary', JSON.stringify(myLibrary)); // Convert array & objects to string.
}

function toggleReadDisplay(el, book) {
    if (book.read) {
        el.textContent = 'Read';
        el.classList.add('read');
    } else {
        el.textContent = 'Unread';
        el.classList.remove('read');
    }
}

// Info element.
const infoEl = document.querySelector('#info');

// Form variables.
const newBookForm = document.querySelector('form');
let isFormVisible = false;
newBookForm.addEventListener('submit', addBookToLibrary);

function displayBookInfo(infoArray) {
    if (isFormVisible) { // If form is visible, hide it.
        toggleDisplayForm();
    }

    let i = 0;
    for (child of infoEl.children) {
        child.textContent = infoArray[i];
        i++;
    }
}

// Library array to store book objects.
let myLibrary = [];

// Check if books exist in local storage.
if (localStorage.getItem('mylibrary')) {
    // Update page with user's library
    const storedLibrary = JSON.parse(localStorage.getItem('mylibrary')); // Parse to un-stringify array.
    storedLibrary.forEach(book => {
        // Reconstruct book objects to give them Book prototype.
        book = new Book(book.title, book.author, book.pages, book.read);
        myLibrary.push(book);
    });
}

function toggleDisplayForm() {
    if (!isFormVisible) { 
        if (!infoEl.lastElementChild.textContent == '') { // If info is displayed, remove it.
            for (child of infoEl.children) {
                child.textContent = '';
            }
        }
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
    const read =  document.querySelector('#read').checked ? true : false;

    let book = new Book(title, author, pages, read);
    console.log(book);
    myLibrary.push(book);

    // Update display.
    displayBook(book);

    // Update myLibrary array in storage.
    updateLocalStorageLib();
}

// Removes book from library and display shelf when remove btn is clicked.
function removeBookFromLibrary(e) {
    let thisBook = e.toElement.parentElement;
    let i = thisBook.dataset.index;
    myLibrary.splice(i, 1);

    // Call another function to remove it from display.
    removeBookFromDisplay(thisBook);

    // Update myLibrary array in storage.
    updateLocalStorageLib();
}

// Shelf element to display books.
const shelf = document.querySelector('#shelf');

// Function runs when adding a new book to display. Takes book object as arg.
function displayBook(book) {
    let bookCard = document.createElement('div');
    bookCard.classList.add('book');
    bookCard.textContent = book.title;
    // Add data attribute of book's index in library array.
    bookCard.dataset.index = myLibrary.indexOf(book);
    // Add event listener to show info when user clicks on book.
    bookCard.addEventListener('click', () => {
        console.log('clicked ' + book.title);
        displayBookInfo(book.info());
    });

    // Add button to remove book from library.
    let removeBtn = document.createElement('button');
    removeBtn.textContent = '-';
    removeBtn.addEventListener('click', removeBookFromLibrary);
    bookCard.appendChild(removeBtn);

    // Add button to toggle read status.
    let readBtn = document.createElement('button');
    // Check if book is read to determine display.
    toggleReadDisplay(readBtn, book);
    // Add event listeners to toggle read status.
    readBtn.addEventListener('click', () => {
        book.toggleReadStatus();
    });
    readBtn.addEventListener('click',(e) => {
        toggleReadDisplay(e.target, book);
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
