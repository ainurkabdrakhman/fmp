import React from "react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell} from "recharts";
import "./Workload.css"


function TeamWorkLoad(){
    const teams = [
    { name: "MECH", active: 12, hours: 92, avgPriority: 2.3, load: 95 },
    { name: "INST", active: 8, hours: 56, avgPriority: 3.1, load: 70 },
    { name: "ELEC", active: 5, hours: 33, avgPriority: 4.0, load: 50 },
  ];

  const getLoadColor = (load) =>{
    if(load>=90) return "high-load";   
    if(load>=70) return "medium-load";
    return "low-load";
  }

  const data = [
  { craft: "Welders", hours: 120 },
  { craft: "Fitters", hours: 80 },
  { craft: "Inspectors", hours: 65 },
  { craft: "Electricians", hours: 90 },
];

  const colors = ["#007bff", "#28a745", "#ffc107", "#dc3545"];

  return(
    <div className="workload-page">
    
        <h2 className="page-title">Workload by Craft</h2>
        <p className="subtitle">Overview of team activity and capacity</p>

        <div className="workload-table">
            <table>
                <thead>
                    <tr>
                    <th>Team</th>
                    <th>Active Orders</th>
                    <th>Total Hours</th>
                    <th>Avg Priority</th>
                    <th>Load</th>
                    </tr>
                </thead>

                <tbody>
                    {teams.map((team) => (
                        <tr key={team.name}>
                            <td>{team.name}</td>
                            <td>{team.active}</td>
                            <td>{team.hours}</td>
                            <td>{team.avgPriority}</td>
                            <td>
                                <div className={`load-bar ${getLoadColor(team.load)}`}>
                                    <div className="load-fill" style={{width: `${team.load}%`}}></div>
                                    <span className="load-text">{team.load}%</span>
                                </div>
                            </td>

                        </tr>
                    )
                )}
                </tbody>
            </table>
        </div>
        <div style={{ width: "100%", height: 400, marginTop: "40px" }}>
        <ResponsiveContainer width="95%" height={400}>
  <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="craft" />  
    <YAxis />
    <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #ccc" }} />
    <Legend />
    <Bar dataKey="hours" label={{ position: "top" }}>
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
      ))}
    </Bar>
  </BarChart>
</ResponsiveContainer>
    </div>
    </div>
  )
}
export default TeamWorkLoad;