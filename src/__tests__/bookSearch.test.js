import { beforeEach } from 'node:test';
import { BookSearchApi } from '../BookSearch.js';
import { xmlParser } from '../helper/xmlParser.js';
jest.mock('../helper/xmlParser.js');

describe('BookSearch', () => {
  describe('search BookSearchApi', () => {
    describe('get json data', () => {
      const expectedBooks = [
        {
          id: 1,
          title: 'To Kill a Mockingbird',
          author: 'Harper Lee',
          publication_year: 1960,
          genre: ['Fiction', 'Classic'],
          description:
            'A classic novel depicting racial injustice in the American South.',
          cover_image: 'https://image.com/image-1',
          isbn: '0123456789',
          quantity: null,
          price: null,
          publisher: null,
        },
        {
          id: 2,
          title: '1984',
          author: 'George Orwell',
          publication_year: 1949,
          genre: ['Dystopian', 'Science Fiction'],
          description: 'A dystopian novel portraying a totalitarian society.',
          cover_image: 'https://image.com/image-2',
          isbn: '0023456789',
          quantity: null,
          price: null,
          publisher: null,
        },
        {
          id: 3,
          title: 'Pride and Prejudice',
          author: 'Jane Austen',
          publication_year: 1813,
          genre: ['Classic', 'Romance'],
          description:
            'A classic novel exploring themes of love, marriage, and social norms.',
          cover_image: 'https://image.com/image-3',
          isbn: '0003456789',
          quantity: null,
          price: null,
          publisher: null,
        },
      ];
      const responseType = 'application/json';
      const baseUrl = 'https://freetestapi.com/api/v1/';
      const limit = 10;
      it('returns books when getBooks is called', async () => {
        jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
          Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve(expectedBooks),
          })
        );
        const client = new BookSearchApi(baseUrl, responseType);
        const books = await client.getBooks(limit);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(books).toEqual(expectedBooks);
      });
      it('returns books when getBooks is called with no limit', async () => {
        jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
          Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve(expectedBooks),
          })
        );
        const client = new BookSearchApi(baseUrl, responseType);
        const books = await client.getBooks();
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(books).toEqual(expectedBooks);
      });
      it('returns partial book data when getBooks is called', async () => {
        jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
          Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve(expectedBooks),
          })
        );
        const expectedBooks = [
          {
            id: 1,
            title: 'To Kill a Mockingbird',
            author: null,
            publication_year: null,
            genre: null,
            description: null,
            cover_image: null,
            isbn: null,
            quantity: null,
            price: null,
            publisher: null,
          },
          {
            id: 2,
            title: '1984',
            author: null,
            publication_year: null,
            genre: null,
            description: null,
            cover_image: null,
            isbn: null,
            quantity: null,
            price: null,
            publisher: null,
          },
          {
            id: 3,
            title: 'Pride and Prejudice',
            author: null,
            publication_year: null,
            genre: null,
            description: null,
            cover_image: null,
            isbn: null,
            quantity: null,
            price: null,
            publisher: null,
          },
        ];
        const client = new BookSearchApi(baseUrl, responseType);
        const books = await client.getBooks(limit);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(books).toEqual(expectedBooks);
      });
      it('fails to returns books when getBooks is called', async () => {
        jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
          Promise.resolve({
            ok: false,
            status: 401,
            json: () => Promise.resolve(expectedBooks),
          })
        );
        fetch.mockRejectedValueOnce(new Error('Response status: 401'));
        const client = new BookSearchApi(baseUrl, responseType);
        const books = await client.getBooks(limit);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(books).toEqual(null);
        fetch.mockRestore();
      });
      it('returns books when getBooksBy "arthor" is called', async () => {
        jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
          Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve(Array(expectedBooks[1])),
          })
        );
        const searchType = 'author';
        const search = 'George Orwell';
        const client = new BookSearchApi(baseUrl, responseType);
        const books = await client.getBooksBy(searchType, search, limit);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(books).toEqual(Array(expectedBooks[1]));
      });
      it('returns books when getBooksBy "title" is called', async () => {
        jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
          Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve(Array(expectedBooks[1])),
          })
        );
        const searchType = 'title';
        const search = '1984';
        const client = new BookSearchApi(baseUrl, responseType);
        const books = await client.getBooksBy(searchType, search, limit);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(books).toEqual(Array(expectedBooks[1]));
      });
      it('returns books when getBooksBy "publication_year" is called', async () => {
        jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
          Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve(Array(expectedBooks[1])),
          })
        );
        const searchType = 'yearPublished';
        const search = '2021';
        const client = new BookSearchApi(baseUrl, responseType);
        const books = await client.getBooksBy(searchType, search, limit);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(books).toEqual(Array(expectedBooks[1]));
      });
      it('returns books when getBooksBy "publisher" is called', async () => {
        jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
          Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve(Array(expectedBooks[1])),
          })
        );
        const searchType = 'publisher';
        const search = 'Harper Collins';
        const client = new BookSearchApi(baseUrl, responseType);
        const books = await client.getBooksBy(searchType, search, limit);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(books).toEqual(Array(expectedBooks[1]));
      });
      it('returns partial book data when getBooksBy is called', async () => {
        jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
          Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve(expectedBooks),
          })
        );
        const expectedBooks = [
          {
            id: 1,
            title: 'To Kill a Mockingbird',
            author: null,
            publication_year: null,
            genre: null,
            description: null,
            cover_image: null,
            isbn: null,
            quantity: null,
            price: null,
            publisher: null,
          },
          {
            id: 2,
            title: '1984',
            author: null,
            publication_year: null,
            genre: null,
            description: null,
            cover_image: null,
            isbn: null,
            quantity: null,
            price: null,
            publisher: null,
          },
          {
            id: 3,
            title: 'Pride and Prejudice',
            author: null,
            publication_year: null,
            genre: null,
            description: null,
            cover_image: null,
            isbn: null,
            quantity: null,
            price: null,
            publisher: null,
          },
        ];
        const searchType = 'author';
        const search = 'George Orwell';
        const client = new BookSearchApi(baseUrl, responseType);
        const books = await client.getBooksBy(searchType, search, limit);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(books).toEqual(expectedBooks);
      });
      it('fails to returns books when getBooksBy "yearPublished" is called', async () => {
        jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
          Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve(Array(expectedBooks[1])),
          })
        );
        const searchType = 'year';
        const search = '1813';
        const client = new BookSearchApi(baseUrl, responseType);
        const books = await client.getBooksBy(searchType, search, limit);
        expect(fetch).toHaveBeenCalledTimes(0);
        expect(books).toEqual(null);
        fetch.mockRestore();
      });
      it('returns books when getBooks is called with pagination', async () => {
        jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
          Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve(expectedBooks),
          })
        );
        const pagination = { status: true, page: 1, booksPerPage: 10 };
        const client = new BookSearchApi(baseUrl, responseType);
        const books = await client.getBooks(limit, pagination);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(books).toEqual(expectedBooks);
      });
    });
    describe('get xml data', () => {
      const expectedBooks = [
        {
          id: 1,
          title: 'To Kill a Mockingbird',
          author: 'Harper Lee',
          publication_year: 1960,
          genre: ['Fiction', 'Classic'],
          description:
            'A classic novel depicting racial injustice in the American South.',
          cover_image: 'https://image.com/image-1',
          isbn: '0123456789',
          quantity: null,
          price: null,
          publisher: null,
        },
        {
          id: 2,
          title: '1984',
          author: 'George Orwell',
          publication_year: 1949,
          genre: ['Dystopian', 'Science Fiction'],
          description: 'A dystopian novel portraying a totalitarian society.',
          cover_image: 'https://image.com/image-2',
          isbn: '0023456789',
          quantity: null,
          price: null,
          publisher: null,
        },
        {
          id: 3,
          title: 'Pride and Prejudice',
          author: 'Jane Austen',
          publication_year: 1813,
          genre: ['Classic', 'Romance'],
          description:
            'A classic novel exploring themes of love, marriage, and social norms.',
          cover_image: 'https://image.com/image-3',
          isbn: '0003456789',
          quantity: null,
          price: null,
          publisher: null,
        },
      ];
      const responseType = 'application/xml';
      const baseUrl = 'https://freetestapi.com/api/v1/';
      const limit = 10;
      it('returns books when getBooks is called', async () => {
        xmlParser.mockReturnValue(expectedBooks);
        const client = new BookSearchApi(baseUrl, responseType);
        const books = await client.getBooks(limit);
        expect(xmlParser).toHaveBeenCalledTimes(1);
        expect(books).toEqual(expectedBooks);
      });
      it('returns books when getBooks is called with no limit', async () => {
        xmlParser.mockReturnValue(expectedBooks);
        const client = new BookSearchApi(baseUrl, responseType);
        const books = await client.getBooks();
        expect(xmlParser).toHaveBeenCalledTimes(1);
        expect(books).toEqual(expectedBooks);
      });
      it('returns partial book data when getBooks is called', async () => {
        const expectedBooks = [
          {
            id: 1,
            title: 'To Kill a Mockingbird',
            author: null,
            publication_year: null,
            genre: null,
            description: null,
            cover_image: null,
            isbn: null,
            quantity: null,
            price: null,
            publisher: null,
          },
          {
            id: 2,
            title: '1984',
            author: null,
            publication_year: null,
            genre: null,
            description: null,
            cover_image: null,
            isbn: null,
            quantity: null,
            price: null,
            publisher: null,
          },
          {
            id: 3,
            title: 'Pride and Prejudice',
            author: null,
            publication_year: null,
            genre: null,
            description: null,
            cover_image: null,
            isbn: null,
            quantity: null,
            price: null,
            publisher: null,
          },
        ];
        xmlParser.mockReturnValue(expectedBooks);
        const client = new BookSearchApi(baseUrl, responseType);
        const books = await client.getBooks(limit);
        expect(xmlParser).toHaveBeenCalledTimes(1);
        expect(books).toEqual(expectedBooks);
      });
      it('returns books when getBooksBy "arthor" is called', async () => {
        xmlParser.mockReturnValue(Array(expectedBooks[1]));
        const searchType = 'author';
        const search = 'George Orwell';
        const client = new BookSearchApi(baseUrl, responseType);
        const books = await client.getBooksBy(searchType, search, limit);
        expect(xmlParser).toHaveBeenCalledTimes(1);
        expect(books).toEqual(Array(expectedBooks[1]));
      });
      it('returns books when getBooksBy "title" is called', async () => {
        xmlParser.mockReturnValue(Array(expectedBooks[1]));
        const searchType = 'title';
        const search = '1984';
        const client = new BookSearchApi(baseUrl, responseType);
        const books = await client.getBooksBy(searchType, search, limit);
        expect(xmlParser).toHaveBeenCalledTimes(1);
        expect(books).toEqual(Array(expectedBooks[1]));
      });
      it('returns books when getBooksBy "publication_year" is called', async () => {
        xmlParser.mockReturnValue(Array(expectedBooks[1]));
        const searchType = 'yearPublished';
        const search = '2021';
        const client = new BookSearchApi(baseUrl, responseType);
        const books = await client.getBooksBy(searchType, search, limit);
        expect(xmlParser).toHaveBeenCalledTimes(1);
        expect(books).toEqual(Array(expectedBooks[1]));
      });
      it('returns books when getBooksBy "publisher" is called', async () => {
        xmlParser.mockReturnValue(Array(expectedBooks[1]));
        const searchType = 'publisher';
        const search = 'Harper Collins';
        const client = new BookSearchApi(baseUrl, responseType);
        const books = await client.getBooksBy(searchType, search, limit);
        expect(xmlParser).toHaveBeenCalledTimes(1);
        expect(books).toEqual(Array(expectedBooks[1]));
      });
      it('returns partial book data when getBooksBy is called', async () => {
        const expectedBooks = [
          {
            id: 1,
            title: 'To Kill a Mockingbird',
            author: null,
            publication_year: null,
            genre: null,
            description: null,
            cover_image: null,
            isbn: null,
            quantity: null,
            price: null,
            publisher: null,
          },
          {
            id: 2,
            title: '1984',
            author: null,
            publication_year: null,
            genre: null,
            description: null,
            cover_image: null,
            isbn: null,
            quantity: null,
            price: null,
            publisher: null,
          },
          {
            id: 3,
            title: 'Pride and Prejudice',
            author: null,
            publication_year: null,
            genre: null,
            description: null,
            cover_image: null,
            isbn: null,
            quantity: null,
            price: null,
            publisher: null,
          },
        ];
        xmlParser.mockReturnValue(expectedBooks);
        const searchType = 'author';
        const search = 'George Orwell';
        const client = new BookSearchApi(baseUrl, responseType);
        const books = await client.getBooksBy(searchType, search, limit);
        expect(xmlParser).toHaveBeenCalledTimes(1);
        expect(books).toEqual(expectedBooks);
      });
      it('fails to returns books when getBooksBy "yearPublished" is called', async () => {
        xmlParser.mockReturnValue(expectedBooks);
        const searchType = 'year';
        const search = '1813';
        const client = new BookSearchApi(baseUrl, responseType);
        const books = await client.getBooksBy(searchType, search, limit);
        expect(xmlParser).toHaveBeenCalledTimes(0);
        expect(books).toEqual(null);
      });
      it('returns books when getBooksby "arthor" is called with pagination', async () => {
        xmlParser.mockReturnValue(expectedBooks);
        const searchType = 'author';
        const search = 'George Orwell';
        const client = new BookSearchApi(baseUrl, responseType);
        const pagination = { status: true, page: 1, booksPerPage: 10 };
        const books = await client.getBooksBy(
          searchType,
          search,
          limit,
          pagination
        );
        expect(xmlParser).toHaveBeenCalledTimes(1);
        expect(books).toEqual(expectedBooks);
      });
    });
  });
});
