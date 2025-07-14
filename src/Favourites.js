// Import React library and styles for the Favourites component
import React, { useState } from 'react';
import './Favourites.css';

// Import FontAwesome icons for UI elements
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

// Functional component for displaying favorite properties
const Favourites = ({ onDrop, favourites, onRemoveItem, onDragStartFavorite, onRemoveItemAll }) => {

    // State for search input (not used in the current implementation)
    const [search] = useState('');

    // Filter the favorite properties based on type and price
    const favFilter = favourites.filter(property => 
        property.type.toLowerCase().includes(search.toLowerCase()) ||
        property.price.toString().includes(search)
    );

  return (
    // Container for displaying favorite properties with drag and drop functionality
    <div className="favourites" onDrop={onDrop} onDragOver={(e) => e.preventDefault()}>
      {/* Heading for the Favorites section */}
      <h2>Favourites</h2>

      {/* Button to remove all favorite items */}
      <div>
        <button onClick={onRemoveItemAll} className="deleteAll">
          <FontAwesomeIcon icon={faTrash} />
          Clear All 
        </button>
      </div>
      
      {/* Map through filtered favorite properties and display each in a card */}
      {favFilter.map(property => (
        <div 
          key={property.id} 
          className="favProp" 
          draggable
          onDragStart={(e) => onDragStartFavorite(e, property)}
        >
          {/* Property image */}
          <img src={property.image} alt={property.type} className="propImage"/>

          {/* Property information */}
          <div className="propInfo">
            <h2 className="propTitle">{property.type} - {property.bedrooms} Bedrooms</h2>
            <p className="propDescription-fav">{property.description}</p>
            <p className="propPrice">Price: {property.price}</p>

            {/* Button to remove the property from favorites */}
            <button 
              className="viewDetails removeButton"
              onClick={() => onRemoveItem(property.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// Export the Favourites component for use in the application
export default Favourites;
