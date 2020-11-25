const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");

// Resources to build Apollo server
const typeDefs = importSchema("./schema/schema.graphql");
const resolvers = require("./resolvers/employeeReslover");

const DepartmentAPI = require("./datasources/departmentAPI");
const EmployeeAPI = require("./datasources/employeeAPI");

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => { return { DepartmentAPI: new DepartmentAPI(), EmployeeAPI: new EmployeeAPI() } },
});

server
    .listen({ port: 8001 })
    .then(({ url }) => console.log(`server running at ${url}`));