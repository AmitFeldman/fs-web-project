import React, {ChangeEvent, FC, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import {Create} from '@material-ui/icons';
import {CommentItem, createComment} from '../../../utils/comments-api';
import {useAuth} from '../../../context/AuthContext';
import {useAlert} from '../../../context/AlertContext';

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

interface CreateCommentProps {
  postId: string;
  onCreateComment: (newComment: CommentItem) => void;
}

const CreateComment: FC<CreateCommentProps> = ({postId, onCreateComment}) => {
  const [comment, setComment] = useState('');
  const {input, inputContainer, root, fab} = useStyles();
  const {user, isUserLoggedIn} = useAuth();
  const {alert} = useAlert();

  const clearForm = () => {
    setComment('');
  };

  const submitComment = async () => {
    if (!isUserLoggedIn() && user) {
      try {
        const newComment = await createComment({comment, postId});
        onCreateComment({
          ...newComment,
          author: user,
        });
        clearForm();
      } catch (e) {
        console.log(e);
      }
    } else {
      alert({
        message: "You can't comment if you aren't logged in!",
        redirectPath: '/login',
        buttonText: 'Login',
      });
    }
  };

  return (
    <Paper className={root}>
      <Grid
        container
        className={inputContainer}
        direction="column"
        spacing={2}
        justify="center"
        alignItems="stretch">
        <Grid item>
          <TextField
            value={comment}
            placeholder="Anything to add to the conversation?"
            className={input}
            variant="outlined"
            multiline
            rows={4}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setComment(event.target.value)
            }
          />
        </Grid>
        <Grid item>
          <Fab
            className={fab}
            color="primary"
            variant="extended"
            onClick={submitComment}>
            <Create />
            Comment
          </Fab>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CreateComment;
