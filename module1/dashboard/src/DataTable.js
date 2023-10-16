import React from 'react';

function DataTable({ columnHeaders, data }) {
  return (
    <table>
      <thead>
        <tr>
          {/* Assuming your data has keys 'id', 'name', 'value' etc. Adjust as per your dataset */}
          {columnHeaders.map((item, key) =>
            <th key={key}>{item.toUpperCase()}</th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {columnHeaders.map((key) =>
              <td>{item[key]}</td>
            )}
            {/* Add more <td> elements for other data values */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
