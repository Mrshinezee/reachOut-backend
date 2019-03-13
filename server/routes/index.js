import userRouter from './userRouter';

const router = (app) => {
  userRouter(app);  
  app.get('/', (request, response) => response.status(200).json({message: 'Welcome to reachout application'}))
};

export default router;
