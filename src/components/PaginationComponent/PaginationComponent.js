import React, {useState} from 'react';
import './PaginationComponent.css'

const PaginationComponent = ({totalPages, onPageChange}) => {
    const [currentPage, setCurrentPage] = useState(1); // State to store total pages

    const handlePageChange = (page) => {
        onPageChange(page);
    };

    const handleMoveNext = () => {
        let nextPage = currentPage + 1;
        if (nextPage <= totalPages) {
            setCurrentPage(nextPage);
            renderPageNumbers();
            handlePageChange(nextPage);
        }
    };

    const handleMovePrev = () => {
        let prevPage = currentPage - 1;
        if (prevPage >= 1) {
            setCurrentPage(prevPage);
            renderPageNumbers();
            handlePageChange(prevPage);
        }
    };
    const renderPageNumbers = () => {
        const pages = [];

        const maxPagesToShow = 5; // Number of pages to display
        const middlePage = Math.ceil(maxPagesToShow / 2);
        let startPage = currentPage - middlePage + 1;
        if (startPage < 1) {
            startPage = 1;
        }
        let endPage = startPage + maxPagesToShow - 1;
        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = endPage - maxPagesToShow + 1;
            if (startPage < 1) {
                startPage = 1;
            }
        }

        for (let page = 1; page <= totalPages; page++) {
            if (page === 1 || page === totalPages || (page >= startPage && page <= endPage)) {
                pages.push(
                    <button
                        key={page}
                        className={`btn ${currentPage === page ? 'btn-primary btn-page-selected' : 'btn-outline-primary btn-page'}`}
                        onClick={() => {
                            setCurrentPage(page)
                            renderPageNumbers()
                            handlePageChange(page)
                        }}
                    >
                        {page}
                    </button>
                );
            }
        }
        return pages;
    };

    return (
        <div className="d-flex justify-content-center mt-4">
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item">
                        <button className="page-link" onClick={() => {
                            handleMovePrev()
                        }}
                        >&laquo;</button>
                    </li>
                    {renderPageNumbers()}
                    <li className="page-item">
                        <button className="page-link" onClick={() => {
                            handleMoveNext()
                        }}>&raquo;</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default PaginationComponent;
