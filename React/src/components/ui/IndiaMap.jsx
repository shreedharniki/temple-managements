import React from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

// India topojson map URL
const INDIA_TOPO_JSON =
  "https://raw.githubusercontent.com/iamprakashpradhan/india-state-map/main/india-topo.json";

// Example dynamic markers
const markers = [
  { name: "Delhi", coordinates: [77.1025, 28.7041] },
  { name: "Mumbai", coordinates: [72.8777, 19.076] },
  { name: "Bangalore", coordinates: [77.5946, 12.9716] },
  { name: "Kolkata", coordinates: [88.3639, 22.5726] },
  { name: "Chennai", coordinates: [80.2707, 13.0827] },
];

export default function IndiaMap() {
  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{ scale: 1000, center: [80, 22] }}
      width={800}
      height={600}
    >
      <Geographies geography={INDIA_TOPO_JSON}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#EAEAEC"
              stroke="#D6D6DA"
            />
          ))
        }
      </Geographies>

      {markers.map(({ name, coordinates }, idx) => (
        <Marker key={idx} coordinates={coordinates}>
          <circle r={6} fill="#FF5533" stroke="#fff" strokeWidth={2} />
          <text
            textAnchor="middle"
            y={-10}
            style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontSize: "12px" }}
          >
            {name}
          </text>
        </Marker>
      ))}
    </ComposableMap>
  );
}
