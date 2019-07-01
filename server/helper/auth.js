import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const authenticateUser = async (user) => {
  const token = await jsonwebtoken.sign(
    { id: user.userId, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1d' },
  );
  return { user, token };
};

export const hashpassword = password => bcrypt.hashSync(password, 10);

export const isValidPassword = (userpass, password) => {
  return bcrypt.compareSync(password, userpass);
};

export const checkIfSignedIn = () => true;
