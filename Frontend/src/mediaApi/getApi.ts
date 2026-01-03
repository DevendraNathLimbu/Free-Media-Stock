import axios from "axios";
import type { ApiResponse } from "../App.tsx";
import type { ApiGifResponse } from "../App.tsx";

type queryParams = {
    query: string;
    page: number;
    per_page: number;
}

const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const BASE_URL = "https://api.unsplash.com/";

export const getMediaApi: (params: queryParams) => Promise<ApiResponse> = async ({ query, page, per_page }) => {
    try{
        const response = await axios.get(`${BASE_URL}/search/photos`, {
        params: {
            query,
            page,
            per_page
    },
    headers: {
        Authorization: `Client-ID ${API_KEY}`
    }
});
    
     const data: ApiResponse = response.data;
return data;
   }
   catch (error) {
    console.error("Error fetching media:", error);
    throw error;
   }
}

type gifQueryParams = {
    query: string;
    limit: number;
}

export const getGifApi: (params: gifQueryParams) => Promise<ApiGifResponse> = async ({query, limit}) => {
    const TENOR_API_KEY = import.meta.env.VITE_TENOR_API_KEY;
    const TENOR_BASE_URL = "https://tenor.googleapis.com/v2/search";
    try {
        const response = await axios.get(TENOR_BASE_URL, {
            params: {
                q: query,
                key: TENOR_API_KEY,
                limit: limit
            }
        });
        const data: ApiGifResponse = response.data;
        return data;
    } catch (error) {
        console.error("Error fetching GIFs:", error);
        throw error;
    }
};