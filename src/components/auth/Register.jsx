import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { insertToken } from '../../utils/userToken';
import { useUserRegisterMutation } from '../../redux/services/auth';
import { LoadingButton } from '@mui/lab';
import { HowToRegRounded, Visibility, VisibilityOff } from '@mui/icons-material';
import { TextField, Box, Avatar, Typography, Stack, useTheme, useMediaQuery, InputAdornment, IconButton } from '@mui/material';
import LogoImage from '../../assets/logo.jpg';
import '../../style/Forms.css';


export const Register = () => {
    const navigate = useNavigate();
    const fieldError = {};

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [registerUser, { data, error, isLoading }] = useUserRegisterMutation();

    const [passwordVisibility, setPasswordVisibility] = useState({
        password: false,
        confirmPassword: false,
    });


    const [formErrors, setFormErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });


    const handleTogglePasswordVisibility = (field) => {
        setPasswordVisibility((prevVisibility) => ({
            ...prevVisibility,
            [field]: !prevVisibility[field],
        }));
    };


    const changeHandler = event => {
        const { name, value } = event.target;

        if (name === 'name' && value && (value.length < 5 || value.length > 15)) {
            fieldError.name = 'Name must be between 5 and 15 characters.';
        }
        else if ((name === 'password' && value) || (name === 'confirmPassword' && value)) {
            if (value.length < 8 || value.length > 25) {
                fieldError[name] = `${name === 'confirmPassword' ? 'Confirm Password' : 'Password'} must be between 8 and 25 characters.`
            }
        }
        setFormErrors(fieldError);
    }


    const submitHandler = event => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.emailAddress.value;
        const password = event.target.password.value;
        const confirmPassword = event.target.confirmPassword.value;

        if (name && email && password && confirmPassword) {
            if (password !== confirmPassword) {
                fieldError.password = 'Passwords do not match. Please make sure your passwords match.'
                fieldError.confirmPassword = 'Passwords do not match. Please make sure your passwords match.'
            }
            else if (!email.match("^[a-zA-Z0-9._%+-]+@gmail\.com$")) {
                fieldError.email = 'The email address you entered does not appear to be a valid Gmail address.';
            }
            else if (Object.keys(fieldError).length === 0) {
                const userInfo = {
                    name,
                    email,
                    password,
                    confirmPassword,
                }

                registerUser(userInfo);
            }

        } else {
            setFormErrors({
                name: name ? '' : 'Name field is required.',
                email: email ? '' : 'Email Address field is required.',
                password: password ? '' : 'Password field is required.',
                confirmPassword: confirmPassword ? '' : 'Confirm Password field is required.',
            });
        }

        setFormErrors(fieldError);
    };


    useEffect(() => {
        if (data) {
            insertToken(data.token);
            navigate("/");

            toast.success(
                <div>
                    <p
                        style={{
                            color: '#593030',
                            fontWeight: 700
                        }}
                    >
                        🌟 Welcome  to <span style={{ color: '#ff3838', fontStyle: 'italic' }}>AniWeeab</span> 🌟
                    </p>
                    <p
                        style={{
                            color: '#593030',
                            fontWeight: 700
                        }}
                    >
                        🎉 Registration successfully Done!!
                    </p>
                </div>
                , { position: 'bottom-left' });
        } else if (error) {
            toast.error(
                <p
                    style={{
                        color: '#ff3838',
                        fontWeight: 700
                    }}
                >
                    <span style={{ color: '#593030' }}>Error:</span> {error.data.msg}
                </p>
                , { position: 'bottom-left' });
        }
    }, [data, error, navigate])


    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
            }}>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    top: "50px",
                    backgroundColor: '#eaddd1',
                    marginTop: "-50px",
                    borderRadius: "15px"
                }} >
                <Avatar
                    alt='logo_image'
                    src={LogoImage}
                    sx={{
                        width: '100px',
                        height: '100px',
                        borderBottomLeftRadius: "20px",
                        position: "relative",
                        left: "17px"
                    }}
                    variant='square'
                />
                <Typography
                    variant='h5'
                    sx={{
                        position: 'relative',
                        left: '-33px',
                        fontStyle: "italic",
                        fontSize: "25px",
                        color: "#FF3838",
                        letterSpacing: "1px"
                    }}
                ><Typography
                    variant='span'
                    sx={{
                        position: 'relative',
                        color: "#eaddd1"
                    }}>An</Typography>iWeeab</Typography>
            </Box>


            <Box
                sx={{
                    border: 2,
                    borderColor: "#ff3838",
                    borderRadius: "15px",
                    backgroundColor: "#eaddd1",
                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                    width: isSmallScreen ? '80%' : '40%',
                }}>

                <Typography
                    variant='h6'
                    textAlign='center'
                    marginTop='50px'
                    sx={{
                        color: "#ff3838"
                    }}>Registration</Typography>

                <Box
                    component='form'
                    onSubmit={submitHandler}
                    sx={{
                        margin: "10px 20px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column"
                    }}>

                    <Stack
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            width: "100%"
                        }}
                        spacing={3}>

                        <TextField
                            label='Name'
                            name='name'
                            className='formInput'
                            InputLabelProps={{ className: 'textfield__label' }}
                            fullWidth
                            required
                            onChange={changeHandler}
                            error={Boolean(formErrors['name'])}
                            helperText={formErrors['name']}
                        />
                        <TextField
                            label='Email Address'
                            name='emailAddress'
                            className='formInput'
                            InputLabelProps={{ className: 'textfield__label' }}
                            fullWidth
                            required
                            error={Boolean(formErrors['email'])}
                            helperText={formErrors['email']}
                        />
                        <TextField
                            label="Password"
                            name='password'
                            type={passwordVisibility.password ? "text" : "password"}
                            className='formInput browser'
                            required
                            fullWidth
                            onChange={changeHandler}
                            error={Boolean(formErrors['password'])}
                            helperText={formErrors['password']}
                            InputLabelProps={{ className: 'textfield__label' }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => { handleTogglePasswordVisibility('password') }} edge="end">
                                            {passwordVisibility.password ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            label="Confirm Password"
                            name='confirmPassword'
                            type={passwordVisibility.confirmPassword ? "text" : "password"}
                            className='formInput browser'
                            required
                            fullWidth
                            onChange={changeHandler}
                            error={Boolean(formErrors['confirmPassword'])}
                            helperText={formErrors['confirmPassword']}
                            InputLabelProps={{ className: 'textfield__label' }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => { handleTogglePasswordVisibility('confirmPassword') }} edge="end">
                                            {passwordVisibility.confirmPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <LoadingButton
                            loading={isLoading}
                            loadingPosition='center'
                            startIcon={<HowToRegRounded sx={{ visibility: isLoading ? 'hidden' : 'visible' }} />}
                            type="submit"
                            variant="contained"
                            className={isLoading ? "loadingBtn" : "btn"}
                            sx={{ width: "50%", fontWeight: '700' }}
                            disabled={isLoading}
                        >
                            <span className={isLoading ? 'disSpan' : ''}>Register</span>
                        </LoadingButton>
                    </Stack>


                    <Stack sx={{
                        borderTop: 2,
                        borderColor: "blue",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        marginTop: "20px",
                        borderColor: "#593030"
                    }}>

                        <Typography
                            variant="body1"
                            textAlign='center'
                            sx={{
                                position: "relative",
                                top: "-1px",
                                marginTop: "-13px",
                                backgroundColor: "#eaddd1",
                                padding: "0px 10px",
                                color: "#FF3838"
                            }}>
                            <strong>OR</strong>
                        </Typography>

                        <Typography
                            variant="body2"
                            textAlign='center'
                            marginTop='12px'
                            sx={{
                                color: "#593030",
                                fontWeight: "600"
                            }}>
                            Ready to dive back into the anime world? <Link to="/login" className='formLink'>Log in to your account now</Link> and continue your journey!
                        </Typography>
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}
