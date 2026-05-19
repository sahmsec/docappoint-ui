'use client';
import React from 'react';
import styled from 'styled-components';
import { Edit2, Trash2 } from 'lucide-react';

const Dashboard3DCard = ({ booking, onEdit, onDelete }) => {
  // Parse date, e.g., "2023-10-15"
  const dateObj = new Date(booking.appointmentDate);
  const month = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const date = dateObj.getDate();

  return (
    <StyledWrapper>
      <div className="parent">
        <div className="card">
          <div className="content-box">
            <span className="card-title">{booking.doctorName}</span>
            <p className="card-content">
              <strong>Patient:</strong> {booking.patientName} <br/>
              <strong>Time:</strong> {booking.appointmentTime} <br/>
              <strong>Status:</strong> {booking.status}
            </p>
            <div className="actions">
              <span className="action-btn edit" onClick={() => onEdit(booking)}>
                <Edit2 size={12} className="mr-1 inline" /> Update
              </span>
              <span className="action-btn delete" onClick={() => onDelete(booking._id)}>
                <Trash2 size={12} className="mr-1 inline" /> Delete
              </span>
            </div>
          </div>
          <div className="date-box">
            <span className="month">{month}</span>
            <span className="date">{date}</span>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;

  .parent {
    width: 320px;
    padding: 20px;
    perspective: 1000px;
  }

  .card {
    padding-top: 50px;
    border: 3px solid #11281F;
    border-radius: 20px;
    transform-style: preserve-3d;
    background: #DDF1D8;
    width: 100%;
    box-shadow: rgba(17, 40, 31, 0.3) 0px 30px 30px -10px;
    transition: all 0.5s ease-in-out;
  }

  .card:hover {
    background-position: -100px 100px, -100px 100px;
    transform: rotate3d(0.5, 1, 0, 30deg);
  }

  .content-box {
    background: #11281F;
    border-radius: 15px 100px 15px 15px;
    transition: all 0.5s ease-in-out;
    padding: 50px 25px 25px 25px;
    transform-style: preserve-3d;
    min-height: 220px;
  }

  .content-box .card-title {
    display: inline-block;
    color: #FFFFFF;
    font-size: 22px;
    font-weight: 900;
    transition: all 0.5s ease-in-out;
    transform: translate3d(0px, 0px, 50px);
    line-height: 1.2;
  }

  .content-box .card-title:hover {
    transform: translate3d(0px, 0px, 60px);
  }

  .content-box .card-content {
    margin-top: 15px;
    font-size: 13px;
    font-weight: 600;
    color: #DDF1D8;
    transition: all 0.5s ease-in-out;
    transform: translate3d(0px, 0px, 30px);
    line-height: 1.6;
  }

  .content-box .card-content:hover {
    transform: translate3d(0px, 0px, 60px);
  }

  .content-box .actions {
    margin-top: 1.5rem;
    display: flex;
    gap: 10px;
    transform: translate3d(0px, 0px, 20px);
    transition: all 0.5s ease-in-out;
  }

  .content-box .actions:hover {
    transform: translate3d(0px, 0px, 60px);
  }

  .content-box .action-btn {
    cursor: pointer;
    display: inline-block;
    font-weight: 800;
    font-size: 10px;
    text-transform: uppercase;
    color: #11281F;
    background: #DDF1D8;
    padding: 0.5rem 0.8rem;
    border-radius: 8px;
    transition: all 0.3s ease;
  }

  .content-box .action-btn.delete {
    background: #ef4444;
    color: white;
  }

  .content-box .action-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  }

  .date-box {
    position: absolute;
    top: -15px;
    right: -15px;
    height: 70px;
    width: 70px;
    background: #11281F;
    border: 3px solid #DDF1D8;
    border-radius: 15px;
    padding: 10px;
    transform: translate3d(0px, 0px, 80px);
    box-shadow: rgba(17, 40, 31, 0.3) 0px 17px 10px -10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .date-box span {
    display: block;
    text-align: center;
  }

  .date-box .month {
    color: #DDF1D8;
    font-size: 11px;
    font-weight: 800;
  }

  .date-box .date {
    font-size: 24px;
    font-weight: 900;
    color: #DDF1D8;
    line-height: 1;
    margin-top: 2px;
  }
`;

export default Dashboard3DCard;
