import React, {useState} from 'react';

const SearchBar = ({handleSearch}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(searchTerm);
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-lg-6">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search for any movie you like!"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleKeyPress} // Trigger search on Enter key press
                    />
                    <button
                        className="btn btn-primary btn-search"
                        onClick={() => handleSearch(searchTerm)} // Trigger search on button click
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
