import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import Scream from '../components/Scream'
import Profile from '../components/Profile'
import CreateScream from '../components/CreateScream'
export class home extends Component {
  state = {
    screams: null
  }
  componentDidMount() {
    axios
      .get('/scream/all')
      .then((res) => {
        this.setState({
          screams: res.data
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  render() {
    let recentScreamsMarkUp = this.state.screams ? (
      this.state.screams.map((scream) => (
        <Scream key={scream.id} scream={scream} />
      ))
    ) : (
      <p>Loading...</p>
    )
    return (
      <Grid container spacing={6}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkUp}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
          <CreateScream />
        </Grid>
      </Grid>
    )
  }
}

export default home
