function BookSearchApiClient(format) {
  this.format = format;
}

BookSearchApiClient.prototype.getBooksByQuery = function (url, queryName, queryValue, limit) {
  var result = [];
  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
      url +
      queryName +
      queryValue +
      "&limit=" +
      limit +
      "&format=" +
      this.format
  );

  xhr.onload = function () {
    if (xhr.status == 200) {
      if (this.format == "json") {
        var json = JSON.parse(xhr.responseText);

        result = json.map(function (item) {
          return {
            title: item.book.title,
            author: item.book.author,
            isbn: item.book.isbn,
            quantity: item.stock.quantity,
            price: item.stock.price,
          };
        });
      } else if (this.format == "xml") {
        var xml = xhr.responseXML;

        result = xml.documentElement.childNodes.map(function (item) {
        //create list of Books from Book class; populate individual objects' field and return the list.
        //Do not know how to do it in Javascript as I am a Java programmer.
          return {
            title: item.childNodes[0].childNodes[0].nodeValue,
            author: item.childNodes[0].childNodes[1].nodeValue,
            isbn: item.childNodes[0].childNodes[2].nodeValue,
            quantity: item.childNodes[1].childNodes[0].nodeValue,
            price: item.childNodes[1].childNodes[1].nodeValue,
          };
        });
      }

      return result;
    } else {
      alert("Request failed.  Returned status of " + xhr.status);
    }
  };
  xhr.send();
};

module.exports = GetBookListApiClient;
