import styled from 'styled-components';
import { BsSearch } from 'react-icons/bs';

const SearchBar = ({ onSearch, value }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <SearchForm onSubmit={handleSubmit}>
      <SearchInput
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={(e) => onSearch(e.target.value.toLowerCase())}
      />
      <SearchButton type="submit">
        <BsSearch />
      </SearchButton>
    </SearchForm>
  );
};

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  max-width: 600px;
  margin: 0 auto 2rem;
  background: white;
  border: 1px solid #ddd;
  border-radius: 24px;
  overflow: hidden;
  transition: box-shadow 0.2s ease;

  &:focus-within {
    box-shadow: 0 0 0 2px #4CAF50;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem 1.5rem;
  border: none;
  outline: none;
  font-size: 1rem;

  &::placeholder {
    color: #999;
  }
`;

const SearchButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  color: #4CAF50;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: color 0.2s ease;

  &:hover {
    color: #45a049;
  }
`;

export default SearchBar;
