const typeDefs = `
  type Book {
    _id: ID!
   title: String!
   authors: [String]
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
    me: User
  }

type Auth {
  token: ID!
  user: User
}

  # Important for useMutation: We define our Mutation type to inform our entrypoints

  type Mutation {
    addBook(title: String!, authors: [String], description: String!, boodId: String!, image: String!, link: String!): User
    removeBook(bookId: ID!): User
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    
  }
`;

export default typeDefs;
