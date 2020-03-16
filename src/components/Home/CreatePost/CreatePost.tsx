import React, {ChangeEvent, FC, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import {Create} from '@material-ui/icons';
import {createPost, Post} from '../../../utils/posts-api';
import {useAuth} from '../../../context/AuthContext';
import {HelpOutline} from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';
import {useAlert} from '../../../context/AlertContext';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';

const MAX_POST_TITLE_LENGTH = 100;
const MAX_POST_BODY_LENGTH = 1000;

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
    fabWrapper: {
      position: 'absolute',
      bottom: '5%',
      right: '1%',
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
  const {input, inputContainer, root, fabWrapper} = useStyles();
  const {user} = useAuth();
  const {alert} = useAlert();

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
      alert({
        message: "You can't post if you aren't logged in!",
        redirectPath: '/login',
        buttonText: 'Login',
      });
    }
  };

  return (
    <Paper className={root}>
      <ValidatorForm onSubmit={submitPost}>
        <Grid
          container
          className={inputContainer}
          direction="column"
          spacing={2}
          justify="center"
          alignItems="stretch">
          <Grid item>
            <TextValidator
              name="Title"
              value={title}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setTitle(event.target.value)
              }
              placeholder="What do you want to talk about?"
              className={input}
              validators={[
                'required',
                `maxStringLength:${MAX_POST_TITLE_LENGTH}`,
              ]}
              errorMessages={[
                "Don't leave the title empty!",
                `Too long, let's try to keep it below ${MAX_POST_TITLE_LENGTH} characters!`,
              ]}
            />
          </Grid>
          <Grid item>
            <TextValidator
              name="Body"
              value={body}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setBody(event.target.value)
              }
              variant="outlined"
              multiline
              rows={4}
              className={input}
              validators={[
                'required',
                `maxStringLength:${MAX_POST_BODY_LENGTH}`,
              ]}
              errorMessages={[
                "Don't leave the post empty!",
                `Too long, let's try to keep it below ${MAX_POST_BODY_LENGTH} characters!`,
              ]}
            />
          </Grid>
          <Grid item>
            <aside className={fabWrapper}>
              <Tooltip title="Don't know what to post about?">
                <Fab
                  size="small"
                  color="secondary"
                  onClick={onHelpClick}
                  style={{margin: '0 8px'}}>
                  <HelpOutline />
                </Fab>
              </Tooltip>
              <Fab type="submit" color="primary" variant="extended">
                <Create />
                Post
              </Fab>
            </aside>
          </Grid>
        </Grid>
      </ValidatorForm>
    </Paper>
  );
};

export default CreatePost;
