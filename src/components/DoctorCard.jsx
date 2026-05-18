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

  return (
    <StyledWrapper onClick={handleBookClick}>
      <div className="parent">
        <div className="card">
          <div className="logo">
            <span className="circle circle1" />
            <span className="circle circle2" />
            <span className="circle circle3" />
            <span className="circle circle4" />
            <span className="circle circle5">
              <div className="rating-content">
                <Star className="svg" strokeWidth={2.5} />
                <span className="rating-text">{doctor.rating || '4.8'}</span>
              </div>
            </span>
          </div>
          <div className="glass" />
          
          <div className="image-container">
             <Image 
                src={doctor.image || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=350&h=350&fit=crop'}
                alt={doctor.name}
                fill
                className="doc-photo"
             />
          </div>

          <div className="content">
            <span className="title">{doctor.name}</span>
            <span className="text">{docSpecialty} • {docExperience} Yrs Exp</span>
            <div className="details">
              {doctor.hospital && <span className="detail-item"><Building2 className="w-3.5 h-3.5" />{doctor.hospital}</span>}
              {doctor.location && <span className="detail-item"><MapPin className="w-3.5 h-3.5" />{doctor.location}</span>}
            </div>
          </div>
          
          <div className="bottom">
            <div className="info-buttons-container">
              <div className="info-button info-button1">
                <span className="font-bold text-[13px]">৳{doctor.fee}</span>
              </div>
            </div>
            <div className="view-more">
              <button className="view-more-button">Book</button>
              <svg className="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
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
    height: 360px;
    perspective: 1000px;
    cursor: pointer;
  }

  .card {
    height: 100%;
    border-radius: 40px;
    background: linear-gradient(135deg, #11281F 0%, #07130E 100%);
    transition: all 0.5s ease-in-out;
    transform-style: preserve-3d;
    box-shadow: rgba(17, 40, 31, 0) 40px 50px 25px -40px, rgba(17, 40, 31, 0.3) 0px 25px 25px -5px;
    border: 1px solid rgba(181, 227, 176, 0.3);
    position: relative;
  }

  .glass {
    transform-style: preserve-3d;
    position: absolute;
    inset: 8px;
    border-radius: 35px;
    border-top-right-radius: 100%;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.08) 100%);
    transform: translate3d(0px, 0px, 25px);
    border-left: 1px solid rgba(255, 255, 255, 0.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    transition: all 0.5s ease-in-out;
  }

  .image-container {
    position: absolute;
    top: 30px;
    left: 25px;
    width: 85px;
    height: 85px;
    border-radius: 50%;
    overflow: hidden;
    transform: translate3d(0, 0, 35px);
    border: 2px solid rgba(181, 227, 176, 0.8);
    box-shadow: rgba(17, 40, 31, 0.6) 0px 10px 20px -5px;
    z-index: 10;
    transition: all 0.5s ease-in-out;
    background: #11281F;
  }

  .doc-photo {
    object-fit: cover;
  }

  .content {
    padding: 135px 25px 0px 25px;
    transform: translate3d(0, 0, 26px);
  }

  .content .title {
    display: block;
    color: #ffffff;
    font-weight: 800;
    font-size: 21px;
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .content .text {
    display: block;
    color: rgba(221, 241, 216, 0.95); /* neon-green for perfect legibility */
    font-size: 14px;
    margin-top: 6px;
    font-weight: 700;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }

  .content .details {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 14px;
  }
  
  .content .details .detail-item {
    font-size: 13px;
    color: rgba(221, 241, 216, 0.85);
    display: flex;
    align-items: center;
    gap: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 600;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }

  .content .details .detail-item svg {
    color: #4E9B63; /* green for better icon visibility */
    flex-shrink: 0;
  }

  .bottom {
    padding: 10px 0px;
    transform-style: preserve-3d;
    position: absolute;
    bottom: 25px;
    left: 25px;
    right: 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transform: translate3d(0, 0, 26px);
  }

  .bottom .view-more {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    transition: all 0.2s ease-in-out;
  }

  .bottom .view-more:hover {
    transform: translate3d(0, 0, 10px);
  }

  .bottom .view-more .view-more-button {
    background: none;
    border: none;
    color: #B5E3B0;
    font-weight: 800;
    font-size: 14px;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }

  .bottom .view-more .svg {
    fill: none;
    stroke: #B5E3B0;
    stroke-width: 3px;
    max-height: 14px;
    margin-left: 2px;
  }

  .bottom .info-buttons-container {
    display: flex;
    gap: 8px;
    transform-style: preserve-3d;
  }

  .bottom .info-buttons-container .info-button {
    height: 32px;
    padding: 0 12px;
    background: rgba(181, 227, 176, 0.1); /* backdrop opacity */
    backdrop-filter: blur(4px);
    border-radius: 16px;
    border: 1px solid rgba(181, 227, 176, 0.2); /* border stroke */
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(17, 40, 31, 0.3) 0px 4px 6px -2px;
    color: #DDF1D8;
    transition: background 0.3s ease, transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  }

  .bottom .info-buttons-container .info-button:first-child {
    transition: transform 0.2s ease-in-out 0.4s, box-shadow 0.2s ease-in-out 0.4s, background 0.3s ease;
  }

  .bottom .info-buttons-container .info-button:nth-child(2) {
    transition: transform 0.2s ease-in-out 0.6s, box-shadow 0.2s ease-in-out 0.6s, background 0.3s ease;
  }

  .bottom .info-buttons-container .info-button:hover {
    background: rgba(78, 155, 99, 0.5);
    border-color: rgba(78, 155, 99, 0.9);
  }

  .logo {
    position: absolute;
    right: 0;
    top: 0;
    transform-style: preserve-3d;
  }

  .logo .circle {
    display: block;
    position: absolute;
    aspect-ratio: 1;
    border-radius: 50%;
    top: 0;
    right: 0;
    box-shadow: rgba(17, 40, 31, 0.15) -5px 5px 15px 0px;
    backdrop-filter: blur(4px);
    background: rgba(78, 155, 99, 0.18); /* slightly higher opacity */
    transition: all 0.5s ease-in-out;
  }

  .logo .circle1 {
    width: 170px;
    transform: translate3d(0, 0, 20px);
    top: 8px;
    right: 8px;
  }

  .logo .circle2 {
    width: 140px;
    transform: translate3d(0, 0, 40px);
    top: 10px;
    right: 10px;
    backdrop-filter: blur(1px);
    transition-delay: 0.4s;
  }

  .logo .circle3 {
    width: 110px;
    transform: translate3d(0, 0, 60px);
    top: 17px;
    right: 17px;
    transition-delay: 0.8s;
  }

  .logo .circle4 {
    width: 80px;
    transform: translate3d(0, 0, 80px);
    top: 23px;
    right: 23px;
    transition-delay: 1.2s;
  }

  .logo .circle5 {
    width: 50px;
    transform: translate3d(0, 0, 100px);
    top: 30px;
    right: 30px;
    display: grid;
    place-content: center;
    transition-delay: 1.6s;
  }

  .logo .circle5 .rating-content {
    display: flex;
    align-items: center;
    gap: 3px;
    color: #FFC107;
    transition: all 0.5s ease-in-out;
  }

  .logo .circle5 .svg {
    width: 14px;
    color: #FFC107;
    fill: #FFC107;
    transition: all 0.5s ease-in-out;
  }

  .logo .circle5 .rating-text {
    font-size: 13px;
    font-weight: 800;
  }

  .parent:hover .card {
    transform: rotate3d(1, 1, 0, 30deg);
    box-shadow: rgba(17, 40, 31, 0.4) 30px 50px 25px -40px, rgba(17, 40, 31, 0.3) 0px 25px 30px 0px;
    border-color: rgba(181, 227, 176, 0.55);
  }

  .parent:hover .image-container {
    transform: translate3d(0, 0, 45px);
    border-color: #ffffff;
  }

  .parent:hover .card .bottom .info-buttons-container .info-button {
    transform: translate3d(0, 0, 50px);
    box-shadow: rgba(17, 40, 31, 0.4) -5px 20px 10px 0px;
  }

  .parent:hover .card .logo .circle2 {
    transform: translate3d(0, 0, 60px);
  }

  .parent:hover .card .logo .circle3 {
    transform: translate3d(0, 0, 80px);
  }

  .parent:hover .card .logo .circle4 {
    transform: translate3d(0, 0, 100px);
  }

  .parent:hover .card .logo .circle5 {
    transform: translate3d(0, 0, 120px);
    background: #4E9B63;
    border: 1px solid rgba(255,255,255,0.25);
    box-shadow: 0 10px 20px rgba(17, 40, 31, 0.4);
  }

  .parent:hover .card .logo .circle5 .rating-content {
    color: #ffffff;
  }

  .parent:hover .card .logo .circle5 .svg {
    color: #ffffff;
    fill: #ffffff;
  }
`;

export default DoctorCard;