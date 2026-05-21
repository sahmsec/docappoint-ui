'use client';
import React from 'react';
import styled from 'styled-components';
import { Edit2, Trash2, Clock, User, Stethoscope } from 'lucide-react';

const Dashboard3DCard = ({ booking, onEdit, onDelete }) => {
  // Parse date, e.g., "2023-10-15"
  const dateObj = new Date(booking.appointmentDate);
  const month = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const date = dateObj.getDate();

  return (
    <StyledWrapper>
      <div className="card-container">
        <div className="date-badge">
          <span className="month">{month}</span>
          <span className="date">{date}</span>
        </div>
        
        <div className="content-section">
          <div className="header-info">
            <h3 className="doctor-name">
              <Stethoscope size={18} className="mr-2 inline text-accent" />
              {booking.doctorName}
            </h3>
            <span className={`status-badge ${booking.status?.toLowerCase() === 'pending' ? 'status-pending' : 'status-confirmed'}`}>
              {booking.status || 'Confirmed'}
            </span>
          </div>
          
          <div className="details-grid">
            <div className="detail-item">
              <User size={16} className="text-text-secondary mr-2" />
              <span className="label">Patient:</span>
              <span className="value">{booking.patientName}</span>
            </div>
            <div className="detail-item">
              <Clock size={16} className="text-text-secondary mr-2" />
              <span className="label">Time:</span>
              <span className="value">{booking.appointmentTime}</span>
            </div>
          </div>
        </div>

        <div className="actions-section">
          <button className="action-btn edit" onClick={() => onEdit(booking)}>
            <Edit2 size={16} />
            <span>Update</span>
          </button>
          <button className="action-btn delete" onClick={() => onDelete(booking._id)}>
            <Trash2 size={16} />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;

  .card-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 20px;
    transition: all 0.3s ease;
    gap: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
      padding: 24px 30px;
      gap: 30px;
    }
  }

  .card-container:hover {
    border-color: rgba(78, 155, 99, 0.3);
    box-shadow: 0 10px 40px rgba(78, 155, 99, 0.06);
    transform: translateY(-2px);
  }

  .date-badge {
    background: var(--bg-soft);
    border: 2px solid var(--border);
    border-radius: 20px;
    width: 80px;
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.3s ease;
  }

  .card-container:hover .date-badge {
    border-color: var(--accent);
    background: rgba(78, 155, 99, 0.05);
  }

  .date-badge .month {
    font-size: 13px;
    font-weight: 800;
    color: var(--accent);
    letter-spacing: 1px;
  }

  .date-badge .date {
    font-size: 28px;
    font-weight: 900;
    color: var(--text-main);
    line-height: 1;
    margin-top: 2px;
  }

  .content-section {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .header-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 640px) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }

  .doctor-name {
    font-size: 20px;
    font-weight: 800;
    color: var(--text-main);
    margin: 0;
    display: flex;
    align-items: center;
  }

  .status-badge {
    padding: 6px 14px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .status-pending {
    background: rgba(245, 158, 11, 0.1);
    color: #f59e0b;
    border: 1px solid rgba(245, 158, 11, 0.2);
  }

  .status-confirmed {
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
    border: 1px solid rgba(16, 185, 129, 0.2);
  }

  .details-grid {
    display: flex;
    flex-direction: column;
    gap: 8px;

    @media (min-width: 640px) {
      flex-direction: row;
      gap: 30px;
    }
  }

  .detail-item {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  .detail-item .label {
    color: var(--text-secondary);
    font-weight: 500;
    margin-right: 6px;
  }

  .detail-item .value {
    color: var(--text-main);
    font-weight: 700;
  }

  .actions-section {
    display: flex;
    gap: 12px;
    flex-shrink: 0;

    @media (min-width: 768px) {
      flex-direction: column;
      justify-content: center;
    }
  }

  .action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 20px;
    border-radius: 14px;
    font-size: 14px;
    font-weight: 700;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    flex: 1;

    @media (min-width: 768px) {
      flex: none;
      padding: 10px 16px;
    }
  }

  .action-btn.edit {
    background: var(--bg-soft);
    color: var(--primary);
    border: 1px solid var(--border);
  }

  .action-btn.edit:hover {
    background: var(--primary);
    color: var(--bg-main);
  }

  .action-btn.delete {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
    border: 1px solid rgba(239, 68, 68, 0.2);
  }

  .action-btn.delete:hover {
    background: #ef4444;
    color: white;
  }
`;

export default Dashboard3DCard;
