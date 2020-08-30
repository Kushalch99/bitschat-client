import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'

//redux
import { connect } from 'react-redux'
import { postScream } from '../redux/actions/screamActions'

//icons
import AddIcon from '@material-ui/icons/Add'

//dialog
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

const styles = (theme) => ({
  ...theme.globalStyle,
  editButton: {
    marginTop: 30,
    marginLeft: 120
  }
})

class CreateScream extends Component {
  state = {
    scream: '',
    open: false
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleOpen = () => {
    this.setState({
      open: true
    })
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  handleSubmit = () => {
    if (this.state.scream === '') return
    const scream = this.state.scream
    this.props.postScream(scream)
    this.handleClose()
  }

  render() {
    const { classes } = this.props
    return (
      <Fragment>
        <Tooltip title="Create New Scream" placement="right">
          <Button
            onClick={this.handleOpen}
            className={classes.editButton}
            color="primary"
            variant="contained"
            startIcon={<AddIcon />}
          >
            New Scream
          </Button>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Create a new scream</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="scream"
                type="text"
                variant="outlined"
                multiline
                rows="4"
                placeholder="Write whatever's on your mind"
                className={classes.textField}
                value={this.state.scream}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Post
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

CreateScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

export default connect(null, { postScream })(withStyles(styles)(CreateScream))
