import React from "react";

// Componente para gestionar productos en el panel de administración
export default function AdminProductos({ products, productForm, editingProduct, onProductChange, onProductSubmit, onPrepareEditProduct, onResetProductForm, onDeleteProduct }) {
  return (
    <div className="section-container">
      <h2>Gestión de Productos</h2>

      <form className="admin-form" onSubmit={editingProduct ? onProductSubmit : onProductSubmit}>
        <h3>{editingProduct ? "Editar Producto" : "Agregar Producto"}</h3>

        <input name="nombre" placeholder="Nombre" value={productForm.nombre} onChange={onProductChange} required />
        <input name="precio" type="number" step="0.01" placeholder="Precio" value={productForm.precio} onChange={onProductChange} required />
        <input name="genero" placeholder="Género" value={productForm.genero} onChange={onProductChange} required />
        <input name="descripcion" placeholder="Descripción" value={productForm.descripcion} onChange={onProductChange} required />
        <input name="imageUrl" placeholder="URL de imagen" value={productForm.imageUrl} onChange={onProductChange} required />
        <input name="stock" type="number" placeholder="Stock" value={productForm.stock} onChange={onProductChange} required />

        <button type="submit">{editingProduct ? "Guardar Cambios" : "Crear Producto"}</button>
        {editingProduct && <button type="button" onClick={onResetProductForm}>Cancelar</button>}
      </form>

      <h3 style={{ marginTop: "30px" }}>Productos Registrados</h3>
      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Género</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>No hay productos</td></tr>
            ) : (
              products.map(p => (
                <tr key={p.id}>
                  <td><img src={p.imageUrl} alt={p.nombre} /></td>
                  <td>{p.nombre}</td>
                  <td>${p.precio}</td>
                  <td>{p.genero}</td>
                  <td>{p.stock}</td>
                  <td>
                    <button onClick={() => onPrepareEditProduct(p)}>Editar</button>
                    <button onClick={() => onDeleteProduct(p.id)} className="btn-delete">Eliminar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
