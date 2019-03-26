import { GraphQLError } from 'graphql';

class ValidationError extends GraphQLError {
  constructor(errors) {
    super();
    this.state = errors.reduce((result, error) => {
      if (Object.prototype.hasOwnProperty.call(result, error.key)) {
        result[error.key].push(error.message);
      } else {
        /* eslint-disable no-param-reassign */
        result[error.key] = error.message;
      }
      return result;
    }, {});
  }
}

export default ValidationError;
