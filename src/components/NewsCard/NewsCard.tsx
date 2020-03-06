import React, {FC} from 'react';
import {getArticle} from '../../utils/news-api';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
    },
    media: {
      height: '50vh',
    },
  })
);

const NewsCard: FC = () => {
  const {author, title, description, url, urlToImage} = getArticle();

  const {root, media} = useStyles();

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
