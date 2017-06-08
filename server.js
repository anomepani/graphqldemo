var { graphql, buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String,
    name: String
  }
`);

//console.log(schema);
// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
  name:()=>'Another Name'
};

// Run the GraphQL query '{ hello }' and print out the response
graphql(schema, '{ hello,name }', root).then((response) => {
  console.log(response);
});     