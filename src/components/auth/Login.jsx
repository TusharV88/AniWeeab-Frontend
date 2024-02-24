import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUserLoginMutation } from '../../redux/services/auth';
import { LoadingButton } from '@mui/lab';
import { LoginRounded, Visibility, VisibilityOff } from '@mui/icons-material';
import { TextField, Box, Avatar, Typography, Stack, useTheme, useMediaQuery, InputAdornment, IconButton } from '@mui/material';
import { insertToken } from '../../utils/userToken';
import { useDispatch, useSelector } from 'react-redux';
import { stopLoading } from '../../redux/slices/aniLoaderSlice';
import LogoImage from '../../assets/logo.jpg';
import '../../style/Forms.css';

export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const aniLoader = useSelector((state) => state.aniLoader);

    const [passwordVisibility, setPasswordVisibility] = useState({
        password: false,
    });

    const [loginUser, { data, error, isLoading }] = useUserLoginMutation();

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: ''
    });


    const handleTogglePasswordVisibility = (field) => {
        setPasswordVisibility((prevVisibility) => ({
            ...prevVisibility,
            [field]: !prevVisibility[field],
        }));
    };


    const submitHandler = event => {
        event.preventDefault();

        const email = event.target.emailAddress.value;
        const password = event.target.password.value;

        if (email && password) {
            const userInfo = {
                email,
                password
            }

            loginUser(userInfo);
        } else {
            setFormErrors({
                email: email ? '' : 'Email Address field is required.',
                password: password ? '' : 'Password field is required.',
            });
        }
    }


    useEffect(() => {
        if (aniLoader) {
            dispatch(stopLoading());
        }
    }, []);


    useEffect(() => {
        if (data) {
            insertToken(data.token);
            navigate("/");

            toast.success(
                <p
                    style={{
                        color: '#593030',
                        fontWeight: 700
                    }}
                >
                    🎉 Welcome back, <span style={{ color: '#ff3838' }}>{data.username}</span>. Let the adventures continue! 🌟
                </p>
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
    }, [data, error, navigate]);


    return (
        <>
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
                    }}>
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
                    >
                        <Typography
                            variant='span'
                            sx={{
                                position: 'relative',
                                color: "#eaddd1"
                            }}>
                            An
                        </Typography>
                        iWeeab
                    </Typography>
                </Box>


                <Box
                    sx={{
                        border: 2,
                        borderColor: "#ff3838",
                        borderRadius: "15px",
                        backgroundColor: "#eaddd1",
                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                        width: isSmallScreen ? '80%' : '40%'
                    }}>
                    <Typography
                        variant='h6'
                        textAlign='center'
                        marginTop='50px'
                        sx={{
                            color: "#ff3838"
                        }}>
                        Login
                    </Typography>

                    <Box
                        component="form"
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
                            spacing={3}
                        >

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
                                fullWidth
                                required
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

                            <Typography
                                variant='caption'
                                textAlign="center"
                                sx={{
                                    color: "#593030",
                                    fontWeight: "600"
                                }}>Lost your anime key? <Link to="/reset/link" className='formLink'>Reset your password</Link> and rediscover the adventure!</Typography>

                            <LoadingButton
                                loading={isLoading}
                                loadingPosition='center'
                                startIcon={<LoginRounded sx={{ visibility: isLoading ? 'hidden' : 'visible' }} />}
                                type="submit"
                                variant="contained"
                                className={isLoading ? "loadingBtn" : "btn"}
                                sx={{ width: "50%", fontWeight: '700' }}
                                disabled={isLoading}
                            >
                                <span className={isLoading ? 'disSpan' : ''}>Login</span>
                            </LoadingButton>
                        </Stack>


                        <Stack
                            sx={{
                                borderTop: 2,
                                borderColor: "blue",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                                marginTop: "20px",
                                borderColor: "#593030"
                            }}
                        >

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
                                Anime explorer without an account? Join the journey - <Link to="/register" className='formLink'>Register now</Link> and unlock the portal to endless adventures.
                            </Typography>

                        </Stack>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
