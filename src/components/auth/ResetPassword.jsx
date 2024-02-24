import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserResetPasswordMutation } from '../../redux/services/auth';
import { LoadingButton } from '@mui/lab';
import { RotateLeftRounded, Visibility, VisibilityOff } from '@mui/icons-material';
import { TextField, Box, Avatar, Typography, Stack, useTheme, useMediaQuery, InputAdornment, IconButton } from '@mui/material';
import LogoImage from '../../assets/logo.jpg';
import '../../style/Forms.css';


export const ResetPassword = () => {
    const navigate = useNavigate();
    const { id, token } = useParams();
    const fieldErrors = {};
    
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [passwordVisibility, setPasswordVisibility] = useState({
        password: false,
        confirmPassword: false
    });

    const [formErrors, setFormErrors] = useState({
        password: '',
        confirmPassword: '',
    });

    const [resetPassword, { data, error, isLoading }] = useUserResetPasswordMutation();


    const handleTogglePasswordVisibility = (field) => {
        setPasswordVisibility((prevVisibility) => ({
            ...prevVisibility,
            [field]: !prevVisibility[field],
        }));
    };


    const changeHandler = event => {
        const { name, value } = event.target;

        if ((name === 'password' && value) || (name === 'confirmPassword' && value)) {
            if (value.length < 8 || value.length > 25) {
                fieldErrors[name] = `${name === 'confirmPassword' ? 'Confirm Password' : 'Password'} must be between 8 and 25 characters.`
            }
        }

        setFormErrors(fieldErrors);
    };

    const submitHandler = event => {
        event.preventDefault();
        const password = event.target.password.value;
        const confirmPassword = event.target.confirmPassword.value;

        if (password && confirmPassword) {
            if (password !== confirmPassword) {
                fieldErrors.password = 'Passwords do not match. Please make sure your passwords match.';
                fieldErrors.confirmPassword = 'Passwords do not match. Please make sure your passwords match.';
            } else {
                resetPassword({ id, token, password, confirmPassword });
            }

        } else {
            setFormErrors({
                password: 'Password field is required.',
                confirmPassword: 'Confirm Password field is required.',
            });
        }

        setFormErrors(fieldErrors);
    };


    useEffect(() => {
        if (data) {
            navigate("/login");

            toast.success(
                <p
                    style={{
                        color: '#593030',
                        fontWeight: 700
                    }}
                >
                    {data.msg}
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

    // console.log("Box Width: ", boxWidth);

    return (
        <>
            <Box sx={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
            }}>

                <Box sx={{
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


                <Box sx={{
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
                        }}>Reset Password</Typography>

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

                        <Stack sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            width: "100%"
                        }} spacing={3}>

                            <TextField
                                label="New Password"
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
                                label="Confirm New Password"
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
                                startIcon={<RotateLeftRounded sx={{ visibility: isLoading ? 'hidden' : 'visible' }} />}
                                type="submit"
                                variant="contained"
                                className={isLoading ? "loadingBtn" : "btn"}
                                sx={{ width: "50%", fontWeight: '700' }}
                                disabled={isLoading}
                            >
                                <span>Reset</span>
                            </LoadingButton>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

