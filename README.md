# Couchbase Full Text Search Sample User Interface

The goal of this repository is to showcase a sample search interface purely in HTML and Javascript and using a simple GO proxy to avoid CORS issues for testing purposes for Full Text Search Indexing in Couchbase.

# Build / Run

To execute this please just download and run the dudehttp.exe executable, if you are on a Linux or MAC OS then please download GOlang and build your own executable:
* git clone https://github.com/couchbaselabs/ftsui
* cd ftsui
* go build
* ./ftsui

# Load Data

* Configure Couchbase Cluster with ``Full Text Search`` capabilities
* Create a Couchbase bucket called ``products``
* unzip [products_data_with_reviews.json.bz2](https://github.com/couchbaselabs/ftsui/blob/master/products_with_reviews.json.bz2?raw=truep)
* Run ``cbimport`` command - frmo your Couchbase Server bin folder
* Be sure to use full path the data file to avoid errors
* ``cbimport json -c couchbase://127.0.0.1 -u Administrator -p password -b products -d file:///Path/to/products_with_reviews.json -f lines -g %asin% -t 4``

# Setup Search Indexes
* POSTMAN or some other setup to create the Indexes.
* Or load via CURL command line:
  * ``curl -X PUT 'http://localhost:8094/api/index/products?indexType=fulltext-index&sourceType=couchbase&sourceName=products' --user Administrator:password -d @$PWD/FTSIndexDefinition.json``
* See index creation status at ``http://127.0.0.1:8091/ui/index.html#!/fts_list``

# Explore the application
The primary files are index.html and search.js.
Inside search.js you will see at the very top multiple variables that contain the JSON commands for different style of searching.
