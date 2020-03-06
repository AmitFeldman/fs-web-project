import React, {ChangeEvent, FC, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import {Create} from '@material-ui/icons';
import {createPost, Post} from '../../../utils/posts-api';
import {useAuth} from '../../../context/AuthContext';
import {HelpOutline} from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';

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
      bottom: '5%',
    },
    rightFab: {
      right: '1%',
    },
    leftFab: {
      left: '1%',
    },
  })
);

interface CreatePostProps {
  onCreatePost: (newPost: Post) => void;
  onHelpClick: () => void;
}

const CreatePost: FC<CreatePostProps> = ({onCreatePost, onHelpClick}) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const {input, inputContainer, root, fab, leftFab, rightFab} = useStyles();
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
          <>
            <Tooltip title="Don't know what to post about?">
              <Fab
                size="small"
                color="secondary"
                onClick={onHelpClick}
                className={`${fab} ${leftFab}`}>
                <HelpOutline />
              </Fab>
            </Tooltip>
            <Fab
              className={`${fab} ${rightFab}`}
              color="primary"
              variant="extended"
              onClick={submitPost}>
              <Create />
              Post
            </Fab>
          </>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CreatePost;
