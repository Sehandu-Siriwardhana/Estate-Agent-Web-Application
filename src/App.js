// Import React, necessary hooks, components, styles, and routing components
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import AdvSearch from './AdvSearch'; 
import Card from './Card'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CardDetails from './CardDetails'; 
import Favourites from './Favourites';

// Main application component
const App = () => {
    // State variables for managing properties, search term, advanced search criteria, visibility of advanced search, and favorites
    const [properties, setProperties] = useState([]);
    const [search, setSearchTerm] = useState('');
    const [AdvSearchCriteria, setAdvSearchCriteria] = useState({});
    const [showAdvSearch, setShowAdvSearch] = useState(false);
    const [favourites, setfavourites] = useState([]);

    // Fetch all properties from the 'properties.json' file when the component mounts
    useEffect(() => {
        fetch('/properties.json')
            .then(response => response.json())
            .then(data => setProperties(data.properties));
    }, []);

    // Handle basic search by updating the search term and hiding advanced search
    const handleBasicSearch = (term) => {
        setSearchTerm(term);
        setShowAdvSearch(false); 
    };

    // Handle changes in advanced search criteria
    const handleAdvSearchChange = (criteria, value) => {
        setAdvSearchCriteria(prev => ({ ...prev, [criteria]: value }));
    };

    // Toggle the visibility of the advanced search section
    const toggleAdvSearch = () => {
      setShowAdvSearch(prevShow => !prevShow);
    };

    // Handle drag start for a property
    const handleDragStart = (e, property) => {
      e.dataTransfer.setData("property", JSON.stringify(property));
  };

    // Handle dropping a property into favorites
    const handleDrop = (e) => {
      e.preventDefault();
      const property = JSON.parse(e.dataTransfer.getData("property"));
      handleFavorite(property);
  };

  // Handle adding a property to favorites
    const handleFavorite = (property) => {
      if (!favourites.some(fav => fav.id === property.id)) {
          setfavourites(prevfavourites => [...prevfavourites, property]);
      }
  };

  // Handle removing a property from favorites
  const handleRemoveFavorite = (id) => {
    setfavourites(favourites.filter(property => property.id !== id));
  };

  // Handle drag start for a favorite property
  const handleDragStartFavorite = (e, property) => {
    e.dataTransfer.setData("favorite", property.id);
  };

  // Handle dropping a favorite property outside the favorites section
  const handleDropOutsidefavourites = (e) => {
    e.preventDefault();
    const favoriteId = e.dataTransfer.getData("favorite");
    if (favoriteId) {
      handleRemoveFavorite(favoriteId);
    }
  };

  // Handle removing all favorite properties
  const handleRemoveAllfavourites = () => {
    setfavourites([]);
  };

    // Filter properties based on both basic and advanced search criteria
    const filteredProperties = properties.filter(property => {
        const matchesBasicSearch = property.type.toLowerCase().includes(search.toLowerCase());

        const matchesAdvSearch = Object.keys(AdvSearchCriteria).every(key => {
            if (!property[key]) return true; 
            return property[key].toString().toLowerCase().includes(AdvSearchCriteria[key].toLowerCase());
        });

        return showAdvSearch ? matchesAdvSearch : matchesBasicSearch;
    });

    // Render the main application structure using React Router
    return (
      <Router>
          <Routes>
              <Route path="/" element={
                  <div className="App">
                    {/* Header component for basic search and advanced search toggle */}
                    <Header onBasicSearch={handleBasicSearch} toggleAdvSearch={toggleAdvSearch} />

                    {/* Main application container with property view and favorites cart */}
                    <div className="app-container" onDrop={handleDropOutsidefavourites} onDragOver={(e) => e.preventDefault()}>
                      <div className="propView">
                        {showAdvSearch && <AdvSearch onChange={handleAdvSearchChange} />}
                        <div className="propList">
                            {/* Display filtered properties as cards */}
                            {filteredProperties.map(property => (
                                <Card key={property.id} property={property} onDragStart={handleDragStart} onAddToFavorites={handleFavorite} />
                            ))}
                        </div>
                      </div>

                      {/* Favorites cart component */}
                      <div className="favCart">
                        <Favourites onDrop={handleDrop} favourites={favourites} onRemoveItem={handleRemoveFavorite} onDragStartFavorite={handleDragStartFavorite} onRemoveItemAll={handleRemoveAllfavourites}/>
                      </div>
                    </div>
                  </div>
              } />

              {/* Route for displaying detailed information about a property */}
              <Route path="/property/:id" element={<CardDetails />} />
          </Routes>
      </Router>
  );
};

// Export the App component for use in the application
export default App;
