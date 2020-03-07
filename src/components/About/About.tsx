import React, {FC} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import LocationsMap from './LocationsMap/LocationsMap';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textContainer: {
      maxWidth: '800px',
      margin: '0 auto',
      columnWidth: '14em',
      columnGap: '2em',
      columnRule: '1px solid #ccc',
    },
    blockquote: {
      font: "2em 'Bebas Neue', cursive",
      margin: 0,
      columnSpan: 'all',
      textAlign: 'center',
      padding: theme.spacing(3),
    },
    video: {
      width: '100%',
      textAlign: 'center',
    },
  })
);

const About: FC = () => {
  const {textContainer, blockquote, video} = useStyles();

  return (
    <>
      <header>
        <Typography variant="h2" align="center">
          Our Vision
        </Typography>
      </header>

      <Divider />
      <br />

      <section className={textContainer}>
        <Typography variant="body1" component="p" paragraph>
          We at bloog are dedicated to providing the greatest simple blog
          experience known to man. We believe that blogs are the epitome of what
          it means to be human. A place where you can share your deepest
          thoughts and ideas with other like-minded individuals. A place free of
          judgement and ridicule. A place where one can be one's true self. But
          wait, you're thinking, what makes this website different from the
          hundreds other blogging websites just like it?
        </Typography>

        <blockquote className={blockquote}>
          A place where one can be one's true self
        </blockquote>

        <Typography variant="body1" component="p" paragraph>
          We added an extra 'o' to the word blog. Take a moment to recover from
          that bombshell. An idea so simple yet elegant that a 5 year old
          could've thought of it. But guess what? They didn't. We did. That is
          exactly the kind of innovative thinking you will come to expect from
          us at bloog. We want you to think of bloog less like just another blog
          website and more like a second home. So kick back, relax, pour
          yourself a glass of your alcoholic beverage of choice (if you are of
          legal drinking age) and immerse yourself into bloog. Welcome home.
        </Typography>
      </section>

      <br />
      <Divider />

      <header>
        <Typography variant="h4" align="center">
          Why we think blogging can help you!
        </Typography>
      </header>

      <Divider />
      <br />

      <section className={video}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/J7Ea31Azebs"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </section>

      <br />
      <Divider />

      <header>
        <Typography variant="h4" align="center">
          Come visit one of our offices!
        </Typography>
      </header>

      <Divider />
      <br />

      <LocationsMap />
      <br />
    </>
  );
};

export default About;
