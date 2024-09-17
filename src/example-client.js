import { BookSearchApi } from './BookSearch.js';

// BookSearchApi1
const responseType1 = 'application/json';
const baseUrl1 = 'https://edf-test.com/api/v1/';
const api1 = new BookSearchApi(baseUrl1, responseType1);
const pagination1 = { status: true };
const books1 = await api1.getBooks(10, pagination1);
console.log('books: ', books1);

// BookSearchApi2
const responseType2 = 'application/json';
const baseUrl2 = 'https://edf-test.com/api/v1/';
const api2 = new BookSearchApi(baseUrl2, responseType2);
const pagination2 = { status: false };
const books2 = await api2.getBooksBy('author', 'Shakespeare', 10, pagination2);
console.log(books2);
