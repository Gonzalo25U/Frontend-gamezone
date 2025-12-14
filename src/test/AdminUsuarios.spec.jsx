import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import AdminUsuarios from '../components/admin/AdminUsuarios';

describe('AdminUsuarios component', () => {

  let container;
  let root;
  let defaultProps;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);

    defaultProps = {
      users: [],
      editingUser: false,
      userForm: {
        nombre: '',
        email: '',
        password: '',
        rol: 'usuario'
      },
      onUserChange: jasmine.createSpy('onUserChange'),
      onUserSubmit: jasmine.createSpy('onUserSubmit'),
      onPrepareEditUser: jasmine.createSpy('onPrepareEditUser'),
      onDeleteUser: jasmine.createSpy('onDeleteUser'),
      onResetUserForm: jasmine.createSpy('onResetUserForm')
    };
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    document.body.removeChild(container);
    container = null;
  });

  it('debería mostrar el título Gestión de Usuarios', () => {
    act(() => {
      root.render(<AdminUsuarios {...defaultProps} />);
    });

    expect(container.textContent).toContain('Gestión de Usuarios');
  });

  it('debería mostrar "Agregar Usuario" cuando no está editando', () => {
    act(() => {
      root.render(<AdminUsuarios {...defaultProps} />);
    });

    expect(container.textContent).toContain('Agregar Usuario');
    expect(container.textContent).toContain('Crear Usuario');
  });

  it('debería mostrar "Editar Usuario" cuando editingUser es true', () => {
    act(() => {
      root.render(
        <AdminUsuarios {...defaultProps} editingUser={true} />
      );
    });

    expect(container.textContent).toContain('Editar Usuario');
    expect(container.textContent).toContain('Guardar Cambios');
  });

  it('debería llamar a onUserSubmit al enviar el formulario', () => {
    act(() => {
      root.render(<AdminUsuarios {...defaultProps} />);
    });

    const form = container.querySelector('form');

    act(() => {
      form.dispatchEvent(new Event('submit', { bubbles: true }));
    });

    expect(defaultProps.onUserSubmit).toHaveBeenCalled();
  });

  it('debería mostrar "No hay usuarios" si la lista está vacía', () => {
    act(() => {
      root.render(<AdminUsuarios {...defaultProps} />);
    });

    expect(container.textContent).toContain('No hay usuarios');
  });

  it('debería renderizar una fila por cada usuario', () => {
    const users = [{
      id: 1,
      nombre: 'Juan',
      email: 'juan@test.com',
      rol: 'admin'
    }];

    act(() => {
      root.render(
        <AdminUsuarios {...defaultProps} users={users} />
      );
    });

    const rows = container.querySelectorAll('tbody tr');
    expect(rows.length).toBe(1);
    expect(container.textContent).toContain('Juan');
    expect(container.textContent).toContain('ADMIN');
  });

  it('debería llamar a onPrepareEditUser al hacer click en Editar', () => {
    const user = {
      id: 5,
      nombre: 'Ana',
      email: 'ana@test.com',
      rol: 'usuario'
    };

    act(() => {
      root.render(
        <AdminUsuarios {...defaultProps} users={[user]} />
      );
    });

    const editButton = container.querySelector('tbody button');

    act(() => {
      editButton.click();
    });

    expect(defaultProps.onPrepareEditUser).toHaveBeenCalledWith(user);
  });

  it('debería llamar a onDeleteUser con el id correcto', () => {
    const user = {
      id: 10,
      nombre: 'Pedro',
      email: 'pedro@test.com',
      rol: 'usuario'
    };

    act(() => {
      root.render(
        <AdminUsuarios {...defaultProps} users={[user]} />
      );
    });

    const buttons = container.querySelectorAll('tbody button');
    const deleteButton = buttons[1];

    act(() => {
      deleteButton.click();
    });

    expect(defaultProps.onDeleteUser).toHaveBeenCalledWith(10);
  });

});
