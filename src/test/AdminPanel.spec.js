import React from 'react';
import { render, screen } from '@testing-library/react';
import AdminPanel from '../components/AdminPanel';

describe('AdminPanel', () => {
  it('debe mostrar el título del panel', () => {
    render(<AdminPanel />);

    // Ajusta el texto según tu componente
    const elemento = screen.getByText(/Panel de Administración/i);
    expect(elemento).toBeTruthy();
  });
});
