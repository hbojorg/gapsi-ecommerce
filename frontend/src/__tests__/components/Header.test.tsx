import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../../components/layout/Header';

const renderHeader = () =>
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

describe('Header', () => {
  it('renders the e-Commerce text', () => {
    renderHeader();
    expect(screen.getByText(/e-Commerce/i)).toBeInTheDocument();
  });

  it('renders the full e-Commerce Gapsi text', () => {
    renderHeader();
    expect(screen.getByText('e-Commerce Gapsi')).toBeInTheDocument();
  });

  it('renders the logo image', () => {
    renderHeader();
    const logo = screen.getByAltText('Gapsi Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/images/logo.png');
  });
});
