import { Schema, Model, model, Document } from 'mongoose';

interface IPost {
  title: string;
  body: string;
}

// TODO: [YD] Study advanced types here with generics
interface PostModel extends Model<IPost> {
  build(val: IPost): any;
}

const postSchema = new Schema<IPost, PostModel>({
  title: {
    type: String,
    required: true,
  },
  body: String,
});

const Post = model<IPost, PostModel>('Post', postSchema);

postSchema.statics.build = (val: IPost) => {
  return new Post(val);
};

export { Post };
