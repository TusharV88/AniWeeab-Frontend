import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useUserResetPassLinkMutation } from '../../redux/services/auth';
import { SendRounded } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { TextField, Box, Avatar, Typography, Stack, useTheme, useMediaQuery } from '@mui/material';
import LogoImage from '../../assets/logo.jpg';
import '../../style/Forms.css';

export const ResetPassLink = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [resetLink, { data, error, isLoading }] = useUserResetPassLinkMutation();

    const [formErrors, setFormErrors] = useState({
        email: ''
    });


    const submitHandler = event => {
        event.preventDefault();
        const email = event.target.emailAddress.value;

        if (email) {
            resetLink(email);
        } else {
            setFormErrors({
                email: 'Email field is required.'
            });
        }
    }


    useEffect(() => {
        if (data) {
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
    }, [data, error]);


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


                <Box
                    sx={{
                        border: 2,
                        borderColor: "#ff3838",
                        borderRadius: "15px",
                        backgroundColor: "#eaddd1",
                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                        width: isSmallScreen ? '80%' : '40%',
                    }}
                >

                    <Typography
                        variant='h6'
                        textAlign='center'
                        marginTop='50px'
                        sx={{
                            color: "#ff3838"
                        }}
                    >
                        Reset Password Link
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

                        <Stack sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            width: "100%"
                        }} spacing={3}>

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


                            <LoadingButton
                                loading={isLoading}
                                loadingPosition='center'
                                startIcon={<SendRounded sx={{ visibility: isLoading ? 'hidden' : 'visible' }} />}
                                type="submit"
                                variant="contained"
                                className={isLoading ? "loadingBtn" : "btn"}
                                sx={{ width: "50%", fontWeight: '700' }}
                                disabled={isLoading}
                            >
                                <span className={isLoading ? 'disSpan' : ''}>Send</span>
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
                                Thinking twice about resetting your password? No worries! Hit the link below to head back to the <Link to="/login" className='formLink'>Login page</Link>.
                            </Typography>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

