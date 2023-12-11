import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import MoviesTable from './MoviesTable'; // Adjust the path to your component

describe('MoviesTable', () => {
    const movies = [
        {imdbID: '1', Title: 'Movie A', Year: 2020},
        {imdbID: '2', Title: 'Movie B', Year: 2019},
        {imdbID: '3', Title: 'Movie C', Year: 2021},
    ];

    it('renders table header with Title and Year columns', () => {
        const handleSortMock = jest.fn();
        render(<MoviesTable movies={movies} sortBy="Title" sortOrder="asc" handleSort={handleSortMock}/>);

        const titleColumn = screen.getByRole('columnheader', {name: /Title/i});
        const yearColumn = screen.getByRole('columnheader', {name: /Year/i});

        expect(titleColumn).toBeInTheDocument();
        expect(yearColumn).toBeInTheDocument();
    });

    it('handles sorting movies by Title when Title column header is clicked', () => {
        const handleSortMock = jest.fn();
        render(<MoviesTable movies={movies} sortBy="Title" sortOrder="asc" handleSort={handleSortMock}/>);

        const titleColumn = screen.getByRole('columnheader', {name: /Title/i});
        fireEvent.click(titleColumn);

        expect(handleSortMock).toHaveBeenCalledTimes(1);
        expect(handleSortMock).toHaveBeenCalledWith('Title');
    });

    it('handles sorting movies by Year when Year column header is clicked', () => {
        const handleSortMock = jest.fn();
        render(<MoviesTable movies={movies} sortBy="Year" sortOrder="asc" handleSort={handleSortMock}/>);

        const yearColumn = screen.getByRole('columnheader', {name: /Year/i});
        fireEvent.click(yearColumn);

        expect(handleSortMock).toHaveBeenCalledTimes(1);
        expect(handleSortMock).toHaveBeenCalledWith('Year');
    });

    it('renders movies in the table body', () => {
        render(<MoviesTable movies={movies} sortBy="Title" sortOrder="asc" handleSort={() => {
        }}/>);

        movies.forEach((movie) => {
            const movieTitle = screen.getByText(movie.Title);
            const movieYear = screen.getByText(movie.Year.toString());

            expect(movieTitle).toBeInTheDocument();
            expect(movieYear).toBeInTheDocument();
        });
    });
});
