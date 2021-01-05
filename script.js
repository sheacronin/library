let myLibrary = ['Harry Potter', 'Normal People'];

function Book() {

}

function addBookToLibrary() {

}

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

const newBookBtn = document.querySelector('#new-book-btn');
newBookBtn.addEventListener('click', toggleDisplayForm);

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