import { Notices, Sort } from '@/types/noticesType';
import instance from './axiosInstance';

export const getNotices = async (
  offset = 0,
  limit: number,
  keyword?: string,
  address?: string[],
  startsAtGte?: string,
  hourlyPayGte?: number,
  sort?: string
): Promise<Notices> => {
  const keywordQuery = keyword ? `&keyword=${keyword}` : '';
  const addressQueryArray = address?.map((add) => `&address=${add}`).join('');
  const addressQuery = address ? addressQueryArray : '';
  const startsAtGteQuery = startsAtGte ? `&startsAtGte=${startsAtGte}` : '';
  const hourlyPayGteQuery = hourlyPayGte ? `&hourlyPayGte=${hourlyPayGte}` : '';
  const sortQuery = sort ? `&sort=${sort}` : '';

  const query = `?offset=${offset}&limit=${limit}${keywordQuery}${addressQuery}${startsAtGteQuery}${hourlyPayGteQuery}${sortQuery}`;

  const res = await instance.get(`notices${query}`);

  return res.data;
};
