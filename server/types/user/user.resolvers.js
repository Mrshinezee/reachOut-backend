import { User, Email_User_Credential } from '../../models';
import { authenticateUser, hashpassword, isValidPassword } from '../../helper/auth';
import { validateSignUp, validateLogin } from '../../validations/userValidation';
import ValidationError from '../../validations/validationError';

//   return User.findByIdAndUpdate(ctx.user._id, args.input, { new: true })
const currentUser = (_, args, ctx) => User.findOne({ where: { email: args.email } });


const addUser = (_, args) => User.create({
  title: 'foo',
  description: 'bar',
  deadline: new Date(),
});

const signUp = async (_, args) => {
  const errors = await validateSignUp(args);
  if (errors) {
    return new ValidationError(errors);
  }
  const newuser = await User.create({
    firstname: args.input.firstname,
    lastname: args.input.lastname,
    email: args.input.email,
    bio: args.input.bio,
  });

  const password = hashpassword(args.input.password);

  const user = await Email_User_Credential.create({
    userId: newuser.dataValues.id,
    email: newuser.dataValues.email,
    password,
  });

  return authenticateUser(user);
};

const signIn = async (_, args) => {
  const errors = await validateLogin(args.input);
  if (errors) {
    return new ValidationError(errors);
  }
  const logUser = await Email_User_Credential.findOne({ where: { email: args.input.email } });
  const check = isValidPassword(logUser.dataValues.password, args.input.password);
  console.log('checked', logUser.dataValues.password, args.input.password, check);
  if (check) {
    return authenticateUser(logUser);
  }
}

export default {
  Query: {
    currentUser,
  },
  Mutation: {
    addUser,
    signUp,
    signIn,
  },
};
