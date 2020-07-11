import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//MUI
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { logoutUser } from '../redux/actions/userActions'

export class Navbar extends Component {
    handleLogout = (event) => {
        this.props.logoutUser()
        window.location.href = '/login'
    }
    render() {
        const { user: { authenticated }} = this.props
        return (
            <AppBar>
                <Toolbar className="nav-container">
                { !authenticated &&  <Button color="inherit" component={Link} to="/login" variant="outlined">Login</Button> }
                &nbsp;&nbsp;
                <Button color="inherit" component={Link} to="/" variant="outlined">Home</Button>
                &nbsp;&nbsp;
                { !authenticated && <Button color="inherit" component={Link} to="/signup" variant="outlined">Signup</Button> }
                &nbsp;&nbsp;
                { authenticated && <Button color="inherit" onClick={this.handleLogout} variant="outlined">Logout</Button> }
                </Toolbar>
            </AppBar>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps,{ logoutUser })(Navbar)
