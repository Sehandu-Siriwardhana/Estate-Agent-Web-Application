import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './CardDetails.css';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import 'react-tabs/style/react-tabs.css';

const CardDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [property, setProperty] = useState(null);

    useEffect(() => {
        fetch('/properties.json')
            .then(response => response.json())
            .then(data => {
                const detail = data.properties.find(p => p.id === id);
                setProperty(detail);
            });
    }, [id]);

    if (!property) {
        return <div>Loading...</div>;
    }

    const images = property.pictures.map(pic => ({
        original: pic,
        thumbnail: pic 
    }));

   
    const containerStyle = {
        width: '100%',
        height: '400px'
    };

    const center = {
        lat: property.latitude,
        lng: property.longitude
    };

    const formatDate = (added) => {
        return `${added.month} ${added.day}, ${added.year}`;
    };

    const handleBack = () => {
        navigate('/'); 
    };

    return (
        <div className="propDetail-container">
            <h2>{property.type}</h2>
            <ImageGallery items={images} />
            <div className="propInfo">
            </div>

            <div>
            <h2>Floor Plan</h2>
                <img src={property.floorPlan} alt="Floor Plan"/>

                <h2>Description</h2>
                <p>{property.description}</p>
                <p><strong>Type:</strong> {property.type}</p>
                <p><strong>Price:</strong> ${property.price.toLocaleString()}</p>
                <p><strong>Tenure:</strong> {property.tenure}</p>
                <p><strong>Location:</strong> {property.location}</p>
                <p><strong>Added Date:</strong> {formatDate(property.added)}</p>          
            </div>

            
            {<LoadScript googleMapsApiKey="API">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={15}
                >
                    <Marker position={center} />
                </GoogleMap>
            </LoadScript>}
            
            <center><button className="backButton" onClick={handleBack}>Home</button></center>
        </div>
    );
};

export default CardDetails;
