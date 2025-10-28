import React from "react";
import { Mail, Phone, Award } from "lucide-react"; 
import "./EngineerProfileCard.css";

function EngineerProfileCard({ engineer }) {
  const initials = engineer.fullName
    .split(" ")
    .map((word) => word[0])
    .join("");

  return (
    <div className="engineer-card">
      <div className="engineer-header">
        <div className="avatar">{initials}</div>
        <div>
          <h3>{engineer.fullName}</h3>
          <p className="position">{engineer.position}</p>
        </div>
      </div>

      <div className="engineer-info">
        <p><strong>ID:</strong> {engineer.badge}</p>
        <p><strong>Team:</strong> {engineer.team}</p>

        <div className="contact">
          <Phone size={16} /> <span>{engineer.phone}</span>
        </div>
        <div className="contact">
          <Mail size={16} /> <span>{engineer.email}</span>
        </div>
      </div>

      <div className="certificates">
        <h4><Award size={16} /> Certificates</h4>
        <ul>
          {engineer.certificates.map((cert, i) => (
            <li key={i}>{cert}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default EngineerProfileCard;

