import validator from 'validator';
import { User } from '../models';

export const validateSignUp = async (args) => {
  const errors = [];
  console.log('does it enter here too', args.input.firstname);
  if (validator.isEmpty(args.input.firstname)) {
    errors.push({ key: 'firstname', message: 'Firstname is required.' });
  } else if (!validator.isLength(args.input.firstname, { min: 3, max: 200 })) {
    errors.push(
      { key: 'firstname', message: 'Your firstname must be between 3 and 200 characters.' },
    );
  }

  if (validator.isEmpty(args.input.lastname)) {
    errors.push({ key: 'lastname', message: 'lastName is required.' });
  } else if (!validator.isLength(args.input.lastname, { min: 3, max: 200 })) {
    errors.push(
      { key: 'lastname', message: 'Your firstname must be between 3 and 200 characters.' },
    );
  }

  if (validator.isEmpty(args.input.email)) {
    errors.push({ key: 'email', message: 'Email address is required.' });
  } else if (!validator.isEmail(args.input.email)) {
    errors.push({ key: 'email', message: 'Please provide a valid email address.' });
  }

  if (validator.isEmpty(args.input.password)) {
    errors.push({ key: 'password', message: 'Password field is required.' });
  } else if (!validator.isLength(args.input.password, { min: 6, max: 20 })) {
    errors.push({ key: 'password', message: 'Your password must be between 6 and 20 characters.' });
  }
  const registeredEmail = await User.findOne({ where: { email: args.input.email } });
  if (registeredEmail !== null) {
    errors.push({ key: 'email', message: 'Email already exists.' });
  }

  if (errors.length) {
    return errors;
  }
};

export const validateLogin = async (args) => {
  const errors = [];
  if (validator.isEmpty(args.email)) {
    errors.push({ key: 'email', message: 'Email address is required.' });
  }

  if (validator.isEmpty(args.password)) {
    errors.push({ key: 'password', message: 'Password field is required.' });
  }

  const loginEmail = await User.findOne({ where: { email: args.email } });
  if (loginEmail === null) {
    errors.push({ key: 'email', message: 'Email does not exists.' });
  }

  if (errors.length) {
    return errors;
  }
};
