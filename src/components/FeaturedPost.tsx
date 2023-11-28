// import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import React from 'react';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

interface FeaturedPostProps {
  post: {
    date: string;
    description: string;
    image: string;
    extend:string
    imageLabel: string;
    title: string;
  };
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FeaturedPost(props: FeaturedPostProps) {
  const { post } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpenPost = () => {
    setOpen(true);
  };

  const handleClosePost = () => {
    setOpen(false);
  };

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#" onClick={handleClickOpenPost}>
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {/* {post.date} */}
              {Date().substring(4,15)}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.description}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={post.image}
            alt={post.imageLabel}
          />
        </Card>
      </CardActionArea>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClosePost}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{post.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {post.extend}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePost}>Close</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}