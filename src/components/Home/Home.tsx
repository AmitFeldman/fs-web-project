import React, {FC} from 'react';
import Post from './Post';

const Home: FC = () => {
  return (
    <div className="container">
      <div className="row pt-5">
        <div className="col-12 col-lg-6 offset-lg-3">
          <h1 className="text-center">LightBlog</h1>
        </div>
        <Post />
      </div>
    </div>
  );
};

export default Home;
