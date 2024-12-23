import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiUrl } from '../../utils';
import axios from 'axios';
import styles from './perfume.module.css';
import { Navbar } from '../../components/Navbar/Navbar.jsx';
import { config } from '../../App.jsx';

const PerfumeList = () => {
    const [perfumes, setPerfumes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${apiUrl}/perfume?take=1000`, config)
            .then(response => setPerfumes(response.data.perfumes))
            .catch(error => setError(error.response?.data?.message || 'An error occurred'));
    }, []);

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

    return (
        <div className={styles.perfumePage}>
              <Navbar/>
            <div className={styles.perfumeContent}>
                <h1>Perfumes</h1>
                {error && <p className={styles.errorMessage}>{error}</p>}
                <div className={styles.perfumeGrid}>
                    {perfumes.map(perfume => (
                        <Link to={`/perfume/${perfume.perfume_Id}`} key={perfume.perfume_Id}>
                            <div className={styles.perfumeCard}>
                                <img 
                                   src={perfume.perfume_Link}
                                    alt={perfume.perfume_Name} 
                                    className={styles.perfumeImage} 
                                />
                                <h2>{perfume.perfume_Name}</h2>
                                <p className={styles.perfumeBrand}>{perfume.perfume_Brand}</p>
                                <p className={styles.perfumeRating}>{renderStars(perfume.perfume_rating)}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PerfumeList;
