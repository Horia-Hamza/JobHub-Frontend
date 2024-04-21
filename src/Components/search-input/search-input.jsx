import React from 'react';

export const SearchInput = ({ onChange }) => {
  return (
    <input
      type="text" 
      className="form-control py-3"
      placeholder="Search by Title or Location (e.g. Sales in Cairo)"
      onChange={onChange}
    />
  );
};

