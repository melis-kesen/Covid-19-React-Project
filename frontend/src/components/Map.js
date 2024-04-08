import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export const Map = () => {
  const geojsonData = require("../countries.geo.json"); // Dünya haritasının GeoJSON verisi

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const style = (feature) => {
    return {
      weight: 1,
      opacity: 1,
      color: "black",
      fillOpacity: 0.7,
      fillColor: getRandomColor(), // Her ülke için rastgele bir renk seç
    };
  };

  const onEachCountry = (country, layer) => {
    layer.on("click", () => {
      window.location.href = `/${country.id}`; // Ülke adını içeren URL'ye yönlendir
    });
  };

  return (
    <MapContainer
      style={{ height: "1000px", width: "100%" }}
      zoom={2}
      center={[0, 0]}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON data={geojsonData} style={style} onEachFeature={onEachCountry} />
    </MapContainer>
  );
};
