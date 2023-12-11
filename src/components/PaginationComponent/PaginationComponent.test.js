import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import PaginationComponent from './PaginationComponent'; // Adjust the path to your component

describe('PaginationComponent', () => {
    it('renders buttons for each page out of 5', () => {
        const totalPages = 5;
        const onPageChangeMock = jest.fn();
        render(<PaginationComponent totalPages={totalPages} onPageChange={onPageChangeMock}/>);
        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBe(totalPages + 2); // Total buttons: page buttons + 2 for previous and next buttons
    });

    it('renders buttons for each page out of 15', () => {
        const totalPages = 15;
        const onPageChangeMock = jest.fn();
        render(<PaginationComponent totalPages={totalPages} onPageChange={onPageChangeMock}/>);
        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBe(8); // Total buttons: page buttons + 2 for previous and next buttons
    });

    it('handles pagination correctly for 15 pages', () => {
        const totalPages = 15;
        const onPageChangeMock = jest.fn();
        render(<PaginationComponent totalPages={totalPages} onPageChange={onPageChangeMock}/>);

        const nextButton = screen.getByText('»');
        const prevButton = screen.getByText('«');

        // Click next button multiple times and verify onPageChange calls with correct page numbers
        for (let i = 2; i <= totalPages; i++) {
            fireEvent.click(nextButton);
            expect(onPageChangeMock).toHaveBeenCalledTimes(i - 1);
            expect(onPageChangeMock).toHaveBeenCalledWith(i);
        }

        // Click previous button multiple times and verify onPageChange calls with correct page numbers
        for (let i = totalPages - 1; i >= 1; i--) {
            fireEvent.click(prevButton);
            expect(onPageChangeMock).toHaveBeenCalledTimes(totalPages + totalPages - i - 1);
            expect(onPageChangeMock).toHaveBeenCalledWith(i);
        }
    });
});
