import {api} from '../apiCall.ts';

type ApiResponse = { userId: string; url: string };

export async function collectUrl(
  url: string,
  id: string
): Promise<ApiResponse> {
  const res = await api.get<ApiResponse>(`/collected`, {
    params: { url: url, id: id },
  });
  return res.data;
}
