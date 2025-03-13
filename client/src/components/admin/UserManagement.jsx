import React from 'react';

const UserManagement = () => {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>
      <table className="min-w-full bg-white border rounded">
        <thead>
          <tr className="border-b">
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Role</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample user row */}
          <tr>
            <td className="p-4">John Doe</td>
            <td className="p-4">Contractor</td>
            <td className="p-4 text-green-600">Approved</td>
            <td className="p-4">
              <button className="bg-yellow-500 text-white px-4 py-1 rounded mr-2">Edit</button>
              <button className="bg-red-500 text-white px-4 py-1 rounded">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default UserManagement;
