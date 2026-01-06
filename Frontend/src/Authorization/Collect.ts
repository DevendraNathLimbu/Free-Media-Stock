import {api} from '../apiCall.ts';

type cart = {
  userId: string,
   url: string,
  _id: string
}

type ApiResponse = { message: string , cart: cart};

export async function collectUrl(
  url: string,
  id: string
): Promise<ApiResponse> {
  try{
    const res = await api.post<ApiResponse>(`/collected`, { url, id });
  console.log("Response from collectUrl API:", res.data);
  return res.data;
  }
  catch (error) {
    console.error("Error in collectUrl API:", error);
    throw error;
  }
}
