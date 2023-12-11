import React, {useState} from 'react';
import Header from "../../components/Header/Header";
import './MoviesSearchPage.css'
import MovieService from "../../services/MovieService";
import MoviesTable from './../../components/MoviesTable/MoviesTable';
import SearchBar from "../../components/SearchBar/SearchBar";

import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";

const MovieSearchPage = () => {
    const [movies, setMovies] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [totalPages, setTotalPages] = useState(0); // State to store total pages
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async (searchTerm) => {
        setSearchTerm(searchTerm);
        const page = 1;
        const data = await MovieService.searchMoviesByTitle(page, searchTerm);
        setMovies(data.data);
        if (data && data.total_pages) {
            setTotalPages(data.total_pages);
        } else {
            setTotalPages(0);
        }
    };

    const handlePageChange = async (page) => {
        const data = await MovieService.searchMoviesByTitle(page, searchTerm);
        setMovies(data.data);
    };


    const handleSort = (sortKey) => {
        if (sortKey === sortBy) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(sortKey);
            setSortOrder('asc');
        }
    };

    return (
        <div>
            <Header/>
            <div className="container mt-4">
                <SearchBar handleSearch={handleSearch}/>

                {movies.length > 0 && (
                    <MoviesTable
                        movies={movies}
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                        handleSort={handleSort}
                    />
                )}

                {totalPages > 0 && movies.length > 0 && (
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <PaginationComponent totalPages={totalPages} onPageChange={handlePageChange}/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieSearchPage;
