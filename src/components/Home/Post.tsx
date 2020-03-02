import React, {FC} from 'react';

const Post: FC = () => {
  return (
    <div className="col-12 col-lg-6 offset-lg-3">
      <input className="form-control my-3" placeholder="Post Title" />
      <textarea
        className="form-control my-3"
        placeholder="Post Author"></textarea>
      <input className="form-control my-3" placeholder="Post Body" />
      <button className="btn btn-primary float-right">Submit</button>
    </div>
  );
};

export default Post;
