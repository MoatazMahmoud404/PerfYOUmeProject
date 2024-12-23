import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiUrl } from '../../utils';
import axios from 'axios';
import styles from './perfume.module.css';
import { Navbar } from '../../components/Navbar/Navbar.jsx';
import {config} from '../../App.jsx'

const PerfumeDetails = () => {
    const { perfume_Id } = useParams();
    const [perfume, setPerfume] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`${apiUrl}/perfume/${perfume_Id}`, config)
            .then(response => setPerfume(response.data.perfume))
            .catch(error => setError(error.response?.data?.message || 'An error occurred'));
    }, [perfume_Id]);

    const renderStars = (rating) => {
        const filledStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);
        return (
            <>
                {'★'.repeat(filledStars)}
                {halfStar && '☆'}
                {'☆'.repeat(emptyStars)}
            </>
        );
    };

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!perfume) {
        return <p>Loading...</p>;
    }

    return (
        <div className={styles.perfumePage}>
              <Navbar/>
            <div className={styles.perfumeContent}>
                <h1>{perfume.perfume_Name}</h1>
                <img
                    src={perfume.perfume_Link}
                    alt={perfume.perfume_Name}
                    className={styles.perfumeImageDETAILS}
                />
                <p><strong>Brand:</strong> {perfume.perfume_Brand}</p>
                <p><strong>Description:</strong> {perfume.perfume_description}</p>
                <p><strong>Rating:</strong> <span className={styles.ratingStarsDETAILS}>{renderStars(perfume.perfume_rating)}</span></p>
                <a
                    className={styles.perfumeButtonDETAILS}
                    href={perfume.perfume_Link}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View More
                </a>
            </div>
        </div>
    );
};

export default PerfumeDetails;
