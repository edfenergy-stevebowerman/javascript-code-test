const BookSearchApiClient = require("./BookSearchApiClient.js");

const client = BookSearchApiClient();
const booksByShakespeare = client.getBooksByAuthor("Shakespeare", 10);
