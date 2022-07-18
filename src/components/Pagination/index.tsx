import classNames from 'classnames';
export interface IPaginationProps {
  page: number;
  onPageChange: (page: number) => void;
  pageSize: number;
}
export default function Pagination({ page, onPageChange, pageSize }: IPaginationProps) {
  const handlePageChange = (pageCurrent: number) => {
    if (pageCurrent === page) return;
    onPageChange(pageCurrent);
  };
  const handlePagePrevious = () => {
    if (page === 1) return;
    onPageChange(page - 1);
  };
  const handlePageNext = () => {
    if (page === pageSize) return;
    onPageChange(page + 1);
  };
  return (
    <nav>
      <ul className="inline-flex items-center -space-x-px">
        <li className={classNames('cursor-pointer select-none rounded-l-lg',
          page === 1 ? 'bg-gray-300 text-gray-400' : 'bg-white'
          )} onClick={handlePagePrevious}>
          <div className="block py-2 px-3 ml-0 leading-tight  rounded-l-lg border border-gray-300 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span className="sr-only">Trang trước</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </li>

        {Array.from({ length: pageSize }).map((pageNumber, index) => (
          <li className={classNames('cursor-pointer select-none',
          index+1 === page ? 'bg-gray-300 text-gray-900' : 'bg-white'
          )} key={index} onClick={() => handlePageChange(index + 1)}>
            <div className="font-medium py-2 px-3 leading-tight text-gray-500  border border-gray-300 hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              {index + 1}
            </div>
          </li>
        ))}

        <li className={classNames('cursor-pointer select-none rounded-r-lg',
          page === pageSize ? 'bg-gray-300 text-gray-400' : 'bg-white'
          )} onClick={handlePageNext}>
          <div className="block py-2 px-3 leading-tight rounded-r-lg  border border-gray-300 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span className="sr-only">Trang sau</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </li>
      </ul>
    </nav>
  );
}
