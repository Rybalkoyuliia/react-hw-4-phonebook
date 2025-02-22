import { StyledLabel } from 'components/ContactForm/ContactForm.styled';
import React from 'react';

export const SearchField = ({ setingFilter }) => {
  const handleChange = e => {
    setingFilter(e.target.value.trim());
  };

  return (
    <StyledLabel htmlFor="search">
      Filter:
      <input
        style={{
          height: '20px',
          borderRadius: '10px',
          border: 'none',
          padding: '2px 8px',
          outline: 'none',
        }}
        onChange={handleChange}
        type="text"
        name="search"
        id="search"
        autoComplete="off"
      ></input>
    </StyledLabel>
  );
};
