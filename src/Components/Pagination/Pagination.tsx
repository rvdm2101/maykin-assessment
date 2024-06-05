import * as BootstrapPagination from 'react-bootstrap/Pagination';

interface IPagination {
  page: number;
  lastPage: number;
  onPaginationItemClick: (paginationNumber: number) => void;
}

export const Pagination = ({ page, lastPage, onPaginationItemClick }: IPagination) => {
  const pages = [];
  for (let number = 1; number <= lastPage; number++) {
    pages.push(
      <BootstrapPagination.default.Item
        key={number}
        active={number === page}
        onClick={() => onPaginationItemClick(number)}>
        {number}
      </BootstrapPagination.default.Item>
    );
  }

  return <BootstrapPagination.default>{pages}</BootstrapPagination.default>;
};
