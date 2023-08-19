import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';


export async function fetchPhoto(q, page) {
        const searchParams = new URLSearchParams({
        key: '38896914-6f1d45dc8333692d1d560c965',
        q: q,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: page,
        per_page: 40
        });
    
        const response = await axios.get(`${BASE_URL}?${searchParams}`);
        const data = await response.data;
        return data
}
        
