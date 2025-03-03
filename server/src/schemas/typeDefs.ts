const typeDefs = `
  type Book {
    _id: ID!
   title: String!
   author: [String]
   description: String
   image: String
   link: String
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Query {
    books: [Book]!
    book(bookId: ID!): Book
    users: [User]!
    user(userId: ID!): User
    me: User
  }

type Auth {
  token: ID!
  user: User
}

  # Important for useMutation: We define our Mutation type to inform our entrypoints

  type Mutation {
    addBook(title: String!, author: String!): Book
    saveBook(title: String!, author: String!): User
    removeBook(bookId: ID!): Book
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!): User
    removeUser(userId: ID!): User
  }
`;

export default typeDefs;
