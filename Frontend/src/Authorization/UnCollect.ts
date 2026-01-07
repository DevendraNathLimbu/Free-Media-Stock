import {api} from "../apiCall"

type cart = {
  userId: string,
   url: string,
  _id: string
}

type ApiResponse = { message: string , cart: cart};

 export async function unCollectUrl(
   url: string,
   id: string
 ): Promise<ApiResponse> {
   try{
     const res = await api.post<ApiResponse>(`/uncollected`, { url, id });
   console.log("Response from unCollectUrl API:", res.data);
   return res.data;
   }
   catch (error) {
     console.error("Error in unCollectUrl API:", error);
     throw error;
   }
 }
 