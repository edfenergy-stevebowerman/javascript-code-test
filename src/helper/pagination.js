export const booksPagination = (books, { page, booksPerPage }) => {
  const booksPage = page <= 0 ? 1 : page;
  const startIndex = (booksPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  return books.slice(startIndex, endIndex);
};
