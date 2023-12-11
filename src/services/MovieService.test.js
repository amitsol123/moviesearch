import axios from 'axios';
import MovieService from './MovieService';

jest.mock('axios');

describe('MovieService', () => {
    let consoleErrorSpy;

    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {
        });
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    it('fetches movies based on title and page number', async () => {
        const mockedResponse = {
            page: 1,
            per_page: 10,
            total: 3,
            total_pages: 1,
            data: [
                {Title: 'Movie A', Year: 2020, imdbID: '1'},
                {Title: 'Movie B', Year: 2021, imdbID: '2'},
                {Title: 'Movie C', Year: 2019, imdbID: '3'},
            ],
        };

        // axios.get.mockResolvedValueOnce({ data: mockedResponse });
        jest.spyOn(axios, 'get').mockResolvedValueOnce({data: mockedResponse});
        const title = 'Spiderman';
        const page = 2;

        const result = await MovieService.searchMoviesByTitle(page, title);

        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(
            `https://jsonmock.hackerrank.com/api/movies/search/?page=${page}&Title=${title}`
        );

        expect(result.data).toEqual(mockedResponse.data);
    });

    it('handles errors when fetching movies', async () => {
        const errorMessage = 'Network Error';
        const axiosGetSpy = jest.spyOn(axios, 'get');

        axiosGetSpy.mockRejectedValueOnce(new Error(errorMessage));

        const title = 'Spiderman';
        const page = 2;

        const result = await MovieService.searchMoviesByTitle(page, title);

        expect(axiosGetSpy).toHaveBeenCalledTimes(1);
        expect(axiosGetSpy).toHaveBeenCalledWith(
            `https://jsonmock.hackerrank.com/api/movies/search/?page=${page}&Title=${title}`
        );

        expect(result).toBeNull();

        axiosGetSpy.mockRestore();
    });
});
