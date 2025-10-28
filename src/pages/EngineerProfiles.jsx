import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

const engineers = [
  {
    id: 1,
    fullName: "Амангельды Нуржан Серикович",
    badge: "ENG-0345",
    position: "Mechanical Engineer",
    team: "MECH",
  },
  {
    id: 2,
    fullName: "Серикова Айжан Ерлановна",
    badge: "ENG-0298",
    position: "Electrical Engineer",
    team: "ELEC",
  },
];

const EngineerProfiles = () => {
  return (
    <div className="engineer-grid">
      {engineers.map((eng) => (
        <div className="engineer-card" key={eng.id}>
          <h3 style={{ fontFamily: "'Russo One', sans-serif", color:"#0a3d62" }}>
             {eng.fullName}
         </h3>
          <p className="pp"><strong>Badge:</strong> {eng.badge}</p>
          <p className="pp"><strong>Position:</strong> {eng.position}</p>
          <p className="pp"><strong>Team:</strong> {eng.team}</p>

          <Link to={`/profiles/${eng.id}`} className="view-btn">
            View Profile →
          </Link>
        </div>
      ))}
    </div>
  );
};

export default EngineerProfiles;

