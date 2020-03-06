import React, {ChangeEvent, FC, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import {Create} from '@material-ui/icons';
import {createPost, Post} from '../../../utils/posts-api';
import {useAuth} from '../../../context/AuthContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
    },
    inputContainer: {
      margin: 0,
      width: '100%',
      textAlign: 'center',
    },
    input: {
      width: '98%',
    },
    fab: {
      position: 'absolute',
      right: '1%',
      bottom: '5%',
    },
  })
);

interface CreatePostProps {
  onCreatePost: (newPost: Post) => void;
}

const CreatePost: FC<CreatePostProps> = ({onCreatePost}) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const {input, inputContainer, root, fab} = useStyles();
  const {user} = useAuth();

  const clearForm = () => {
    setTitle('');
    setBody('');
  };

  const submitPost = async () => {
    if (user) {
      try {
        const newPost = await createPost({title, body});
        onCreatePost({
          ...newPost,
          author: user,
        });
        clearForm();
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log('not logged in');
    }
  };

  return (
    <Paper className={root}>
      <Grid
        container
        className={inputContainer}
        direction="column"
        spacing={4}
        justify="center"
        alignItems="stretch">
        <Grid item>
          <TextField
            value={title}
            className={input}
            placeholder="What do you want to talk about?"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setTitle(event.target.value)
            }
          />
        </Grid>
        <Grid item>
          <TextField
            value={body}
            className={input}
            variant="outlined"
            multiline
            rows={4}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setBody(event.target.value)
            }
          />
        </Grid>
        <Grid item>
          <Fab
            className={fab}
            color="primary"
            variant="extended"
            onClick={submitPost}>
            <Create />
            Post
          </Fab>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CreatePost;