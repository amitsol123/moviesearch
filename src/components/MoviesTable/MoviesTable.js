import React from 'react';
import './MoviesTable.css'

const MoviesTable = ({movies, sortBy, sortOrder, handleSort}) => {
    const sortedMovies = [...movies].sort((a, b) => {
        if (sortBy === 'Title') {
            return sortOrder === 'asc' ? a.Title.localeCompare(b.Title) : b.Title.localeCompare(a.Title);
        } else if (sortBy === 'Year') {
            return sortOrder === 'asc' ? a.Year - b.Year : b.Year - a.Year;
        }
        return 0;
    });

    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover mt-4 table-bordered table-custom">
                <thead className="table-header">
                <tr>
                    <th onClick={() => handleSort('Title')} style={{cursor: 'pointer'}}>
                        Title {sortBy === 'Title' && (sortOrder === 'asc' ? '▲' : '▼')}
                    </th>
                    <th onClick={() => handleSort('Year')} style={{cursor: 'pointer'}}>
                        Year {sortBy === 'Year' && (sortOrder === 'asc' ? '▲' : '▼')}
                    </th>
                </tr>
                </thead>
                <tbody>
                {sortedMovies.map((movie) => (
                    <tr key={movie.imdbID}>
                        <td>{movie.Title}</td>
                        <td>{movie.Year}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default MoviesTable;
