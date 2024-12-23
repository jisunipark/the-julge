/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useMediaQuery } from 'react-responsive';
import Image from 'next/image';
import NotificationItem from '../notificationItem/NotificationItem';
import CloseIcon from '@/public/images/close.svg';
import { useAuth } from '@/contexts/AuthProvider';
import { getAlerts } from '@/lib/getAlerts';
import { AlertItems } from '@/types/alertsType';
import styles from './NotificationList.module.scss';

const cn = classNames.bind(styles);

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsActive: Dispatch<SetStateAction<boolean>>;
};

export default function NotificationList({ isOpen, setIsOpen, setIsActive }: Props) {
  const isMobile: boolean = useMediaQuery({
    query: '(max-width:743px)',
  });

  const closeNotification = () => {
    setIsOpen(false);
  };

  const { user } = useAuth();
  const [alerts, setAlerts] = useState<AlertItems[]>([]);

  useEffect(() => {
    getAlerts(user?.id).then(({ items }) => {
      setAlerts(items.filter(({ item }) => !item.read));
    });
    if (alerts.length) setIsActive(true);
  }, [isOpen]);

  if (!user) return;
  return (
    <div className={cn('wrap')}>
      <div className={cn('title')}>
        <h2>알림 {alerts.length}개</h2>
        {isMobile && isOpen && (
          <button type="button" onClick={closeNotification}>
            <Image src={CloseIcon} alt="창 닫기 아이콘" width={24} height={24} />
          </button>
        )}
      </div>
      <ul className={cn('list')}>
        {alerts.length ? (
          alerts?.map(({ item: { shop, notice, result, createdAt, id } }) => {
            const notificationItemProps = {
              name: shop.item.name,
              workhour: notice.item.workhour,
              startsAt: notice.item.startsAt,
              result,
              createdAt,
              id,
            };
            return (
              <li key={id}>
                <NotificationItem {...notificationItemProps} />
              </li>
            );
          })
        ) : (
          <div className={cn('noAlert')}>알림이 없습니다</div>
        )}
      </ul>
    </div>
  );
}
