import React, {ChangeEvent, FC, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import {Create} from '@material-ui/icons';
import {CommentItem, createComment} from '../../../utils/comments-api';
import {useAuth} from '../../../context/AuthContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      width: '80%',
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
  const {user} = useAuth();

  const clearForm = () => {
    setComment('');
  };

  const submitComment = async () => {
    if (user) {
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
