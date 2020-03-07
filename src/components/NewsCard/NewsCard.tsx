import React, {FC} from 'react';
import {getArticle} from '../../utils/news-api';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Redirect} from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      maxHeight: '80vh',
      overflowY: 'auto',
    },
    media: {
      height: '50vh',
    },
  })
);

const NewsCard: FC = () => {
  const {root, media} = useStyles();

  const article = getArticle();

  if (!Boolean(article)) {
    return (
      <Redirect
        to={{
          pathname: '/error',
          state: {error: 'News API not working, sorry!'},
        }}
      />
    );
  }

  const {author, title, description, url, urlToImage} = article;

  return (
    <Card className={root}>
      <CardHeader title={title} subheader={author && `By ${author}`} />
      <CardMedia className={media} image={urlToImage} />
      <CardContent>
        <Typography variant="body2">{description}</Typography>
        <Link href={url}>Link to the full article</Link>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
