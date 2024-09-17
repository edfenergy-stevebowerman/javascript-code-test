import { xmlParser } from '../helper/xmlParser.js';

describe('Parse xml', () => {
  const xmlData = `
    <bookstore>
        <book category="cooking">
            <title lang="en">Everyday Italian</title>
            <author>Giada De Laurentiis</author>
            <year>2005</year>
            <price>30.00</price>
            <publisher>unknown</publisher>
            <genre>Fiction</genre>
            <genre>Classic</genre>
        </book>
        <book category="children">
            <title lang="en">Harry Potter</title>
            <author>J K. Rowling</author>
            <year>2005</year>
            <price>29.99</price>
            <publisher>unknown</publisher>
            <genre>Fiction</genre>
            <genre>Classic</genre>
        </book>
        <book category="web">
            <title lang="en">XQuery Kick Start</title>
            <author>James McGovern</author>
            <year>2003</year>
            <price>49.99</price>
            <publisher>unknown</publisher>
            <genre>Education</genre>
        </book>
        <book category="web" cover="paperback">
            <title lang="en">Learning XML</title>
            <author>Erik T. Ray</author>
            <year>2003</year>
            <price>39.95</price>
            <publisher>unknown</publisher>
            <genre>Education</genre>
        </book>
    </bookstore>`;
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
  const xmlOptions = {
    ignoreAttributes: true,
  };
  it('returns books', () => {
    expect(xmlParser(xmlData, xmlOptions)).toEqual(expectedBooks);
  });
  it('fails to returns books', () => {
    const xmlData = `
        bookstore>
         <book>
             <title lang="en">Everyday Italian</title>
            <author>Giada De Laurentiis</author>
            <year>2005</year>
            <price>30.00</price>
            <publisher>unknown</publisher>
            <genre>Fiction</genre>
            <genre>Classic</genre>
         </books>
        </bookstore>`;
    const xmlOptions = {
      ignoreAttributes: true,
    };
    expect(() => xmlParser(xmlData, xmlOptions)).toThrow();
  });
});
