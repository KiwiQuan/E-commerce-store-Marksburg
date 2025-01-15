import styled from 'styled-components';

const FilterBar = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  sortBy,
  onSortChange 
}) => {
  // Function to format category names for display
  const formatCategoryName = (category) => {
    return category
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <FilterWrapper>
      <CategoryButtons>
        <CategoryButton 
          active={selectedCategory === ''} 
          onClick={() => onCategoryChange('')}
        >
          All
        </CategoryButton>
        {categories.map(category => (
          <CategoryButton
            key={category}
            active={selectedCategory === category}
            onClick={() => onCategoryChange(category)}
          >
            {formatCategoryName(category)}
          </CategoryButton>
        ))}
      </CategoryButtons>

      <SortWrapper>
        <FilterLabel>Sort by:</FilterLabel>
        <Select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
          <option value="name">Name</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating: High to Low</option>
          <option value="rating-asc">Rating: Low to High</option>
        </Select>
      </SortWrapper>
    </FilterWrapper>
  );
};

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const CategoryButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const CategoryButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.active ? '#4CAF50' : '#ddd'};
  background: ${props => props.active ? '#4CAF50' : 'white'};
  color: ${props => props.active ? 'white' : '#666'};
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #4CAF50;
    color: ${props => props.active ? 'white' : '#4CAF50'};
  }
`;

const SortWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FilterLabel = styled.label`
  color: #666;
  font-weight: 500;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  min-width: 150px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

export default FilterBar;
