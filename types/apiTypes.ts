export type Category = '한식' | '중식' | '일식' | '양식' | '분식' | '카페' | '편의점' | '기타';

export type Address =
  | '서울시 종로구'
  | '서울시 중구'
  | '서울시 용산구'
  | '서울시 성동구'
  | '서울시 광진구'
  | '서울시 동대문구'
  | '서울시 중랑구'
  | '서울시 성북구'
  | '서울시 강북구'
  | '서울시 도봉구'
  | '서울시 노원구'
  | '서울시 은평구'
  | '서울시 서대문구'
  | '서울시 마포구'
  | '서울시 양천구'
  | '서울시 강서구'
  | '서울시 구로구'
  | '서울시 금천구'
  | '서울시 영등포구'
  | '서울시 동작구'
  | '서울시 관악구'
  | '서울시 서초구'
  | '서울시 강남구'
  | '서울시 송파구'
  | '서울시 강동구'
  | '선택';

export type UpdateUser = {
  name: string;
  phone: string;
  address: Address;
  bio: string;
};

export type User = {
  id: string;
  email: string;
  type: 'employer' | 'employee';
  name?: string;
  phone?: string;
  address?: Address;
  bio?: string;
  shop?: Shop;
};

export type Shop = {
  id?: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
};

export type AuthContextType = {
  user: User | null;
  shop: Shop | null;
  isPending: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateMe: (formData: UpdateUser) => Promise<void>;
  registerShop: (FormData: Shop) => Promise<void>;
  updateShop: (formData: Shop) => Promise<void>;
};

export type Signin = {
  item: {
    token: string;
    user: {
      item: User;
      href: string;
    };
  };
  links: [];
};

type UserApplicationStatus = {
  id: string;
  status: 'pending' | 'accepted' | 'rejected' | 'canceled';
  createdAt: string;
};

type Notice = {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
};

type Item = {
  id: string;
  hourlyPay: number;
  description: string;
  startsAt: string;
  workhour: number;
  closed: boolean;
};

export type NoticeDetail = {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
  shop: {
    item: Shop;
    href: string;
  };
  currentUserApplication: {
    item: UserApplicationStatus;
  };
};

type Application = {
  item: {
    id: string;
    status: 'pending' | 'accepted' | 'rejected' | 'canceled';
    createdAt: string;
    user: {
      item: User;
      href: string;
    };
    shop: {
      item: Shop;
      href: string;
    };
    notice: {
      item: Notice;
      href: string;
    };
  };
  links: [];
};

type UserApplication = {
  item: {
    id: string;
    status: 'pending' | 'accepted' | 'rejected' | 'canceled';
    createdAt: string;
    shop: {
      item: Shop;
      href: string;
    };
    notice: {
      item: Item;
    };
  };
  links: [];
};

export type ApplicationList = Application[];
export type UserApplicationList = UserApplication[];
