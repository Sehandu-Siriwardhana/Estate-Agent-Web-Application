// Import React, styles, and Link component for Card
import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';

// Functional component for displaying a property card
const Card = ({ property, onDragStart, onAddToFavorites }) => {
    return (
        // Container for the property card with draggable functionality
        <div className="propCard" draggable 
            onDragStart={(e) => onDragStart(e, property)}
        >
            {/* Property image */}
            <img src={property.image} alt={property.type} className="propImage"/>

            {/* Container for property information */}
            <div className="propInfo">
                {/* Property title with type and bedrooms */}
                <h2 className="propTitle">{property.type} - {property.bedrooms} Bedrooms</h2>

                {/* Property price */}
                <p className="propPrice">Price: {property.price}</p>

                {/* Property description */}
                <p className="propDescription">{property.description}</p>

                {/* Link to navigate to the detailed property page */}
                <Link to={`/property/${property.id}`} className="viewDetails advButton">Details</Link>

                {/* Button to add the property to favorites */}
                <button className="viewDetails advButton" onClick={() => onAddToFavorites(property)}>Favorite</button>
            </div>
        </div>
    );
}

// Export the Card component for use in the application
export default Card;
