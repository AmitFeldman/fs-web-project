import React, {FC} from 'react';
import Typography from '@material-ui/core/Typography';
import {getPostsPerDayCount, getPostUserData} from '../../utils/posts-api';
import {useAsync} from 'react-async';
import CircularProgress from '@material-ui/core/CircularProgress';
import Bar from './Bar/Bar';
import {getCommentsPerDateCount} from '../../utils/comments-api';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Scatter from './Scatter/Scatter';

const Statistics: FC = () => {
  const {data: postsPerDay, isLoading: isPostsLoading} = useAsync(
    getPostsPerDayCount
  );
  const {data: commentsPerDay, isLoading: isCommentsLoading} = useAsync(
    getCommentsPerDateCount
  );

  const {data, isLoading} = useAsync(getPostUserData);

  return (
    <>
      <Typography variant="h3">Bloog Statistics</Typography>
      <Divider />

      <br />

      <Grid container spacing={4}>
        <Grid item sm={12} md={6}>
          <Typography variant="h5">Posts per Day</Typography>
          {isPostsLoading ? (
            <CircularProgress />
          ) : (
            postsPerDay && (
              <Bar
                data={postsPerDay}
                xProp="date"
                yProp="count"
                width={500}
                height={250}
                xLabel="Date"
                yLabel="Posts"
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
                xProp="date"
                yProp="count"
                width={500}
                height={250}
                xLabel="Date"
                yLabel="Comments"
              />
            )
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">
            Correlation between Amount of Posts and Amount of Likes by Users
          </Typography>
          {isLoading ? (
            <CircularProgress />
          ) : (
            data && (
              <Scatter
                data={data}
                xProp="postCount"
                yProp="likes"
                sizeProp="userCount"
                width={1000}
                height={450}
                xLabel="Post Count"
                yLabel="Likes"
              />
            )
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Statistics;
