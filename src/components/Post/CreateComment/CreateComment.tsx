import React, {ChangeEvent, FC, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import {Create} from '@material-ui/icons';
import {createComment} from '../../../utils/comments-api';

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
}

const CreateComment: FC<CreateCommentProps> = ({postId}) => {
  const [comment, setComment] = useState('');
  const {input, inputContainer, root, fab} = useStyles();

  const clearForm = () => {
    setComment('');
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
            onClick={() => createComment({comment, postId}).then(clearForm)}>
            <Create />
            Comment
          </Fab>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CreateComment;
