import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import AdminProductos from '../components/admin/AdminProductos';

describe('AdminProductos component', () => {

  let container;
  let root;
  let defaultProps;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);

    defaultProps = {
      products: [],
      editingProduct: false,
      productForm: {
        nombre: '',
        precio: '',
        genero: '',
        descripcion: '',
        imageUrl: '',
        stock: ''
      },
      onProductChange: jasmine.createSpy('onProductChange'),
      onProductSubmit: jasmine.createSpy('onProductSubmit'),
      onPrepareEditProduct: jasmine.createSpy('onPrepareEditProduct'),
      onResetProductForm: jasmine.createSpy('onResetProductForm'),
      onDeleteProduct: jasmine.createSpy('onDeleteProduct')
    };
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    document.body.removeChild(container);
    container = null;
  });

  it('debería mostrar el título Gestión de Productos', () => {
    act(() => {
      root.render(<AdminProductos {...defaultProps} />);
    });

    expect(container.textContent).toContain('Gestión de Productos');
  });

  it('debería mostrar "Agregar Producto" cuando no está editando', () => {
    act(() => {
      root.render(<AdminProductos {...defaultProps} />);
    });

    expect(container.textContent).toContain('Agregar Producto');
    expect(container.textContent).toContain('Crear Producto');
  });

  it('debería mostrar "Editar Producto" cuando editingProduct es true', () => {
    act(() => {
      root.render(
        <AdminProductos {...defaultProps} editingProduct={true} />
      );
    });

    expect(container.textContent).toContain('Editar Producto');
    expect(container.textContent).toContain('Guardar Cambios');
  });

  it('debería llamar a onProductSubmit al enviar el formulario', () => {
    act(() => {
      root.render(<AdminProductos {...defaultProps} />);
    });

    const form = container.querySelector('form');

    act(() => {
      form.dispatchEvent(new Event('submit', { bubbles: true }));
    });

    expect(defaultProps.onProductSubmit).toHaveBeenCalled();
  });

  it('debería mostrar "No hay productos" si la lista está vacía', () => {
    act(() => {
      root.render(<AdminProductos {...defaultProps} />);
    });

    expect(container.textContent).toContain('No hay productos');
  });

  it('debería renderizar una fila por cada producto', () => {
    const products = [{
      id: 1,
      nombre: 'Producto 1',
      precio: 100,
      genero: 'Acción',
      stock: 5,
      imageUrl: 'img.jpg'
    }];

    act(() => {
      root.render(
        <AdminProductos {...defaultProps} products={products} />
      );
    });

    const rows = container.querySelectorAll('tbody tr');
    expect(rows.length).toBe(1);
    expect(container.textContent).toContain('Producto 1');
  });

  it('debería llamar a onPrepareEditProduct al hacer click en Editar', () => {
    const product = {
      id: 1,
      nombre: 'Producto Test',
      precio: 50,
      genero: 'RPG',
      stock: 10,
      imageUrl: 'img.jpg'
    };

    act(() => {
      root.render(
        <AdminProductos {...defaultProps} products={[product]} />
      );
    });

    const editButton = container.querySelector('tbody button');

    act(() => {
      editButton.click();
    });

    expect(defaultProps.onPrepareEditProduct).toHaveBeenCalledWith(product);
  });

  it('debería llamar a onDeleteProduct con el id correcto', () => {
    const product = {
      id: 99,
      nombre: 'Producto Test',
      precio: 50,
      genero: 'RPG',
      stock: 10,
      imageUrl: 'img.jpg'
    };

    act(() => {
      root.render(
        <AdminProductos {...defaultProps} products={[product]} />
      );
    });

    const buttons = container.querySelectorAll('tbody button');
    const deleteButton = buttons[1];

    act(() => {
      deleteButton.click();
    });

    expect(defaultProps.onDeleteProduct).toHaveBeenCalledWith(99);
  });

});
