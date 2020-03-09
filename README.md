# Neo4j-OGM University Example

This example is inspired (and simplified version) from [neo4j-ogm-university] (https://github.com/neo4j-examples/neo4j-ogm-university) from neo4j-examples.
It uses Ratpack/Groovy as a web framework/language, bolt as a driver to connect to Neo4j and AngularJS for the frontend.
# How to run
make sure neo4j is running by `neo4j start` then run the app using gradle:
`gradle run`
you can use gradle's continuous build feature by adding `-t` option:
`gradle run -t`
the demo should be running on http://localhost:5050/

the app need more work to be done.