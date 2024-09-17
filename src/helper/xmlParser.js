import { XMLParser, XMLValidator } from 'fast-xml-parser';

export const xmlParser = (xmlData, options) => {
  const parser = new XMLParser(options);
  const validXml = XMLValidator.validate(xmlData, options);
  if (validXml.err) {
    console.error('Validation error data: ', xmlData);
    console.error('Validation error: ', validXml.err);
    throw new Error(`Validation error: ${validXml.code}`);
  }
  const booksData = parser.parse(xmlData);
  return booksData.bookstore.book;
};
