import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import MoviesSearchPage from './MoviesSearchPage';
import MovieService from '../../services/MovieService';
import {MemoryRouter} from "react-router-dom";

jest.mock('../../services/MovieService');

describe('MoviesSearchPage', () => {
    it('fetches movies and displays search results', async () => {
        const mockedMovies = [{Title: 'Movie A', Year: 2020, imdbID: '1'}, {
            Title: 'Movie B',
            Year: 2021,
            imdbID: '2'
        },];

        MovieService.searchMoviesByTitle.mockResolvedValueOnce({
            data: mockedMovies, total_pages: 2, // Assuming there are more pages
        });

        render(<MemoryRouter> {/* Wrap your component with MemoryRouter */}
            <MoviesSearchPage/>
        </MemoryRouter>);

        const searchInput = screen.getByPlaceholderText('Search for any movie you like!');
        fireEvent.change(searchInput, {target: {value: 'Spiderman'}});

        const searchButton = screen.getByText('Search');
        fireEvent.click(searchButton);

        await waitFor(() => {
            expect(MovieService.searchMoviesByTitle).toHaveBeenCalledTimes(1);
            // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
            expect(MovieService.searchMoviesByTitle).toHaveBeenCalledWith(1, 'Spiderman');
        });

        const movieA = await screen.findByText('Movie A');
        const movieB = await screen.findByText('Movie B');

        expect(movieA).toBeInTheDocument();
        expect(movieB).toBeInTheDocument();
    });

    it('does not display PaginationComponent and empty table when no search is made', async () => {
        render(<MemoryRouter>
            <MoviesSearchPage/>
        </MemoryRouter>);

        const paginationComponent = screen.queryByTestId('pagination-component');
        const emptyTable = screen.queryByTestId('empty-table');

        expect(paginationComponent).not.toBeInTheDocument();
        expect(emptyTable).not.toBeInTheDocument();
    });

    it('does not display PaginationComponent and empty table when search result is null', async () => {
        MovieService.searchMoviesByTitle.mockResolvedValueOnce(null);

        render(<MemoryRouter>
            <MoviesSearchPage/>
        </MemoryRouter>);

        const paginationComponent = screen.queryByTestId('pagination-component');
        const emptyTable = screen.queryByTestId('empty-table');

        expect(paginationComponent).not.toBeInTheDocument();
        expect(emptyTable).not.toBeInTheDocument();
    });
});
