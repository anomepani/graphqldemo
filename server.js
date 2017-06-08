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

// Construct a schema, using GraphQL schema language with different type
/**
 * The GraphQL schema language supports the scalar types of String, Int, Float, Boolean, and ID,
 *  so you can use these directly in the schema you pass to buildSchema.
    By default, every type is nullable - it's legitimate to return null as any of the scalar types.
    Use an exclamation point to indicate a type cannot be nullable, so String! is a non-nullable string.
    To use a list type, surround the type in square brackets, so [Int] is a list of integers.
 */
var basicTypeSchema = buildSchema(`
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int],
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

var basicTypeRoot = {
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
  },
  random: () => {
    return Math.random();
  },
  rollThreeDice: () => {
    return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
  },
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
//// Commented static and old query and assigned new schema and root value
//app.use("/graphql",graphqlHTTP({schema:schema,rootValue:root,graphiql:true}));

app.use("/graphql",graphqlHTTP({schema:basicTypeSchema,rootValue:basicTypeRoot,graphiql:true}));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
