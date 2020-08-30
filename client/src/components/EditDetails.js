import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'

//redux
import { connect } from 'react-redux'
import { editUserDetails } from '../redux/actions/userActions'

//icons
import EditIcon from '@material-ui/icons/Edit'

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
    marginTop: 15,
    marginLeft: 120
  }
})

class EditDetails extends Component {
  state = {
    bio: '',
    open: false
  }

  componentDidMount() {
    const { userDetails } = this.props
    this.setUserDetails(userDetails)
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
    this.setUserDetails(this.props.userDetails)
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio
    }
    this.props.editUserDetails(userDetails)
    this.handleClose()
  }

  setUserDetails = (userDetails) => {
    this.setState({
      bio: userDetails.bio ? userDetails.bio : ''
    })
  }
  render() {
    const { classes } = this.props
    return (
      <Fragment>
        <Tooltip title="Edit Details" placement="right">
          <Button
            onClick={this.handleOpen}
            className={classes.editButton}
            color="primary"
            variant="outlined"
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit your Bio</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                type="text"
                label="Bio"
                multiline
                rows="1"
                placeholder="A short bio about yourself"
                className={classes.textField}
                value={this.state.bio}
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
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (store) => ({
  userDetails: store.user.userDetails
})

export default connect(mapStateToProps, { editUserDetails })(
  withStyles(styles)(EditDetails)
)
