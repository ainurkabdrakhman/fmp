import React from "react";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell,} from "recharts";
import {Calendar, dateFnsLocalizer} from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Workload.css";

function TeamWorkLoad() {
  const teams = [
    { name: "MECH", active: 12, hours: 92, avgPriority: 2.3, load: 95 },
    { name: "INST", active: 8, hours: 56, avgPriority: 3.1, load: 70 },
    { name: "ELEC", active: 5, hours: 33, avgPriority: 4.0, load: 50 },
  ];

  const getLoadColor = (load) => {
    if (load >= 90) return "high-load";
    if (load >= 70) return "medium-load";
    return "low-load";
  };

  const data = [
    { craft: "Welders", hours: 120 },
    { craft: "Fitters", hours: 80 },
    { craft: "Inspectors", hours: 65 },
    { craft: "Electricians", hours: 90 },
  ];

  const colors = ["#007bff", "#28a745", "#ffc107", "#dc3545"];

  const locales = { "en-US": enUS };
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales,
  });

  const events = [
    {
      title: "Pump Maintenance (MECH)",
      start: new Date(2025, 9, 25, 9, 0),
      end: new Date(2025, 9, 25, 12, 0),
    },
    {
      title: "Inspection (INST)",
      start: new Date(2025, 9, 27, 10, 0),
      end: new Date(2025, 9, 27, 15, 0),
    },
    {
      title: "Electrical Repair (ELEC)",
      start: new Date(2025, 9, 29, 8, 0),
      end: new Date(2025, 9, 29, 13, 0),
    },
  ];

  return (
    <div className="workload-page">
      <h2 className="page-title">Workload by Craft</h2>
      <p className="subtitle">Overview of team activity, capacity, and schedule</p>

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
                    <div className="load-fill" style={{ width: `${team.load}%` }}></div>
                    <span className="load-text">{team.load}%</span>
                  </div>
                </td>
              </tr>
            ))}
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

      <h3 style={{ marginTop: "50px", textAlign: "center" }}>Work Orders Calendar</h3>
      <div style={{ height: "500px", marginTop: "20px", backgroundColor: "#fff", borderRadius: "12px", padding: "10px" }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 480 }}
          onSelectEvent={(event) => alert(`Open work order: ${event.title}`)}
        />
      </div>
    </div>
  );
}

export default TeamWorkLoad;
