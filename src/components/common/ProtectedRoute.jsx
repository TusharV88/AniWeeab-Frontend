import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { clearToken, getToken, insertToken } from "../../utils/userToken";
import { useDispatch, useSelector } from "react-redux";
import { authApi, useLazyUserLoggedQuery } from "../../redux/services/auth";
import { initUser, resetUserState } from "../../redux/slices/userSlice";
import { resetSeasonsNow } from "../../redux/slices/Home/SeasonsNow/seasonsNowSlice";
import { decSeasons } from "../../redux/slices/Home/SeasonsNow/seasonsLimitSlice";
import { decPopular } from "../../redux/slices/Home/Popular/popularLimit";
import { resetPopularAnime } from "../../redux/slices/Home/Popular/popularAnimeSlice";
import { resetPopularManga } from "../../redux/slices/Home/Popular/popularMangaSlice";
import { resetFavoriteAnime } from "../../redux/slices/Home/Favorite/FavoriteAnimeSlice";
import { resetFavoriteManga } from "../../redux/slices/Home/Favorite/FavoriteMangaSlice";
import { decFavorite } from "../../redux/slices/Home/Favorite/FavoriteLimit";
import { resetSeasonsNowAnimeMain } from "../../redux/slices/Anime/SeasonsNowMain/seasonsNowMainSlice";
import { decSeasonsAnimeMain } from "../../redux/slices/Anime/SeasonsNowMain/seasonsNowMainLimit";
import { resetSeasonsNowMangaMain } from "../../redux/slices/Manga/SeasonsNowMain/seasonsNowMainSlice";
import { decSeasonsMangaMain } from "../../redux/slices/Manga/SeasonsNowMain/seasonsNowMainLimit";
import { resetMediaDetail } from "../../redux/slices/MediaDetail/mediaDetailSlice";
import { decMediaDetail } from "../../redux/slices/MediaDetail/mediaDetailLimit";
import { resetMediaCharactersDetail } from "../../redux/slices/MediaDetail/mediaCharactersDetailSlice";
import { resetRecommendation } from "../../redux/slices/MediaDetail/recommendationSlice";
import { homeApi } from "../../redux/services/home";
import { animeApi } from "../../redux/services/anime";
import { mangaApi } from "../../redux/services/manga";
import { mediaDetailApi } from "../../redux/services/mediaDetail";
import { favoriteApi } from "../../redux/services/favorite";
import { resetUserFavorite } from "../../redux/slices/userFavoriteSlice";
import { decUserFavorite } from "../../redux/slices/userFavoriteLimit";
import { resetUserReview } from "../../redux/slices/userReviewSlice";
import { decUserReview } from "../../redux/slices/userReviewLimit";
import { reviewApi } from "../../redux/services/review";
import { searchMediaApi } from "../../redux/services/search";
import { resetMedia } from "../../redux/slices/mediaSlice";
import { decMedia } from "../../redux/slices/mediaLimit";
import AniLoader from "./AniLoader";
import { startLoading, stopLoading } from "../../redux/slices/aniLoaderSlice";


const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const token = getToken('token');
    const { pathname } = useLocation();
    const user = useSelector((state) => state.user);
    const aniLoader = useSelector((state) => state.aniLoader);
    const userStateLength = Object.keys(user).length;

    const [loggedTrigger, { data, error }, loggedFinalTrigger] = useLazyUserLoggedQuery();


    // ----------------------------- Auth Checker ----------------------------------- \\
    useEffect(() => {
        if (pathname === '/login' || pathname === '/register' || pathname.startsWith('/reset')) {
            if (token) {
                dispatch(startLoading());
                setIsLoading(true);
                loggedTrigger(token)
                    .unwrap()
                    .then((fulfilled) => {
                        dispatch(initUser(fulfilled.user));
                        insertToken(fulfilled.token);
                        if (userStateLength > 0) {
                            navigate("/");
                            setIsLoading(false);
                        }
                    })
                    .catch((rejected) => {
                        if (rejected.data.statusCode === 404) {
                            clearToken();
                            dispatch(stopLoading());
                            setIsLoading(false);
                        }
                    });
            } else {
                if (aniLoader) {
                    dispatch(stopLoading());
                }

                if (isLoading) {
                    setIsLoading(false);
                }
                dispatch(resetUserState());
            }
        } else {
            if (token) {
                dispatch(startLoading());
                setIsLoading(true);
                loggedTrigger(token)
                    .unwrap()
                    .then((fulfilled) => {
                        dispatch(initUser(fulfilled.user));
                        if (pathname !== '/logout') {
                            insertToken(fulfilled.token);
                        } else {
                            // ------------- reset api
                            dispatch(authApi.util.resetApiState());
                            dispatch(homeApi.util.resetApiState());
                            dispatch(animeApi.util.resetApiState());
                            dispatch(mangaApi.util.resetApiState());
                            dispatch(mediaDetailApi.util.resetApiState());
                            dispatch(favoriteApi.util.resetApiState());
                            dispatch(reviewApi.util.resetApiState());
                            dispatch(searchMediaApi.util.resetApiState());

                            // ------------ User Favorites
                            dispatch(resetUserFavorite());
                            dispatch(decUserFavorite());


                            // ------------ User Reviews
                            dispatch(resetUserReview());
                            dispatch(decUserReview());


                            // ------------ Home Page
                            dispatch(resetSeasonsNow());
                            dispatch(resetPopularAnime());
                            dispatch(resetPopularManga());
                            dispatch(resetFavoriteAnime());
                            dispatch(resetFavoriteManga());

                            dispatch(decSeasons());
                            dispatch(decPopular());
                            dispatch(decFavorite());

                            // ------------ Media
                            dispatch(resetMedia());
                            dispatch(decMedia());

                            // ------------ Anime Page
                            dispatch(resetSeasonsNowAnimeMain());
                            dispatch(decSeasonsAnimeMain());

                            // ------------ Manga Page
                            dispatch(resetSeasonsNowMangaMain());
                            dispatch(decSeasonsMangaMain());

                            // ------------ Detail Page
                            dispatch(resetMediaDetail());
                            dispatch(resetMediaCharactersDetail());
                            dispatch(resetRecommendation());

                            dispatch(decMediaDetail());
                        }
                        if (userStateLength > 0) {
                            setIsLoading(false);
                        }
                    })
                    .catch((rejected) => {
                        if (rejected.data.statusCode === 404) {
                            clearToken();
                        }
                        navigate("/login");
                    });
            } else {
                dispatch(resetUserState());
                if (userStateLength === 0) {
                    navigate("/login");
                }
            }
        }
    }, [token, data, error, pathname, dispatch, navigate]);


    return (
        <>
            {isLoading ? (
                <AniLoader />
            ) : (
                children
            )}
        </>
    );
}

export default ProtectedRoute;