import { Routes, Route, useLocation, useParams } from 'react-router-dom';
import { Register } from "./components/auth/Register";
import { Login } from './components/auth/Login';
import { ResetPassLink } from './components/auth/ResetPassLink';
import { ResetPassword } from './components/auth/ResetPassword';
import { UpdatePassword } from './components/auth/UpdatePassword';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './components/pages/HomePage';
import AnimePage from './components/pages/AnimePage';
import MangaPage from './components/pages/MangaPage';
import SearchPage from './components/pages/SearchPage';
import FavoritesPage from './components/pages/FavoritesPage';
import ReviewsPage from './components/pages/ReviewsPage';
import DetailPage from './components/pages/DetailPage';
import LogoutPage from './components/pages/LogoutPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import { useEffect } from 'react';
import { resetSeasonsNowAnimeMain } from './redux/slices/Anime/SeasonsNowMain/seasonsNowMainSlice';
import { decSeasonsAnimeMain } from './redux/slices/Anime/SeasonsNowMain/seasonsNowMainLimit';
import { resetSeasonsNowMangaMain } from './redux/slices/Manga/SeasonsNowMain/seasonsNowMainSlice';
import { decSeasonsMangaMain } from './redux/slices/Manga/SeasonsNowMain/seasonsNowMainLimit';
import { resetSeasonsNow } from './redux/slices/Home/SeasonsNow/seasonsNowSlice';
import { decSeasons } from './redux/slices/Home/SeasonsNow/seasonsLimitSlice';
import { resetPopularAnime } from './redux/slices/Home/Popular/popularAnimeSlice';
import { decPopular } from './redux/slices/Home/Popular/popularLimit';
import { resetPopularManga } from './redux/slices/Home/Popular/popularMangaSlice';
import { resetFavoriteAnime } from './redux/slices/Home/Favorite/FavoriteAnimeSlice';
import { resetFavoriteManga } from './redux/slices/Home/Favorite/FavoriteMangaSlice';
import { decFavorite } from './redux/slices/Home/Favorite/FavoriteLimit';
import { resetMediaDetail } from './redux/slices/MediaDetail/mediaDetailSlice';
import { decMediaDetail } from './redux/slices/MediaDetail/mediaDetailLimit';
import { resetMediaCharactersDetail } from './redux/slices/MediaDetail/mediaCharactersDetailSlice';
import { resetRecommendation } from './redux/slices/MediaDetail/recommendationSlice';
import { homeApi } from './redux/services/home';
import { animeApi } from './redux/services/anime';
import { mangaApi } from './redux/services/manga';
import { mediaDetailApi } from './redux/services/mediaDetail';
import { resetUserFavorite } from './redux/slices/userFavoriteSlice';
import { decUserFavorite } from './redux/slices/userFavoriteLimit';
import { favoriteApi } from './redux/services/favorite';
import { reviewApi } from './redux/services/review';
import { resetUserReview } from './redux/slices/userReviewSlice';
import { decUserReview } from './redux/slices/userReviewLimit';
import { searchMediaApi } from './redux/services/search';
import { resetMedia } from './redux/slices/mediaSlice';
import { decMedia } from './redux/slices/mediaLimit';
import DeleteAccountPage from './components/pages/DeleteAccountPage';
import NotFound from './components/common/NotFound';



