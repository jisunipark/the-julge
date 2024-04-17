import { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames/bind';

import { Filter } from '@/types/noticesType';

import styles from './AddressBadge.module.scss';

const cn = classNames.bind(styles);

type Props = {
  text: string;
  setFilter: Dispatch<SetStateAction<Filter>>;
};

export default function AddressBadge({ text, setFilter }: Props) {
  const handleDeleteAddress = (e: any) => {
    setFilter((prev) => ({
      ...prev,
      address: prev.address?.filter((value) => value !== e.target.value),
    }));
  };

  return (
    <button className={cn('button')} value={text} onClick={(e) => handleDeleteAddress(e)}>
      {text}
      <span className={cn('closeIcon')}>선택 취소</span>
    </button>
  );
}
