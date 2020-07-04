import React,{Component} from 'react'
import './App.css'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider }from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import Navbar from './components/Navbar'
import styles from './utils/theme'
import jwtDecode from 'jwt-decode'
import AuthRoute from './utils/AuthRoute'
//pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'

const theme = createMuiTheme(styles)
let authenticated;
const token = localStorage.FBIdToken
if(token){
  const decodedToken = jwtDecode(token)
  if(decodedToken.exp * 1000 < Date.now()){
    window.location.href = '/login'
    authenticated = false
  }else{
    authenticated = true
  }
}
class App extends Component {
  render(){
    return (
     <MuiThemeProvider theme={theme}>
        <div className="App">
        <Router>
          <div className="container">
            <Navbar />
            <Switch>
              <Route exact path="/" component={home}/>
              <AuthRoute exact path="/login" component={login}  authenticated = {authenticated}/>
              <AuthRoute exact path="/signup" component={signup} authenticated = {authenticated}/>
            </Switch>
          </div>
        </Router>
      </div>
     </MuiThemeProvider>
    );
  }
}

export default App;
