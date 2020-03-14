import React, {FC} from 'react';
import Typography from '@material-ui/core/Typography';
import {getPostsPerDayCount} from '../../utils/posts-api';
import {useAsync} from 'react-async';
import CircularProgress from '@material-ui/core/CircularProgress';
import Bar from './Bar/Bar';
import {getCommentsPerDateCount} from '../../utils/comments-api';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

const Statistics: FC = () => {
  const {data: postsPerDay, isLoading: isPostsLoading} = useAsync(
    getPostsPerDayCount
  );
  const {data: commentsPerDay, isLoading: isCommentsLoading} = useAsync(
    getCommentsPerDateCount
  );

  return (
    <>
      <Typography variant="h3">Bloog Statistics</Typography>
      <Divider />

      <br />

      <Grid container>
        <Grid item sm={12} md={6}>
          <Typography variant="h5">Posts per Day</Typography>
          {isPostsLoading ? (
            <CircularProgress />
          ) : (
            postsPerDay && (
              <Bar
                data={postsPerDay}
                xAxis="date"
                yAxis="count"
                width={500}
                height={250}
              />
            )
          )}
        </Grid>
        <Grid item sm={12} md={6}>
          <Typography variant="h5">Comments per Day</Typography>
          {isCommentsLoading ? (
            <CircularProgress />
          ) : (
            commentsPerDay && (
              <Bar
                data={commentsPerDay}
                xAxis="date"
                yAxis="count"
                width={500}
                height={250}
              />
            )
          )}
        </Grid>
        <Grid item xs={12}>
          ADD GRAPH
        </Grid>
      </Grid>
    </>
  );
};

export default Statistics;
