import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import SearchBar from './SearchBar'; // Import your SearchBar component

describe('SearchBar', () => {
    it('renders correctly', () => {
        render(<SearchBar/>);
        const inputElement = screen.getByPlaceholderText('Search for any movie you like!');
        expect(inputElement).toBeInTheDocument();
    });

    it('invokes HandleSearch callback on pressing Enter', () => {
        const handleSearchMock = jest.fn();
        render(<SearchBar handleSearch={handleSearchMock}/>);
        const inputElement = screen.getByPlaceholderText('Search for any movie you like!');

        fireEvent.change(inputElement, {target: {value: 'Spiderman'}});
        fireEvent.keyPress(inputElement, {key: 'Enter', code: 13, charCode: 13});

        expect(handleSearchMock).toHaveBeenCalledTimes(1);
        expect(handleSearchMock).toHaveBeenCalledWith('Spiderman');
    });

    it('invokes HandleSearch callback on Search button click', () => {
        const handleSearchMock = jest.fn();
        render(<SearchBar handleSearch={handleSearchMock}/>);
        const inputElement = screen.getByPlaceholderText('Search for any movie you like!');
        const searchButton = screen.getByText('Search');

        fireEvent.change(inputElement, {target: {value: 'Spiderman'}});
        fireEvent.click(searchButton);

        expect(handleSearchMock).toHaveBeenCalledTimes(1);
        expect(handleSearchMock).toHaveBeenCalledWith('Spiderman');
    });
});
