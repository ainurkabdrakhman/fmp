import React from "react";
import { useParams, Link } from "react-router-dom";
import "./EngineerProfileDetails.css";

const engineers = [
  {
    id: 1,
    fullName: "Амангельды Нуржан Серикович",
    badge: "ENG-0345",
    position: "Mechanical Engineer",
    team: "MECH",
    contact: "+7 701 555 44 33 / a.nurzhan@company.kz",
    certificates: [
      "Flange Assembly Level II (Hytorc)",
      "Pressure Test Safety (TÜV)",
      "LOTO Permit Authorization",
      "Mechanical Maintenance Proficiency (ASTM)",
    ],
  },
  {
    id: 2,
    fullName: "Серикова Айжан Ерлановна",
    badge: "ENG-0298",
    position: "Electrical Engineer",
    team: "ELEC",
    contact: "+7 707 123 45 67 / a.serikova@company.kz",
    certificates: [
      "Electrical Safety Level III",
      "HV Switchgear Operation (ABB)",
      "LOTO Authorization",
    ],
  },
];

const EngineerProfileDetails = () => {
  const { id } = useParams();
  const engineer = engineers.find((e) => e.id === parseInt(id));

  if (!engineer) return <p>Engineer not found</p>;

  return (
    <div className="details-container">
      <h2 className="h2h">{engineer.fullName}</h2>
      <p className="ppp"><strong>Badge:</strong> {engineer.badge}</p>
      <p className="ppp"><strong>Position:</strong> {engineer.position}</p>
      <p className="ppp"><strong>Team:</strong> {engineer.team}</p>
      <p className="ppp"><strong>Contact:</strong> {engineer.contact}</p>

      <h4>Certificates / Qualifications:</h4>
      <ul>
        {engineer.certificates.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>

      <Link to="/profiles" className="btn-back">← Back to Profiles</Link>
    </div>
  );
};

export default EngineerProfileDetails;
