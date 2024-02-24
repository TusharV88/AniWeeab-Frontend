import { Box, Button, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
import { useLazyUserDeleteAccountQuery } from '../../redux/services/auth';
import { toast } from 'react-toastify';
import { clearToken, getToken } from '../../utils/userToken';
import { useDispatch } from 'react-redux';
import { stopLoading } from '../../redux/slices/aniLoaderSlice';

const DeleteAccountPage = () => {
    const token = getToken();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [isLoading, setIsLoading] = useState(false);
    const [limit, setLimit] = useState(0);

    const [deleteTrigger, { error }] = useLazyUserDeleteAccountQuery();

    const deleteHandler = () => {
        setIsLoading(true);
    }


    useEffect(() => {
        dispatch(stopLoading());
    }, []);


    useEffect(() => {
        if (isLoading && limit === 0) {
            deleteTrigger(token)
                .unwrap()
                .then((fulfilled) => {
                    setLimit(1);
                    navigate('/login');
                    clearToken();
                    toast.success(
                        <p
                            style={{
                                color: '#593030',
                                fontWeight: 700
                            }}
                        >
                            {fulfilled.msg} <span style={{ color: '#ff3838' }}>{fulfilled.username}</span> 👋
                        </p>
                        , { position: 'bottom-left' });
                })
                .catch((rejected) => {
                    toast.error(
                        <div>
                            <p>Status Code: {rejected.data.statusCode}</p>
                            <p>Error: {rejected.data.msg}</p>
                        </div>
                    , { position: 'bottom-left' });
                });
        }
    }, [isLoading]);


    useEffect(() => {
        if (error) {
            setIsLoading(false);
            toast.error(error.data.msg, { position: 'bottom-left' });
        }
    }, [error]);


    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Stack border='1px solid #ff3838' borderRadius='5px' padding='10px' spacing={5} width={isSmallScreen ? '85%' : '60%'}>
                <Stack spacing={1} >
                    <Typography
                        variant={isSmallScreen ? 'h5' : 'h4'}
                        fontWeight={700}
                        color='#ff3838'
                    >
                        Delete My Account
                    </Typography>

                    <Box
                        sx={{
                            height: '2px',
                            backgroundColor: '#593030',
                            borderRadius: '10px'
                        }}
                    />
                </Stack>

                <Stack spacing={5} >
                    <Typography variant='body1' color='#593030'>
                        We're sorry to see you go. If you've made the decision to delete your account, please be aware that this action is permanent. By proceeding, all your account data, including your favorites and reviews, will be irreversibly deleted.
                    </Typography>

                    <Typography variant='body1' color='#593030'>
                        To continue with the deletion process, please click on the
                        <Typography variant='span' fontWeight={700} color='#ff3838'> Delete My Account </Typography>and if you have changed your mind you can click on <Typography variant='span' fontWeight={700}> Cancel Button</Typography>.
                    </Typography>

                    <Stack
                        direction='row'
                        spacing={3}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Button
                            size={isSmallScreen ? 'medium' : 'large'}
                            sx={{
                                backgroundColor: '#593030',
                                color: '#eaddd1 !important',
                                fontWeight: '700',
                                ':hover': {
                                    backgroundColor: '#281313'
                                }

                            }}
                            disabled={isLoading}
                            LinkComponent={Link}
                            to={'/'}
                        >
                            Cancel
                        </Button>

                        <LoadingButton
                            loading={isLoading}
                            disabled={isLoading}
                            onClick={deleteHandler}
                            size={isSmallScreen ? 'medium' : 'large'}
                            sx={{
                                backgroundColor: '#ff3838',
                                color: '#eaddd1',
                                fontWeight: '700',
                                ':hover': {
                                    backgroundColor: 'red'
                                },
                                '& span': {
                                    color: '#eaddd1'
                                }
                            }}
                        >
                            <span className={isLoading ? 'disSpan' : ''}>Delete My Account</span>
                        </LoadingButton>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    )
}

export default DeleteAccountPage;