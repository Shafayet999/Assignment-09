import React from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router';

const Card = ({ i }) => {
    const {
        serviceId,
        serviceName,
        providerName,
        price,
        rating,
        slotsAvailable,
        description,
        image,
        category,
    } = i;
    return (
        <div className="w-80 bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            
            <img className="w-full h-30 object-cover" src={image} referrerPolicy='no-referrer' alt={serviceName} />

            <div className="p-2">
               
                <p className="text-md text-pink-500 font-semibold">{category}</p>

                
                <h2 className="text-md font-bold text-gray-800 mt-1">{serviceName}</h2>

               
                <p className="text-gray-600 text-sm mt-1">By {providerName}</p>

                
                <p className="text-gray-700 text-sm mt-2 line-clamp-3">{description}</p>

                
                <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400" />
                        <span className="font-semibold">{rating}</span>
                    </div>
                    <p className="text-pink-500 font-bold">${price}</p>
                </div>

               
                <p className="text-gray-500 text-sm mt-1">
                    Slots Available: {slotsAvailable}
                </p>

                
                <Link
                    to={`/services/${serviceId}`}
                    className="mt-3 block w-full text-center bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors duration-200"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default Card;