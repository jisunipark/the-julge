import { Sort } from '@/types/noticesType';

export const initailFilter = {
  address: [],
  startsAtGte: '',
  hourlyPayGte: 0,
};

export const SORT = [
  { id: 'time', name: '마감임박순' },
  { id: 'pay', name: '시급많은순' },
  { id: 'hour', name: '시간적은순' },
  { id: 'shop', name: '가나다순' },
];

export const ADDRESS = [
  '서울시 강남구',
  '서울시 강동구',
  '서울시 강북구',
  '서울시 강서구',
  '서울시 관악구',
  '서울시 광진구',
  '서울시 구로구',
  '서울시 금천구',
  '서울시 노원구',
  '서울시 도봉구',
  '서울시 동대문구',
  '서울시 동작구',
  '서울시 마포구',
  '서울시 서대문구',
  '서울시 서초구',
  '서울시 성동구',
  '서울시 성북구',
  '서울시 송파구',
  '서울시 양천구',
  '서울시 영등포구',
  '서울시 용산구',
  '서울시 은평구',
  '서울시 종로구',
  '서울시 중구',
  '서울시 중랑구',
];
