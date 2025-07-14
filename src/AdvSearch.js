import React from 'react';
import './AdvSearch.css'; 

// Functional component for the Advanced Search section
const AdvSearch = ({ onChange, onSearch }) => {
    return (
        <div className="advsearch-container">
            {/* Heading for the Advanced Search section */}
            <h2 className="advsearch-heading">Show Advanced Search</h2>
            
            {/* Form for the Advanced Search with input fields and a search button */}
            <div className="advsearch-form">
                {/* Input for property type */}
                <input type="text" placeholder="Type" onChange={e => onChange('type', e.target.value)} />
                
                {/* Input for number of bedrooms */}
                <input type="number" placeholder="Bedrooms" onChange={e => onChange('bedrooms', e.target.value)} />
                
                {/* Input for maximum price */}
                <input type="number" placeholder="Maximum Price" onChange={e => onChange('price', e.target.value)} />
                
                {/* Input for added date */}
                <input type="date" placeholder="Added Date" onChange={e => onChange('added', e.target.value)} />
                
                {/* Input for location (postcode) */}
                <input type="text" placeholder="Postcode" onChange={e => onChange('location', e.target.value)} />
                
                {/* Button to trigger the search action */}
                <button onClick={onSearch} className="searchButton">Search</button>
            </div>
        </div>
    );
};

export default AdvSearch;
