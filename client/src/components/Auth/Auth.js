import React, {useState} from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@mui/material';
import { GoogleLogin } from 'react-google-login';
import useStyles from './styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input';
import Icon from './Icon';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};

function Auth() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [showPassword, setshowPassword]= useState(false);
    const [formData, setFormData] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);
    const navigate = useNavigate();

    const handleShowPassword = () => setshowPassword( (prevPassword) => !prevPassword ) ;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(isSignup) {
            dispatch(signup( formData, navigate));
        }
        else{
            dispatch(signin( formData, navigate));
        }
    }

    const handleChange = (e) => {
        setFormData( { ...formData, [e.target.name]: e.target.value });
    }

    const switchMode = () => {
        console.log(isSignup);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setshowPassword(false);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj; // ?. operator doesnt give an error if res doesnt exist, if we use just . operator, it gives error - cannot get property profileObj of undefined
        const token = res?.tokenId;
        try {
            dispatch({ type: 'AUTH', data: { result, token } });

            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }
    const googleFailure= (error) => {
        console.log(error);
        console.log("Google Sign In was unsuccessful. Try again later");
    }

    return (
       <Container component="main" maxWidth="xs">
           <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        {
                            isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
                        }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>{ isSignup ? 'Sign Up' : 'Sign In' }</Button>
                    <GoogleLogin 
                        clientId="70071999591-43elnkr821qbocmr3d1gdfrebv5anpmu.apps.googleusercontent.com"
                        render={ (renderProps) => (
                            <Button 
                            className={classes.googleButton} 
                            fullWidth 
                            onClick={renderProps.onClick} 
                            disabled={renderProps.disabled} 
                            startIcon={<Icon />} 
                            variant="contained"
                            color="primary"
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={"single_host_origin"}
                    />
                    <Grid>
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup ? 'Already have an account? Sign In' : 'Dont have an account? Sign Up'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
           </Paper>
       </Container>
    )
}

export default Auth
