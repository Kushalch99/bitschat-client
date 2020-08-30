import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
//Mui Card
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import CommentIcon from '@material-ui/icons/Comment'
const styles = {
  scream: {
    marginBottom: 20
  },
  card: {
    display: 'flex'
  },
  image: {
    minWidth: 200
  },
  buttonGroup: {
    marginTop: 20,
    marginBottom: 0
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
}
class Scream extends Component {
  render() {
    dayjs.extend(relativeTime)
    const { classes, scream } = this.props
    //const classes = this.props.classes
    return (
      <div className={classes.scream}>
        <Card className={classes.card}>
          <CardMedia
            image={scream.user.profileImageUrl}
            title="Profile Image"
            className={classes.image}
          />
          <CardContent className={classes.content}>
            <Typography
              variant="h5"
              component={Link}
              to={`/users/${scream.user.handle}`}
              color="primary"
            >
              {scream.user.handle}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {dayjs(scream.createdAt).fromNow()}
            </Typography>
            <Typography variant="body1">{scream.body}</Typography>
            <ButtonGroup
              color="secondary"
              aria-label="outlined secondary button group"
              className={classes.buttonGroup}
            >
              <Button
                color="primary"
                variant="outlined"
                startIcon={<FavoriteBorderIcon />}
              >
                Like
              </Button>{' '}
              <Button
                color="primary"
                variant="outlined"
                startIcon={<CommentIcon />}
              >
                Comment
              </Button>{' '}
            </ButtonGroup>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default withStyles(styles)(Scream)
