import React from 'react';
import { render, screen } from '@testing-library/react';
import { Map } from '../components/Map';

describe('Map component', () => {
  test('renders map container', () => {
    render(<Map />);

    const mapContainer = screen.getByTestId('map-container');

    expect(mapContainer).toBeInTheDocument();
  });

  test('renders tile layer correctly', () => {
    render(<Map />);

    const tileLayer = screen.getByTestId('tile-layer');

    expect(tileLayer).toBeInTheDocument();
  });

  test('renders GeoJSON layer correctly', () => {
    render(<Map />);

    const geoJSONLayer = screen.getByTestId('geojson-layer');

    expect(geoJSONLayer).toBeInTheDocument();
  });
});
