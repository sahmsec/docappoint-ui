'use client';

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { Star, MapPin, Building2 } from 'lucide-react';
import { useAuth } from '../lib/auth-context';
import { useRouter } from 'next/navigation';

const DoctorCard = ({ doctor }) => {
  const { user } = useAuth();
  const router = useRouter();

  const handleBookClick = (e) => {
    e.stopPropagation();
    if (!user) {
      router.push(`/login?redirect=/doctors/${doctor._id}`);
    } else {
      router.push(`/doctors/${doctor._id}`);
    }
  };

  const docSpecialty = doctor.specialty || doctor.specialization || 'General Practitioner';
  const docExperience = doctor.experience || doctor.yearsOfExperience || '5+';
  const docImage = doctor.image || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=350&h=350&fit=crop';

  return (
    <StyledWrapper onClick={handleBookClick}>
      <div className="parent">
        <div className="card">
          <div className="front">
            <div className="card-top">
              <p className="card-top-para">Profile</p>
            </div>
            
            <div className="image-container">
              <Image 
                src={docImage}
                alt={doctor.name}
                fill
                className="doc-photo"
              />
            </div>

            <p className="heading">{doctor.name}</p>
            <p className="specialty-text">{docSpecialty}</p>
            
            <div className="rating-container">
              <Star className="star-icon" />
              <span className="rating-text">{doctor.rating || '4.8'}</span>
            </div>
            
            <p className="follow hidden lg:block">Hover to see details</p>
            
            {/* Mobile Only Button */}
            <div className="w-full mt-auto block lg:hidden pb-2">
              <button className="book-btn-mobile" onClick={handleBookClick}>
                Book Appointment
              </button>
            </div>
          </div>

          <div className="back hidden lg:flex">
            {/* Background Image for back card */}
            <Image 
              src={docImage}
              alt={doctor.name}
              fill
              className="absolute inset-0 object-cover z-0 opacity-40 blur-sm brightness-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 z-0 border-radius-[inherit]"></div>

            <div className="relative z-10 w-full flex flex-col items-center h-full">
              <p className="heading text-white">Doctor Details</p>
              
              <div className="details-info flex-grow justify-center mt-4">
                {doctor.hospital && (
                  <div className="detail-row">
                    <span className="detail-label">Hospital:</span>
                    <span className="detail-val">{doctor.hospital}</span>
                  </div>
                )}
                {doctor.location && (
                  <div className="detail-row">
                    <span className="detail-label">Location:</span>
                    <span className="detail-val">{doctor.location}</span>
                  </div>
                )}
                <div className="detail-row">
                  <span className="detail-label">Experience:</span>
                  <span className="detail-val">{docExperience} Years</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Fee:</span>
                  <span className="detail-val font-bold highlight-text">${doctor.fee}</span>
                </div>
              </div>

              <button className="book-btn mt-auto" onClick={handleBookClick}>
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;
  max-width: 320px;
  margin: 0 auto;

  .parent {
    width: 100%;
    height: 380px;
    perspective: 1500px;
    cursor: pointer;
  }

  .card {
    width: 100%;
    height: 100%;
    border-radius: 2rem;
    position: relative;
    transition: transform 1000ms cubic-bezier(0.4, 0, 0.2, 1);
    transform-style: preserve-3d;
    border: 2px solid rgba(78, 155, 99, 0.25);
    box-shadow: 0px 10px 30px -10px rgba(0, 0, 0, 0.15);
  }

  [data-theme="dark"] .card {
    border-color: rgba(181, 227, 176, 0.3);
    box-shadow: 0px 10px 30px -10px rgba(0, 0, 0, 0.5);
  }

  .card-top {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    position: absolute;
    width: 55%;
    background-color: var(--primary);
    border: 2px solid rgba(78, 155, 99, 0.4);
    top: 0;
    border-top: none;
    border-radius: 0 0 1.25rem 1.25rem;
    box-shadow: 0px 4px 12px rgba(78, 155, 99, 0.2);
    z-index: 10;
  }

  [data-theme="dark"] .card-top {
    border-color: rgba(181, 227, 176, 0.35);
  }

  .card-top-para {
    font-size: 11px;
    font-weight: 800;
    color: var(--bg-main);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  @media (min-width: 1024px) {
    .parent:hover .card {
      transform: rotateX(180deg) rotateZ(-180deg);
    }
  }

  .front,
  .back {
    height: 100%;
    width: 100%;
    border-radius: 1.85rem;
    position: absolute;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 24px;
    overflow: hidden;
  }

  .front {
    background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-soft) 100%);
  }

  [data-theme="dark"] .front {
    background: linear-gradient(135deg, #141A17 0%, #1d2522 100%);
  }

  .back {
    background: #000; /* fallback */
    color: #ffffff;
    transform: rotateX(180deg) rotateZ(-180deg);
    border: 2px solid rgba(181, 227, 176, 0.25);
  }

  /* Mobile/Tablet override: Statically show the front card details with button */
  @media (max-width: 1023px) {
    .card {
      transform: none !important;
      transition: none !important;
    }
    .parent:hover .card {
      transform: none !important;
    }
    .back {
      display: none !important;
    }
    .front {
      display: flex !important;
    }
  }

  .image-container {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid var(--accent);
    box-shadow: 0px 8px 20px rgba(78, 155, 99, 0.3);
    position: relative;
    margin-top: 15px;
    margin-bottom: 12px;
    background: var(--bg-soft);
    flex-shrink: 0;
  }

  .doc-photo {
    object-fit: cover;
  }

  .heading {
    font-size: 20px;
    font-weight: 800;
    color: var(--text-main);
    text-align: center;
    margin: 0;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }

  .back .heading {
    color: #ffffff;
    border-bottom: 2px solid rgba(181, 227, 176, 0.25);
    padding-bottom: 8px;
    margin-bottom: 6px;
  }

  .specialty-text {
    font-size: 14px;
    font-weight: 700;
    color: var(--accent);
    margin: 4px 0 8px 0;
    text-align: center;
  }

  .rating-container {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 800;
    background: rgba(78, 155, 99, 0.1);
    border: 1px solid rgba(78, 155, 99, 0.25);
    padding: 4px 12px;
    border-radius: 12px;
    color: var(--text-main);
    margin-bottom: auto;
  }

  .star-icon {
    width: 15px;
    height: 15px;
    fill: #FFC107;
    stroke: #FFC107;
    margin-right: 4px;
  }

  .follow {
    font-size: 11px;
    font-weight: 800;
    color: var(--accent);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-top: 12px;
    animation: pulse 2.2s infinite ease-in-out;
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }

  .details-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .detail-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding-bottom: 8px;
  }

  .detail-label {
    color: rgba(255, 255, 255, 0.8);
    font-weight: 600;
  }

  .detail-val {
    color: #ffffff;
    font-weight: 800;
    text-align: right;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .highlight-text {
    color: #B5E3B0 !important;
  }

  .book-btn {
    width: 100%;
    padding: 12px 20px;
    background: var(--accent);
    color: #ffffff;
    border: none;
    border-radius: 1.25rem;
    font-size: 14px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0px 6px 15px rgba(78, 155, 99, 0.4);
    position: relative;
    z-index: 20;
  }

  .book-btn:hover {
    background: var(--accent-hover);
    transform: translateY(-2px);
    box-shadow: 0px 8px 20px rgba(78, 155, 99, 0.5);
  }

  .book-btn:active {
    transform: translateY(0);
  }

  .book-btn-mobile {
    width: 100%;
    padding: 12px;
    background: var(--accent);
    color: #ffffff;
    border: none;
    border-radius: 1rem;
    font-size: 13px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    box-shadow: 0px 4px 10px rgba(78, 155, 99, 0.3);
  }
`;

export default DoctorCard;