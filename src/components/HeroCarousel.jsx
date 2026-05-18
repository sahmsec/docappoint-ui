'use client';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '@/lib/axios';

const HeroCarousel = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await api.get('/api/doctors?sort=rating');
        if (data.success) {
          setDoctors(data.data.slice(0, 10)); // Top 10 doctors
        } else {
          setErrorMsg('API returned success: false');
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setErrorMsg(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  if (errorMsg) return <div className="w-full h-full flex flex-col items-center justify-center text-red-500 font-bold z-50 bg-white p-4">API Error: {errorMsg}</div>;
  if (loading) return <div className="w-full h-full flex items-center justify-center text-[#11281F] font-medium animate-pulse">Loading top doctors...</div>;
  if (!doctors.length) return null;

  const quantity = doctors.length;
  
  // A palette of vibrant pastel colors for the cards
  const colorPalette = [
    '142, 249, 252',
    '142, 252, 204',
    '142, 252, 157',
    '215, 252, 142',
    '252, 252, 142',
    '252, 208, 142',
    '252, 142, 142',
    '252, 142, 239',
    '204, 142, 252',
    '142, 202, 252'
  ];

  return (
    <StyledWrapper>
      <div className="wrapper">
        <div className="inner" style={{ '--quantity': quantity }}>
          {doctors.map((doctor, index) => (
            <div 
              className="card" 
              key={doctor._id}
              style={{ 
                '--index': index, 
                '--color-card': colorPalette[index % colorPalette.length] 
              }}
            >
              <div 
                className="img" 
                style={{
                  backgroundImage: `url(${doctor.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                title={doctor.name}
              />
            </div>
          ))}
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  
  .wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .inner {
    --w: 120px;
    --h: 170px;
    --translateZ: calc((var(--w) + var(--h)) + 15px);
    --rotateX: -10deg;
    --perspective: 1200px;
    position: absolute;
    width: var(--w);
    height: var(--h);
    top: 30%;
    left: calc(50% - (var(--w) / 2));
    z-index: 2;
    transform-style: preserve-3d;
    transform: perspective(var(--perspective));
    animation: rotating 24s linear infinite;
  }
  
  @keyframes rotating {
    from {
      transform: perspective(var(--perspective)) rotateX(var(--rotateX))
        rotateY(0);
    }
    to {
      transform: perspective(var(--perspective)) rotateX(var(--rotateX))
        rotateY(1turn);
    }
  }

  .card {
    position: absolute;
    border: 3px solid rgba(var(--color-card));
    border-radius: 16px;
    overflow: hidden;
    inset: 0;
    transform: rotateY(calc((360deg / var(--quantity)) * var(--index)))
      translateZ(var(--translateZ));
    box-shadow: 0 10px 30px -10px rgba(var(--color-card), 0.6);
    background: #fff;
  }

  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative;
  }
  
  .img::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at bottom,
      rgba(var(--color-card), 0.3) 0%,
      transparent 60%
    );
  }
`;

export default HeroCarousel;
