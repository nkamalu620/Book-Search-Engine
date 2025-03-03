const typeDefs = `
  type Book {
    _id: ID!
   title: String!
   author: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type Query {
    books: [Book]!
    book(bookId: ID!): Book
    users: [User]!
    user(userId: ID!): User
  }

  # Important for useMutation: We define our Mutation type to inform our entrypoints

  type Mutation {
    addBook(title: String!, author: String!): Book
    removeBook(bookId: ID!): Book
    addUser(username: String!, email: String!): User
    removeUser(userId: ID!): User
  }
`;

export default typeDefs;
