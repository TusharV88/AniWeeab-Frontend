import { BookOutlined, DeleteOutline, FavoriteBorder, HomeOutlined, LiveTvOutlined, Logout, Password, ReviewsOutlined, Search } from "@mui/icons-material";


const main = [
    {
        display: "Home",
        path: "/",
        state: "home",
        icon: <HomeOutlined />
    },
    {
        display: "Anime",
        path: "/anime",
        state: "anime",
        icon: <LiveTvOutlined />
    },
    {
        display: "Manga",
        path: "/manga",
        state: "manga",
        icon: <BookOutlined />
    },
    {
        display: "Search",
        path: "/search",
        state: "search",
        icon: <Search />
    }
]


const user = [
    {
        display: "Favourites",
        path: "/favorites",
        state: "favourites",
        icon: <FavoriteBorder />
    },
    {
        display: "Reviews",
        path: "/reviews",
        state: "reviews",
        icon: <ReviewsOutlined />
    },
    {
        display: "Update Password",
        path: "/update/password",
        state: "updatePassword",
        icon: <Password />
    },
    {
        display: "Logout",
        path: "/logout",
        state: "logout",
        icon: <Logout />
    },
    {
        display: "Delete My Account",
        path: "/delete_account",
        state: "deleteUserAccount",
        icon: <DeleteOutline />
    }
]


export const drawerConfigs = { main, user };