import React from 'react';
import { render } from '@testing-library/react';
import {CountryInfo} from '../components/CountryInfo';

describe('CountryInfo', () => {
  it('renders correctly', () => {
    const {getByText} = render(<CountryInfo />);
    //const linkElement = getByText(/Hello World/i);
    //expect(linkElement).toBeInTheDocument();
  });
});