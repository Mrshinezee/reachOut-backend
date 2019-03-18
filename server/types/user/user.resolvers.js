import { User } from '../../models';

//   return User.findByIdAndUpdate(ctx.user._id, args.input, { new: true })
const currentUser = (_, args, ctx) => User.findOne({ where: { email: args.email } });


const addUser = (_, args) => User.create({
  title: 'foo',
  description: 'bar',
  deadline: new Date(),
});

export default {
  Query: {
    currentUser,
  },
  Mutation: {
    addUser,
  },
};
