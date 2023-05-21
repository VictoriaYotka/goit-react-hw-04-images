const BASE_URL = 'https://pixabay.com/api';
const KEY = '34916651-f99371deeade2de9e176e6ceb';
const image_type = 'photo';
const orientation = 'horizontal';
const per_page = '12';

export default function searchImages (query, page) {
    return fetch(`${BASE_URL}/?key=${KEY}&q=${query}&image_type=${image_type}&orientation=${orientation}&page=${page}&per_page=${per_page}`)
    .then(res => {
        if(!res.ok) {
            throw new Error('Oops, something went wrong =(')
        }
        return res.json()
    })
}
