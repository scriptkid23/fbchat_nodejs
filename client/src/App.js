import React from 'react';
import {Container,Avatar,Button,CssBaseline,TextField,FormControlLabel,Checkbox,Link,Grid,Box,Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/Facebook';
import {connect} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import {userActions} from './redux-thunk/actions/actions.user';
import Paper from '@material-ui/core/Paper';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        HoanDo.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

class SignIn extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(){
    const data = {
      email :    this.myEmail.value,
      password: this.myPassword.value,
      pin :      this.myPin.value,
    }
    this.props.submit(data);
   
  }
  renderAlert(){
    if(this.props.alert === "USER_REQUEST_MAKE_BOTCHAT"){
      return (<CircularProgress/>);
    }
    if(this.props.alert === "MAKE_BOTCHAT_FAILURE"){
      return (<Paper>
        <Typography variant="h5" component="h3" style={{textAlign:'center'}}>
            MAKE BOTCHAT FAILURE
        </Typography>
      </Paper>)
    }
    if(this.props.alert === "MAKE_BOTCHAT_SUCCESS"){
      return (<Paper>
        <Typography variant="h5" component="h3" style={{textAlign:'center',color:'primary'}}>
            MAKE BOTCHAT SUCCESS
        </Typography>
      </Paper>)
    }
  }
render(){
  console.log(this.props.alert)
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Make a Botchat
        </Typography>
        <form noValidate>
          <TextField
            inputRef={(e) => {this.myEmail = e}}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            ref = "email"
          />
          <TextField
            inputRef={(e) => {this.myPassword = e}}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            inputRef={(e) => {this.myPin = e}}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Pin code"
            label="Pin"
            type="number"
            id="pin"
            autoComplete="current-pin"
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
          
            onClick = {this.handleSubmit}
          >
            Confirm
          </Button>
          {this.renderAlert()}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
}
const mapStateToProps = (state) => {
  return{alert :state.alert}
}
const creatorActions = {
  submit : userActions.submit,
}
const connectSignInPage = connect(mapStateToProps,creatorActions)(SignIn);
export {connectSignInPage as SignIn};