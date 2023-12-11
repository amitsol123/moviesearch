import axios from 'axios';

const MovieService = {
    async searchMoviesByTitle(page, title) {
        try {
            const response = await axios.get(`https://jsonmock.hackerrank.com/api/movies/search/?page=${page}&Title=${title}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching movies:', error);
            return null;
        }
    },
};

export default MovieService;