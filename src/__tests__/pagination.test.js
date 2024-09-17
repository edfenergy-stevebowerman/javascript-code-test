import { booksPagination } from '../helper/pagination.js';

describe('Pagination', () => {
  const books = [
    {
      author: 'Giada De Laurentiis',
      genre: ['Fiction', 'Classic'],
      price: 30,
      publisher: 'unknown',
      title: 'Everyday Italian',
      year: 2005,
    },
    {
      author: 'J K. Rowling',
      genre: ['Fiction', 'Classic'],
      price: 29.99,
      publisher: 'unknown',
      title: 'Harry Potter',
      year: 2005,
    },
    {
      author: 'James McGovern',
      genre: 'Education',
      price: 49.99,
      publisher: 'unknown',
      title: 'XQuery Kick Start',
      year: 2003,
    },
    {
      author: 'Erik T. Ray',
      genre: 'Education',
      price: 39.95,
      publisher: 'unknown',
      title: 'Learning XML',
      year: 2003,
    },
  ];
  it('returns all books', () => {
    const pagination = { status: true, page: 1, booksPerPage: 5 };
    expect(booksPagination(books, pagination)).toEqual(books);
  });
  it('returns all books when pagination page is 0', () => {
    const pagination = { status: true, page: 0, booksPerPage: 5 };
    expect(booksPagination(books, pagination)).toEqual(books);
  });
  it('returns some books', () => {
    const pagination = { status: true, page: 1, booksPerPage: 2 };
    const expectedBooks = [
      {
        author: 'Giada De Laurentiis',
        genre: ['Fiction', 'Classic'],
        price: 30,
        publisher: 'unknown',
        title: 'Everyday Italian',
        year: 2005,
      },
      {
        author: 'J K. Rowling',
        genre: ['Fiction', 'Classic'],
        price: 29.99,
        publisher: 'unknown',
        title: 'Harry Potter',
        year: 2005,
      },
    ];
    const res = booksPagination(books, pagination);
    expect(res).toEqual(expectedBooks);
  });
  it('returns no books', () => {
    const books = [];
    const pagination = { status: true, page: 1, booksPerPage: 5 };
    expect(booksPagination(books, pagination)).toEqual(books);
  });
});
