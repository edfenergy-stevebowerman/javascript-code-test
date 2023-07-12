const BookSearchApiClient = require("./BookSearchApiClient.js");

const url = "http://api.book-seller-example.com/";
const queryNameByAuthor = "by-author?q="
const queryAuthValue = "Shakespear";

const queryNameByPublisher = "by-publisher?q="
const queryPublisherValue = "McGraw Hill";

const client = BookSearchApiClient();
const limit = 10;
const bookByAughShakespearList = client.getBooksByQuery(url, queryNameByAuthor, queryAuthValue, limit);
const bookByPublisherMcGrawHillList = client.getBooksByQuery(url, queryNameByPublisher, queryPublisherValue, limit);
