// Run script in Strict Mode
"use strict";
//  In this app,we have:
// Book Class:Represents a book
class book {
    constructor(title, authorsName, isbn) {
        this.title = title;
        this.authorsName = authorsName;
        this.isbn = isbn;
    }
}
// UI Class:Handles UI Tasks
class UI {
    static displayBooks() {
        let books =store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }
    static addBookToList(book) {
        const tableBody = document.getElementById('book-list');
        // Lets create a new Row
        const row = document.createElement('tr');
        row.innerHTML = `
                        <td>${book.title}</td>
                        <td>${book.authorsName}</td>
                        <td>${book.isbn}</td>
                        <td><button class="remove-button">X</button></td>
                     `;
        tableBody.appendChild(row);
    }
    static removeElement(element) {
        if (element.classList.contains('remove-button')) {
           element.parentElement.parentElement.remove();
           store.removeBook(element.parentElement.previousElementSibling.innerText);
           UI.showAlerts('Sucessfully Removed.', "success")
        }
    }

    static showAlerts(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('.user-input');
        container.insertBefore(div, form);
        //Remove alerts after 1 second
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 1000);
    }
    static clearFields() {
        document.querySelector("#book-name").value = "";
        document.querySelector('#authors-name').value = "";
        document.querySelector("#isbn-number").value = "";
    }
}
// Store Class:Handles Storage Tasks
class store{
    static getBooks(){
     let books;
     if(localStorage.getItem('books')===null){
         books=[];
        }else{
         books=JSON.parse(localStorage.getItem('books'));
     }
     return books;
    }
    static addBook(book){
      const books=store.getBooks();
      books.push(book);
      localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBook(isbn){
        const books=store.getBooks();
        books.forEach((element,index)=>{
            if(element.isbn===isbn){
                books.splice(index,1);
            }
        })
        localStorage.setItem('books',JSON.stringify(books));

    }
}
// Event:Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);
// Event:Add a book
document.querySelector(".user-input").addEventListener('submit', (event) => {
    // Prevent from submitting
    event.preventDefault();
    // Get Data From DOM
    const bookName = document.querySelector('#book-name').value;
    const authorsName = document.querySelector('#authors-name').value;
    const isbnNumber = document.querySelector('#isbn-number').value;

    // Validation
    if (bookName === "" || authorsName === "" || isbnNumber === "") {
        UI.showAlerts("Please fill in all the fields.", "danger")
    } else {
        //  Instantiate Book
        const newBook = new book(bookName, authorsName, isbnNumber);

        // Add book to list
        UI.addBookToList(newBook);

        //Add book to storage
        store.addBook(newBook);

        // Show Success Alert
        UI.showAlerts('Sucessfully Added.', "success")


        // Clear Input fields
        UI.clearFields();

    }


})

// Event:Remove a book
document.querySelector("#book-list").addEventListener('click', (event) => {
    UI.removeElement(event.target);
})
// TIPS:
// We can remove DOM Element Using remove() method



// PRAMESH KARKI
