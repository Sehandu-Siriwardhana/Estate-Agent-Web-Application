// Import React library and styles for the Header component
import React from 'react';
import './Header.css';

// Import the logo image for the header
import logo from './Logo/Logo.png';

// Functional component for the site header
const Header = ({ onBasicSearch, toggleAdvSearch }) => {
    return (
        // Header container with site branding and search functionality
        <header className="siteHeader">
            {/* Logo and site title */}
            <div className="logo">
                <img src={logo} alt="Buy Prop Logo" />
                <h1>DreamDwellDeals</h1>
            </div>

            {/* Basic search input container */}
            <div className="searchContainer">
                <input
                    type="text"
                    className="searchInput"
                    placeholder="Search by type..."
                    onChange={e => onBasicSearch(e.target.value)}
                />
            </div>

            {/* Advanced search button container */}
            <div className="advSearch">
                <button className='advButton' onClick={toggleAdvSearch}>Show Advanced Search</button>
            </div>
        </header>
    );
}

// Export the Header component for use in the application
export default Header;
