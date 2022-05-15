import React from "react";
import {TextField,Grid,Paper,Typography,Link,} from "@material-ui/core";
import './index.scss';
import {SubmitButton,CustomSnackbar} from '../../components/export'
import {get,post} from '../../util/HttpRequest'
import AppConfig from '../../util/AppConfig.js';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password:"", openAlert:false, alertMessage: ""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({ username: event.state.username, password: event.state.password });
    }

    handleSubmit(event) {
        event.preventDefault();
        //login implementations
        post(AppConfig.getAPI('getToken'),{eid: this.state.username, password: this.state.password},{'Content-Type': 'application/json'}).then(resp =>{
            if(resp != undefined && resp.code === 0){
                AppConfig.setToken(resp.data.access_token);
                AppConfig.setRefreshToken(resp.data.refresh_token);
                AppConfig.setUserRight(resp.data.user_right);
                const AuthStr = 'Bearer '.concat(resp.data.access_token); 
                this.handleUserInfo(AuthStr);
                this.props.history.push("/dashboard");
            }else if(resp != undefined && resp.code === 1){
                this.setState({alertMessage: resp.message, openAlert : true});
            }
            else{
                this.setState({alertMessage: "server connection error", openAlert : true});
            }
        })    
    }

    handleUserInfo(AuthStr) {
        get(AppConfig.getAPI('user'),{Authorization: AuthStr}).then(resp => {
            if(resp != undefined && resp.code === 0){      
                console.log("users name: "+resp.data.first_name);         
                AppConfig.setUserName(resp.data.first_name);
            }
        }); 
    }

    render() {
        return (
        <div>
            <CustomSnackbar 
                type='error' 
                message={this.state.alertMessage}
                open={this.state.openAlert}
                onClose={
                    () => this.setState({openAlert : false})
                }/>
            <Grid container spacing={0} justify="center" direction="row">
                <Grid item>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    spacing={2}
                    className="login-form"
                >
                <Paper
                    variant="elevation"
                    elevation={2}
                    className="login-background"
                >
                    <Grid item>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                    </Grid>
                    <Grid item>
                        <form onSubmit={this.handleSubmit}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item>
                                <TextField
                                    type="username"
                                    placeholder="Username"
                                    fullWidth
                                    name="username"
                                    variant="outlined"
                                    value={this.state.username}
                                    onChange={(event) =>
                                        this.setState({
                                            [event.target.name]: event.target.value,
                                        })
                                    }
                                    required
                                    autoFocus
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    type="password"
                                    placeholder="Password"
                                    fullWidth
                                    name="password"
                                    variant="outlined"
                                    value={this.state.password}
                                    onChange={(event) =>
                                    this.setState({
                                        [event.target.name]: event.target.value,
                                        })
                                    }
                                    required
                                />
                            </Grid>
                            <Grid item>
                                <SubmitButton title="Submit" type="submit" fullWidth="true"/>
                            </Grid>
                        </Grid>
                        </form>
                    </Grid>
                    <Grid item>
                        <Link href="#" variant="body2">
                            Forgot Password?
                        </Link>
                    </Grid>
                </Paper>
                </Grid>
                </Grid>
            </Grid>
        </div>
        );
        }
}
export default Login;