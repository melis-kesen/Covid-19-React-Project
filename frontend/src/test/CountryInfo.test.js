import React from 'react';
import { render } from '@testing-library/react';
import {CountryInfo} from '../components/CountryInfo';

describe('CountryInfo', () => {
  it('renders correctly', () => {
    render(<CountryInfo />);
  });
});