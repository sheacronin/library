let myLibrary = ['Harry Potter', 'Normal People'];

function Book() {

}

function addBookToLibrary() {

}

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