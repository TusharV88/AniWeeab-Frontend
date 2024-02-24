import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from '../services/auth.js';
import { homeApi } from '../services/home.js';
import userSlice from '../slices/userSlice.js';
import seasonsNowSlice from '../slices/Home/SeasonsNow/seasonsNowSlice.js';
import seasonsLimit from '../slices/Home/SeasonsNow/seasonsLimitSlice.js';
import popularAnimeSlice from '../slices/Home/Popular/popularAnimeSlice.js';
import popularMangaSlice from '../slices/Home/Popular/popularMangaSlice.js';
import popularLimit from '../slices/Home/Popular/popularLimit.js';
import favoriteAnimeSlice from '../slices/Home/Favorite/FavoriteAnimeSlice.js';
import favoriteMangaSlice from '../slices/Home/Favorite/FavoriteMangaSlice.js';
import favoriteLimit from '../slices/Home/Favorite/FavoriteLimit.js';
import { animeApi } from '../services/anime.js';
import seasonsNowAnimeMainSlice from '../slices/Anime/SeasonsNowMain/seasonsNowMainSlice.js';
import seasonsNowAnimeMainLimit from '../slices/Anime/SeasonsNowMain/seasonsNowMainLimit.js';
import mediaSlice from '../slices/mediaSlice.js';
import mediaLimit from '../slices/mediaLimit.js';
import { mangaApi } from '../services/manga.js';
import seasonsNowMangaMainSlice from '../slices/Manga/SeasonsNowMain/seasonsNowMainSlice.js';
import seasonsNowMangaMainLimit from '../slices/Manga/SeasonsNowMain/seasonsNowMainLimit.js';
import { mediaDetailApi } from '../services/mediaDetail.js';
import mediaDetailSlice  from '../../redux/slices/MediaDetail/mediaDetailSlice.js';
import mediaDetailLimit  from '../../redux/slices/MediaDetail/mediaDetailLimit.js';
import mediaCharactersDetailSlice  from '../../redux/slices/MediaDetail/mediaCharactersDetailSlice.js';
import recommendationSlice from '../../redux/slices/MediaDetail/recommendationSlice.js';
import { favoriteApi } from '../services/favorite.js';
import userFavoriteSlice from '../slices/userFavoriteSlice.js';
import userFavoriteLimit from '../slices/userFavoriteLimit.js';
import { reviewApi } from '../services/review.js';
import userReviewSlice from '../slices/userReviewSlice.js';
import userReviewLimit from '../slices/userReviewLimit.js';
import { searchMediaApi } from '../services/search.js';
import aniLoaderSlice from '../slices/aniLoaderSlice.js'


export const store = configureStore({
    reducer: {
        aniLoader: aniLoaderSlice,
        user: userSlice,
        userFavorites: userFavoriteSlice,
        userFavoritesLimit: userFavoriteLimit,
        userReviews: userReviewSlice,
        userReviewsLimit: userReviewLimit,
        seasonsNow: seasonsNowSlice,
        seasonsLimit: seasonsLimit,
        popularAnime: popularAnimeSlice,
        popularManga: popularMangaSlice,
        popularLimit: popularLimit,
        favoriteAnime: favoriteAnimeSlice,
        favoriteManga: favoriteMangaSlice,
        favoriteLimit: favoriteLimit,
        media: mediaSlice,
        mediaLimit: mediaLimit,
        animeSeasonsNowMain: seasonsNowAnimeMainSlice,
        animeSeasonsNowMainLimit: seasonsNowAnimeMainLimit,
        mangaSeasonsNowMain: seasonsNowMangaMainSlice,
        mangaSeasonsNowMainLimit: seasonsNowMangaMainLimit,
        mediaDetail: mediaDetailSlice,
        mediaDetailLimit: mediaDetailLimit,
        mediaCharactersDetail: mediaCharactersDetailSlice,
        recommendations: recommendationSlice,
        [authApi.reducerPath]: authApi.reducer,
        [homeApi.reducerPath]: homeApi.reducer,
        [animeApi.reducerPath]: animeApi.reducer,
        [mangaApi.reducerPath]: mangaApi.reducer,
        [mediaDetailApi.reducerPath]: mediaDetailApi.reducer,
        [favoriteApi.reducerPath]: favoriteApi.reducer,
        [reviewApi.reducerPath]: reviewApi.reducer,
        [searchMediaApi.reducerPath]: searchMediaApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, homeApi.middleware, animeApi.middleware, mangaApi.middleware, mediaDetailApi.middleware, favoriteApi.middleware, reviewApi.middleware, searchMediaApi.middleware),
});

setupListeners(store.dispatch);
