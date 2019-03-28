import React from "react";
import PropTypes from "prop-types";

export default function UsersTable({ users }) {
  if (users.length === 0) {
    return <div className="title is-size-2 has-text-centered">No Users!</div>;
  }
  return (
    <div>
      <table className="table is-bordered">
        <thead>
          <tr>
            <th>
              <abbr title="Name">Name</abbr>
            </th>
            <th>
              <abbr title="Registration Number">Reg No.</abbr>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.regNo}>
              <td>{u.name}</td>
              <td>{u.regNo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

UsersTable.propTypes = {
  users: PropTypes.array.isRequired
};
