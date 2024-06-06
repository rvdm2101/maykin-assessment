'use client';

import { useCallback, useContext, useEffect, useState } from 'react';
import { HotelContext, TfetchHotelDataPaginatedResult } from '../Context/HotelContext';
import { HotelCard } from '../Components/HotelCard/HotelCard';
import { Pagination } from '../Components/Pagination';
import { useSearchParams } from 'next/navigation';

const HomePage = () => {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<TfetchHotelDataPaginatedResult>();
  const { fetchHotelDataPaginated } = useContext(HotelContext);
  const page = parseInt(searchParams.get('page') || '1');

  useEffect(() => {
    fetchHotelDataPaginated(3, page - 1).then((results) => setResult(results));
  }, [page, fetchHotelDataPaginated]);

  const updatePaginationPage = useCallback((newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', `${newPage}`);
    window.history.pushState(null, '', `?${params.toString()}`);
  }, []);

  return (
    <div>
      {result !== undefined ? (
        <>
          <ul className="list-unstyled row">
            {result.items.map((hotel, index) => (
              <li key={index} className="col-3 pb-4">
                <HotelCard hotel={hotel} />
              </li>
            ))}
          </ul>
          <Pagination
            page={page}
            lastPage={result.pages}
            onPaginationItemClick={updatePaginationPage}
          />
        </>
      ) : null}
    </div>
  );
};
export default HomePage;
