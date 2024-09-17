EDF book search API allows users to search books. 
EDF book search API features are:
- search books by author, title, publisher and isbn
- search books from different book seller APIs
- handle different data types

Testing:
- Tested manually using client and test APIs
- Unit testing with mocks and spies

[text](coverage/lcov-report/index.html)

Assumptions:
UI is a dumb termernial that can query various APIs for books data.
The data returned from the APIs is an array of book objects or an 
empty array. Business logic for getting different types of data from
different APIs is server side. It's assummed that authentification 
and authorisation will be carried out by the client. The EDF books
search API can be deployed as a lambda function with an API gateway. 