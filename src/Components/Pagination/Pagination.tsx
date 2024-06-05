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

  return (
    <BootstrapPagination.default>
      <BootstrapPagination.default.First
        disabled={page === 1}
        onClick={() => onPaginationItemClick(1)}
      />
      <BootstrapPagination.default.Prev
        disabled={page === 1}
        onClick={() => onPaginationItemClick(page - 1)}
      />
      {pages}
      <BootstrapPagination.default.Next
        disabled={page === lastPage}
        onClick={() => onPaginationItemClick(page + 1)}
      />
      <BootstrapPagination.default.Last
        disabled={page === lastPage}
        onClick={() => onPaginationItemClick(lastPage)}
      />
    </BootstrapPagination.default>
  );
};
