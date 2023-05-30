import mongoose, { mongo } from 'mongoose';
import app from './app';
import config from './config';

async function bootstrap() {
  try {
    mongoose.connect(config.dbUri);
    app.listen(config.port, () => {
      console.log('App listening on port', config.port);
    });
    console.log(`Successfully connected to DB `);
  } catch (err) {
    console.log('Failed to connect database', err);
  }
}

bootstrap();
