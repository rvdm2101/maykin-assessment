'use client';

import { useContext, useEffect, useState } from 'react';
import { HotelContext, TfetchHotelDataPaginatedResult } from '../Context/HotelContext';
import { HotelCard } from '../Components/HotelCard/HotelCard';
import { Pagination } from '../Components/Pagination';

const HomePage = () => {
  const [page, setPage] = useState<number>(1);
  const [result, setResult] = useState<TfetchHotelDataPaginatedResult>();
  const { fetchHotelDataPaginated } = useContext(HotelContext);

  useEffect(() => {
    fetchHotelDataPaginated(3, page - 1).then((results) => setResult(results));
  }, [page, fetchHotelDataPaginated]);

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
            onPaginationItemClick={(paginationNumber) => setPage(paginationNumber)}
          />
        </>
      ) : null}
    </div>
  );
};
export default HomePage;
