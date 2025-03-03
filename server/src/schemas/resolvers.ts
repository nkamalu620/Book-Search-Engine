import Book from '../models/Book.js';
import User from '../models/User.js';

interface BookArgs {
  bookId: string;
}

interface AddBookArgs {
title: string;
author: string;
}

interface UserArgs {
 userId: string;
}

interface AddUserArgs {
 username: string;
 email: string;
}

const resolvers = {
  Query: {
    books: async () => {
      try {
        return await Book.find();
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to fetch books: ${error.message}`);
        } else {
          throw new Error('Failed to fetch books: Unknown error');
        }
      }
    },
    book: async (_parent: any, { bookId }: BookArgs) => {
      try {
        return await Book.findOne({ _id: bookId });
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to fetch book: ${error.message}`);
        } else {
          throw new Error('Failed to fetch book: Unknown error');
        }
      }
    },
    users: async () => {
      try {
        return await User.find();
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to fetch users: ${error.message}`);
        } else {
          throw new Error('Failed to fetch users: Unknown error');
        }
      }
    },
    user: async (_parent: any, { userId }: UserArgs) => {
      try {
        return await User.findOne({ _id: userId });
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to fetch user: ${error.message}`);
        } else {
          throw new Error('Failed to fetch user: Unknown error');
        }
      }
    },
  },

  // Important for useMutation: The resolver matches the typeDefs entry point and informs the request of the relevant data
  Mutation: {
    addBook: async (_parent: any, { title, author }: AddBookArgs) => {
      try {
        return await Book.create({ title, author });
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to add book: ${error.message}`);
        } else {
          throw new Error('Failed to add book: Unknown error');
        }
      }
    },
    removeBook: async (_parent: any, { bookId }: BookArgs) => {
      try {
        return await Book.findOneAndDelete({ _id: bookId });
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to remove book: ${error.message}`);
        } else {
          throw new Error('Failed to remove book: Unknown error');
        }
      }
    },
    addUser: async (_parent: any, { username, email }: AddUserArgs) => {
      try {
        return await User.create({ username, email });
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to add user: ${error.message}`);
        } else {
          throw new Error('Failed to add user: Unknown error');
        }
      }
    },
    removeUser: async (_parent: any, { userId }: UserArgs) => {
      try {
        return await User.findOneAndDelete({ _id: userId });
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to remove user: ${error.message}`);
        } else {
          throw new Error('Failed to remove user: Unknown error');
        }
      }
    },
  },
};

export default resolvers;
