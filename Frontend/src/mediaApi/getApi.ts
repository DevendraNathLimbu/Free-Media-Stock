import axios from "axios";
import type { ApiResponse } from "../App.tsx";

type queryParams = {
    query: string;
    per_page: number;
}

const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const BASE_URL = "https://api.unsplash.com/";

export const getMediaApi: (params: queryParams) => Promise<ApiResponse> = async ({ query, per_page }) => {
    try{
        const response = await axios.get(`${BASE_URL}/search/photos`, {
        params: {
            query,
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