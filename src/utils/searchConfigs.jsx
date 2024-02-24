import { ImportContactsRounded, TvRounded } from "@mui/icons-material";

const main = [
    {
        state: 'anime',
        display: 'Anime',
        icon: <TvRounded />
    },
    {
        state: 'manga',
        display: 'Manga',
        icon: <ImportContactsRounded />
    },
]

const animeType = [
    {
        state: 'tv',
        display: 'TV',
    },
    {
        state: 'movie',
        display: 'Movie',
    },
    {
        state: 'ova',
        display: 'OVA',
    },
    {
        state: 'special',
        display: 'Special',
    },
    {
        state: 'ona',
        display: 'ONA',
    },
    {
        state: 'music',
        display: 'Music',
    },
    {
        state: 'cm',
        display: 'CM',
    },
    {
        state: 'pv',
        display: 'PV',
    },
    {
        state: 'tv_special',
        display: 'TV Special',
    }
];


const mangaType = [
    {
        state: 'manga',
        display: 'Manga',
    },
    {
        state: 'novel',
        display: 'Novel',
    },
    {
        state: 'lightnovel',
        display: 'Light Novel',
    },
    {
        state: 'oneshot',
        display: 'Oneshot',
    },
    {
        state: 'doujin',
        display: 'Doujin',
    },
    {
        state: 'manhwa',
        display: 'Manhwa',
    },
    {
        state: 'manhua',
        display: 'Manhua'
    }
];

export const searchConfigs = { main, animeType, mangaType };