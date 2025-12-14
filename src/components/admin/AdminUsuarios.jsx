import React from "react";

// Componente para gestionar usuarios en el panel de administración
export default function AdminUsuarios({ users, userForm, editingUser, onUserChange, onUserSubmit, onPrepareEditUser, onDeleteUser, onResetUserForm }) {
  return (
    <div className="section-container">
      <h2>Gestión de Usuarios</h2>

      <form className="admin-form" onSubmit={editingUser ? onUserSubmit : onUserSubmit}>
        <h3>{editingUser ? "Editar Usuario" : "Agregar Usuario"}</h3>

        <input name="nombre" placeholder="Nombre" value={userForm.nombre} onChange={onUserChange} required />
        <input name="email" type="email" placeholder="Email" value={userForm.email} onChange={onUserChange} required />
        <input name="password" type="password" placeholder={editingUser ? "Nueva contraseña (opcional)" : "Contraseña"} value={userForm.password} onChange={onUserChange} required={!editingUser} />

        <select name="rol" value={userForm.rol} onChange={onUserChange} required>
          <option value="usuario">Usuario</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">{editingUser ? "Guardar Cambios" : "Crear Usuario"}</button>
        {editingUser && <button type="button" onClick={onResetUserForm}>Cancelar</button>}
      </form>

      <h3 style={{ marginTop: "30px" }}>Usuarios Registrados</h3>
      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr><td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>No hay usuarios</td></tr>
            ) : (
              users.map(u => (
                <tr key={u.id}>
                  <td>{u.nombre}</td>
                  <td>{u.email}</td>
                  <td><span className={`role-badge role-${u.rol}`}>{u.rol.toUpperCase()}</span></td>
                  <td>
                    <button onClick={() => onPrepareEditUser(u)}>Editar</button>
                    <button onClick={() => onDeleteUser(u.id)} className="btn-delete">Eliminar</button>
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
