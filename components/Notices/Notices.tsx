/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import SortDropBox from './sortDropBox/SortDropBox';
import FilterDropBoxShell from './filterDropBox/filterDropBoxShell/FilterDropBoxShell';
import Pagenation from '../shopNoticePage/pagenation/Pagenation';
import NoticeCardList from '../noticeList/noticeCardList/NoticeCardList';
import Loading from '../common/loading/Loading';

import { getNotices } from '@/lib/getNotices';
import { initailFilter, SORT } from '@/lib/NoticesConstants';
import { Filter, NoticeList } from '@/types/noticesType';

import styles from './Notices.module.scss';

const cn = classNames.bind(styles);

type Props = {
  keyword?: string;
};

export default function Notices({ keyword }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  // 보여 줄 데이터 저장
  const [noticeList, setNoticeList] = useState<NoticeList>();

  // 상세필터
  const [filter, setFilter] = useState<Filter>(initailFilter);
  // 정렬
  const initailSort = SORT[0];
  const [sort, setSort] = useState(initailSort);
  // 페이지네이션
  const [count, setCount] = useState(0);

  const LIMIT_PER_SINGLE_PAGE = 6; // 한 페이지에 보여줄 데이터의 개수
  const LIMIT_PER_PAGE_GROUP = 5; // 한 번에 보여줄 페이지 번호의 개수

  useEffect(() => {
    try {
      getNotices(0, LIMIT_PER_SINGLE_PAGE, keyword).then(({ count, items }) => {
        setCount(count);
        setNoticeList(items);
      });
    } finally {
      setSort(initailSort);
      setFilter(initailFilter);
      setIsLoading(false);
    }
  }, [keyword]);

  if (isLoading) return <Loading />;

  // 상세 필터를 적용하면, 키워드는 유지되지만, 정렬, 페이지네이션은 초기화!
  // 시간 포맷을 RFC3339로 바꾸는 것도 아직 미적용해서 시간을 보낼 경우 오류가 남.
  const handleFilterButtonClick = async () => {
    const { address, startsAtGte, hourlyPayGte } = filter;
    const res = await getNotices(
      0,
      LIMIT_PER_SINGLE_PAGE,
      keyword,
      address,
      startsAtGte,
      hourlyPayGte
    );
    const { count, items } = res;

    setCount(count);
    setNoticeList(items);
    setSort(initailSort);
  };

  // 정렬하면, 저장된 검색어와 상세필터를 유지한 채 API 요청, 페이지네이션은 초기화
  // todo: 이벤트 타입 설정
  const handleSortButtonClick = async (e: any) => {
    const sortId = e.target.value;
    const sortName = e.target.innerText;
    setSort({ id: sortId, name: sortName });

    const { address, startsAtGte, hourlyPayGte } = filter;

    const res = await getNotices(
      0,
      LIMIT_PER_SINGLE_PAGE,
      keyword,
      address,
      startsAtGte,
      hourlyPayGte,
      sortId
    );
    const { count, items } = res;

    setCount(count);
    setNoticeList(items);
  };

  // 페이지네이션
  const handleChangeData = async (pageNumber: number) => {
    const offset = (pageNumber - 1) * LIMIT_PER_SINGLE_PAGE;
    const { address, startsAtGte, hourlyPayGte } = filter;
    const res = await getNotices(
      offset,
      LIMIT_PER_SINGLE_PAGE,
      keyword,
      address,
      startsAtGte,
      hourlyPayGte,
      sort.id
    );
    const { count, items } = res;

    setCount(count);
    setNoticeList(items);
  };

  if (!noticeList) return;

  return (
    <section className={cn('wrap')}>
      <div className={cn('title')}>
        {keyword ? (
          <h2>
            <span>{keyword}</span>에 대한 공고 목록
          </h2>
        ) : (
          <h2>전체 공고</h2>
        )}
        <div className={cn('controls')}>
          <SortDropBox
            list={SORT}
            selectedItem={sort}
            handleSortButtonClick={handleSortButtonClick}
          />
          <FilterDropBoxShell
            countValue={filter.address}
            setFilter={setFilter}
            handleFilterButtonClick={handleFilterButtonClick}
          >
            <div className={cn('address')}>
              <FilterDropBoxShell.FilterTitle text="위치" />
              <FilterDropBoxShell.AddressBox filter={filter} setFilter={setFilter} />
              {filter.address?.length !== 0 && (
                <FilterDropBoxShell.SelectedAddress
                  address={filter.address}
                  setFilter={setFilter}
                />
              )}
            </div>
            <div className={cn('line')}></div>
            <div className={cn('startsAt')}>
              <FilterDropBoxShell.FilterTitle text="시작일" />
              <FilterDropBoxShell.StartsAtInput
                startsAtGte={filter.startsAtGte}
                setFilter={setFilter}
              />
            </div>
            <div className={cn('line')}></div>
            <div className={cn('hourlyPay')}>
              <FilterDropBoxShell.FilterTitle text="금액" />
              <FilterDropBoxShell.HourlyPayInput
                hourlyPayGte={filter.hourlyPayGte}
                setFilter={setFilter}
              />
            </div>
          </FilterDropBoxShell>
        </div>
      </div>
      {noticeList.length ? (
        <NoticeCardList noticeList={noticeList} />
      ) : (
        <div className={cn('noResult')}>검색 결과가 없습니다</div>
      )}
      <Pagenation
        numberOfTotalData={count}
        limitPerSinglePage={LIMIT_PER_SINGLE_PAGE}
        limitPerPageGroup={LIMIT_PER_PAGE_GROUP}
        dependency={sort.id}
        handleChangeData={handleChangeData}
      />
    </section>
  );
}
