# ftsui

The goal of this repository is to showcase a sample search interface purely in HTML and Javascript  and using a simple GO proxy to avoid CORS issues for testing purposes for Full Text Search Indexing in couchbase


To execute this please just download and run the dudehttp executable, if you are on a linux or MAC OS then please d/l GOlang and build your own executable of dudehttp.

The primary files are index.html and search.js   Inside search.js you will see at the very top multiple variables that contain the JSON commands for different style of searching.

Also please load the products data as follows:

 Place the .JSON products file in your couchbase server bin directory and run the following command.
 cbimport json -c couchbase://127.0.0.1 -u Administrator -p password -b products -d file:///Path/to/downloaded/products_with_reviews.json -f lines -g %asin% -t 4
 
 
POSTMAN or some other setup to create the Indexes.