export const App = () => {
  const { pathname } = useLocation();
  const { category, id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const aniLoader = useSelector((state) => state.aniLoader);

  // ----------------- Detail Page
  const mediaDetailData = useSelector((state) => state.mediaDetail);
  const mediaCharactersDetailData = useSelector((state) => state.mediaCharactersDetail);
  const recommendationsData = useSelector((state) => state.recommendations);
  const mediaDetailLimit = useSelector((state) => state.mediaDetailLimit);

  const mediaDetailStateLength = mediaDetailData.length;
  const mediaCharactersDetailStateLength = mediaCharactersDetailData.length;
  const recommendationStateLength = recommendationsData.length;


  function resetHomeStates() {
    dispatch(homeApi.util.resetApiState());

    dispatch(resetSeasonsNow());
    dispatch(decSeasons());

    dispatch(resetPopularAnime());
    dispatch(resetPopularManga());
    dispatch(decPopular());

    dispatch(resetFavoriteAnime());
    dispatch(resetFavoriteManga());
    dispatch(decFavorite());
  }

  function resetAnimeStates() {
    dispatch(animeApi.util.resetApiState());

    dispatch(resetSeasonsNowAnimeMain());
    dispatch(decSeasonsAnimeMain());
  }


  function resetMangaStates() {
    dispatch(mangaApi.util.resetApiState());

    dispatch(resetSeasonsNowMangaMain());
    dispatch(decSeasonsMangaMain());
  }


  function resetMediaDetailStates() {
    dispatch(mediaDetailApi.util.resetApiState());

    dispatch(resetMediaDetail());
    dispatch(decMediaDetail());

    dispatch(resetMediaCharactersDetail());
    dispatch(resetRecommendation());
  }


  function resetUserReviewStates() {
    dispatch(reviewApi.util.resetApiState());
    dispatch(resetUserReview());
    dispatch(decUserReview());
  }


  function resetMediaStates() {
    dispatch(resetMedia());
    dispatch(decMedia());
  }


  useEffect(() => {
    resetUserReviewStates();
    resetMediaStates();

    if (pathname === '/') {
      resetAnimeStates();
      resetMangaStates();
      resetMediaDetailStates();
    } else if (pathname === '/anime') {
      resetHomeStates();
      resetMangaStates();
      resetMediaDetailStates();
    } else if (pathname === '/manga') {
      resetHomeStates();
      resetAnimeStates();
      resetMediaDetailStates();
    } else {
      resetHomeStates();
      resetAnimeStates();
      resetMangaStates();
    }


    if (!pathname.startsWith('/details')) {
      resetMediaDetailStates();
      if (!pathname.startsWith('/favorites')) {
        dispatch(favoriteApi.util.resetApiState());
        dispatch(resetUserFavorite());

        dispatch(decUserFavorite());
      }
    } else {
      if (mediaDetailLimit === 1 && mediaDetailStateLength > 0 && mediaCharactersDetailStateLength > 0 && recommendationStateLength > 0) {
        if (id !== mediaDetailData[0].mal_id) {
          resetMediaDetailStates();
        }
      }
    }

    if (!pathname === '/search') {
      dispatch(searchMediaApi.util.resetApiState());
    }
  }, [pathname]);



  return (
    <>
      {user._id && !aniLoader ? <Navbar /> : null}
      <Routes>
        <Route
          path='/register'
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          } />
        <Route
          path='/login'
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          } />
        <Route
          path='/reset/link'
          element={
            <ProtectedRoute>
              <ResetPassLink />
            </ProtectedRoute>
          } />
        <Route
          path='/reset/:id/:token'
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          } />
        <Route
          path='/update/password'
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          } />
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
        <Route
          path='/anime'
          element={
            <ProtectedRoute>
              <AnimePage />
            </ProtectedRoute>
          } />
        <Route
          path='/manga'
          element={
            <ProtectedRoute>
              <MangaPage />
            </ProtectedRoute>
          } />
        <Route
          path='/search'
          element={
            <ProtectedRoute>
              <SearchPage />
            </ProtectedRoute>
          } />
        <Route
          path='/favorites'
          element={
            <ProtectedRoute>
              <FavoritesPage />
            </ProtectedRoute>
          } />
        <Route
          path='/reviews'
          element={
            <ProtectedRoute>
              <ReviewsPage />
            </ProtectedRoute>
          } />
        <Route
          path='/:category/:id'
          element={
            <ProtectedRoute>
              <DetailPage />
            </ProtectedRoute>
          } />
        <Route
          path='/logout'
          element={
            <ProtectedRoute>
              <LogoutPage />
            </ProtectedRoute>
          } />
        <Route
          path='/delete_account'
          element={
            <ProtectedRoute>
              <DeleteAccountPage />
            </ProtectedRoute>
          } />
        <Route
          path='*'
          element={
            <ProtectedRoute>
              <NotFound />
            </ProtectedRoute>
          } />
      </Routes>
      {user._id && !aniLoader ? <Footer /> : null}
    </>
  );
}
