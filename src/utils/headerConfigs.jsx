import { DeleteOutlineRounded, FavoriteBorderRounded, Logout, Password, ReviewsOutlined } from "@mui/icons-material";

const main = [
    {
        state: 'home',
        path: '/',
        letters: [{ id: 1, letter: 'H' }, { id: 2, letter: 'O' }, { id: 3, letter: 'M' }, { id: 4, letter: 'E' }]
    },
    {
        state: 'anime',
        path: '/anime',
        letters: [{ id: 1, letter: 'A' }, { id: 2, letter: 'N' }, { id: 3, letter: 'I' }, { id: 4, letter: 'M' }, { id: 5, letter: 'E' }]
    },
    {
        state: 'manga',
        path: '/manga',
        letters: [{ id: 1, letter: 'M' }, { id: 2, letter: 'A' }, { id: 3, letter: 'N' }, { id: 4, letter: 'G' }, { id: 5, letter: 'A' }]
    },
    {
        state: 'search',
        path: '/search',
        letters: [{ id: 1, letter: 'S' }, { id: 2, letter: 'E' }, { id: 3, letter: 'A' }, { id: 4, letter: 'R' }, { id: 5, letter: 'C' }, { id: 6, letter: 'H' }]
    }
]


const user = [
    {
        display: 'Favorites',
        state: 'favorites',
        path: '/favorites',
        icon: <FavoriteBorderRounded fontSize='small' sx={{ color: "#ff3838" }} />
    },
    {
        display: 'Reviews',
        state: 'reviews',
        path: '/reviews',
        icon: <ReviewsOutlined fontSize='small' sx={{ color: "#ff3838" }} />
    },
    {
        display: 'Update Password',
        state: 'updatePassword',
        path: '/update/password',
        icon: <Password fontSize='small' sx={{ color: "#ff3838" }} />
    },
    {
        display: 'Logout',
        state: 'logout',
        path: '/logout',
        icon: <Logout fontSize='small' sx={{ color: "#ff3838" }} />
    },
    {
        display: 'Delete My Account',
        state: 'deleteUserAccount',
        path: '/delete_account',
        icon: <DeleteOutlineRounded fontSize='small' sx={{ color: "#ff3838" }} />,
    }
]


export const headerConfigs = { main, user };