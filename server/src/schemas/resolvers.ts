import { User } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';


interface BookArgs {
  bookId: string;
}

interface AddBookArgs {
  title: string;
  author: string;
  description: string;
  bookId: string;
  image: string;
  link: string;
}

interface UserArgs {
  userId: string;
}

interface AddUserArgs {
  input: {
    username: string;
    email: string;
    password: string;
  }
}

interface LoginUserArgs {
  email: string;
  password: string;
}

const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('savedBooks');
        return userData;
      }
      throw new AuthenticationError('Could not authenticate user.');
    },
  },

  // Important for useMutation: The resolver matches the typeDefs entry point and informs the request of the relevant data
  Mutation: {
    addBook: async (_parent: any, { input }: AddBookArgs, context: any) => {
      if (context.user) {

       const updatedUserBook = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: input } }
        );
        return updatedUserBook;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
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
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      // Create a new user with the provided username, email, and password
      const user = await User.create({ ...input });

      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);

      // Return the token and the user
      return { token, user };
    },


    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      // Find a user with the provided email
      const user = await User.findOne({ email });

      // If no user is found, throw an AuthenticationError
      if (!user) {
        throw new AuthenticationError('Could not authenticate user.');
      }

      // Check if the provided password is correct
      const correctPw = await user.isCorrectPassword(password);

      // If the password is incorrect, throw an AuthenticationError
      if (!correctPw) {
        throw new AuthenticationError('Could not authenticate user.');
      }

      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);

      // Return the token and the user
      return { token, user };
    },
  }
};

export default resolvers;
