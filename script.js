const LIBRARY = {};


function Book(title, author, numberOfPages, genre) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.genre = genre;
    this.isRead = false;
    this.id = crypto.randomUUID();
}

function addBook(ev) {
    ev.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const numberOfPages = document.getElementById("pages").value;
    const genre = document.getElementById("genre").value;
    
    const book = new Book(title, author, numberOfPages, genre);
    LIBRARY[book.id] = book;

    displayBooks();
}

function readBook(ev) {
    
    const cardE = ev.target.parentElement;

    if (cardE.classList.contains("read")) {
        cardE.classList.remove("read");
    } else {
        cardE.classList.add("read");
    }
}

function removeBook(ev) {

    const cardE = ev.target.parentElement;
    
    delete LIBRARY[cardE.id];
    
    displayBooks();
}

function displayBooks() {

    const libraryE = document.getElementById("library");
    libraryE.innerHTML = "";

    for (const [key, book] of Object.entries(LIBRARY)) {

        if (!key || !book) break;

        const cardE = document.createElement("div");
        cardE.id = book.id;
        cardE.classList.add("card");

        const titleE = document.createElement("h1");
        titleE.textContent = "Title: " + book.title;
        cardE.appendChild(titleE);

        const authorE = document.createElement("h2");
        authorE.textContent = "Author: " + book.author;
        cardE.appendChild(authorE);

        const pagesE = document.createElement("h2");
        pagesE.textContent = "Pages: " + book.numberOfPages;
        cardE.appendChild(pagesE);

        const genreE = document.createElement("h2");
        genreE.textContent = "Genre: " + book.genre;
        cardE.appendChild(genreE);

        const readBtn = document.createElement("button");
        readBtn.textContent = "Read";
        readBtn.addEventListener("click", readBook);
        readBtn.classList.add("read-btn");
        cardE.appendChild(readBtn);

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove"
        removeBtn.addEventListener("click", removeBook);
        removeBtn.classList.add("remove-btn");
        cardE.appendChild(removeBtn);

        libraryE.appendChild(cardE);
    }
}

function main() {
    const form = document.querySelector("form");

    form.addEventListener("submit", addBook);

}


main();