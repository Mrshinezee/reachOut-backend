import { User } from '../../models'

const currentUser = (_, args, ctx) => {
//   return User.findByIdAndUpdate(ctx.user._id, args.input, { new: true })
  return User.findOne({ where: { email: args.email },})
}

const addUser = (_, args) => {
  return User.create({ title: 'foo', description: 'bar', deadline: new Date() })
}

export default {
  Query: {
    currentUser
  },
  Mutation: {
    addUser
  }
}
