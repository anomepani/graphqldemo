var { graphql, buildSchema } = require('graphql');
//Add express and express-graphql package to create server
var express = require('express');
var graphqlHTTP = require('express-graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String,
    name: String,
rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);
// // Created new query who accept dynamic paramter or variable
// var rollDiceSchema = buildSchema(`
// type Query {
// rollDice(numDice: Int!, numSides: Int): [Int]

// }`);

//console.log(schema);
// The root provides a resolver function for each API endpoint
// Added rollDice function or property to resolve with dynamic value
var root = {
  hello: () => {
    return 'Hello world!';
  },
  name:()=>'Another Name',
  rollDice: function ({numDice, numSides}) {
    var output = [];
    for (var i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }
    return output;
  }
};

// Commented below code and added express server code to execute graphql query
// // Run the GraphQL query '{ hello }' and print out the response
// graphql(schema, '{ hello,name }', root).then((response) => {
//   console.log(response);
// });     
var app=express();
app.use("/graphql",graphqlHTTP({schema:schema,rootValue:root,graphiql:true}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
