document.addEventListener("DOMContentLoaded", () => {
    const library = new Library();
});

class Library {
    #books = {};

    // reserved for DOM elements
    #title
    #author
    #pages
    #genre
    #form
    #library
    #cardTemplate

    Book = class {
        constructor(title, author, numberOfPages, genre) {
            this.title = title;
            this.author = author;
            this.numberOfPages = numberOfPages;
            this.genre = genre;
            this.isRead = false;
            this.id = crypto.randomUUID();
        }
    }

    constructor() {
        this.#cacheDom();
        this.#addEventListeners();
    }

    #cacheDom() {
        this.#title = document.getElementById("title");
        this.#author = document.getElementById("author");
        this.#pages = document.getElementById("pages");
        this.#genre = document.getElementById("genre");
        this.#form = document.querySelector("form");
        this.#library = document.getElementById("library")
        this.#cardTemplate = document.getElementById("card-template");
    }

    #addEventListeners() {
        this.#form.addEventListener("submit", (ev) => this.addBook(ev));
    }
    
    addBook(ev) {
        ev.preventDefault();
        
        const book = new this.Book(
            this.#title.value, 
            this.#author.value, 
            this.#pages.value, 
            this.#genre.value
        );
        this.#books[book.id] = book;

        this.render();
    }

    readBook(ev) {
        const $card = ev.target.parentElement;

        if ($card.classList.contains("read")) 
            $card.classList.remove("read"); 
        else $card.classList.add("read");
    }

    removeBook(ev) {
        const $card = ev.target.parentElement;

        delete this.#books[$card.id];

        this.render();
    }

    render() {
        this.#library.innerHTML = "";

        for (const [key, book] of Object.entries(this.#books)) {

            if (!key || !book) break;

            const $temp = this.#cardTemplate.content.cloneNode(true);
            const $card = $temp.querySelector(".card");
            $card.id = book.id;

            $card.querySelector(".title.value").textContent = book.title;
            $card.querySelector(".author.value").textContent = book.author;
            $card.querySelector(".pages.value").textContent = book.numberOfPages;
            $card.querySelector(".genre.value").textContent = book.genre;
            
            $card.querySelector(".read-btn")
                .addEventListener("click", (ev) => this.readBook(ev));
            $card.querySelector(".remove-btn")
                .addEventListener("click", (ev) => this.removeBook(ev));

            this.#library.appendChild($card);
        }
    }
}