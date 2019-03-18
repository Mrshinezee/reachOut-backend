import express from 'express';
import winston from 'winston';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ApolloServer} from 'apollo-server';
import { merge } from 'lodash';

import { loadTypeSchema } from './server/helper/schema';
import user from './server/types/user/user.resolvers';

const types = ['user'];

const start = async () => {
  const rootSchema = `
    schema {
      query: Query
      mutation: Mutation
    }
  `;
  const schemaTypes = await Promise.all(types.map(loadTypeSchema));

  const server = new ApolloServer({
    typeDefs: [rootSchema, ...schemaTypes],
    resolvers: merge({}, user),
  });

  server.listen().then(({ url }) => {
    winston.log('info', `Server ready at ${url}`);
  });
};

start();
