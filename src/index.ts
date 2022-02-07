import express, { json } from 'express';
import { postRouter } from './routes/post.route';
import mongoose from 'mongoose';

const app = express();
const port = 3001;
const uri =
  'mongodb+srv://ydthewinner:wxIqRaHrY3lkDvW1@cluster0.rjxtl.mongodb.net/mongoPlayground?retryWrites=true&w=majority';

app.use(json()); // TODO: [YD] Check this
app.use(postRouter);

mongoose.connect(uri, () => {
  console.log('connected !!!!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
