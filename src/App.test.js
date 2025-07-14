import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders site title', () => {
//   render(<App />);
//   const headingElement = screen.getByText(/DreamDwellDeals/i);
//   expect(headingElement).toBeInTheDocument();
// });

// test('renders search input placeholder', () => {
//   render(<App />);
//   const inputElement = screen.getByPlaceholderText(/Search by type/i);
//   expect(inputElement).toBeInTheDocument();
// });

// test('renders Show Advanced Search button', () => {
//   render(<App />);
//   const buttonElement = screen.getByText(/Show Advanced Search/i);
//   expect(buttonElement).toBeInTheDocument();
// });

// test('renders Favourites section', () => {
//   render(<App />);
//   const favouritesElement = screen.getByText(/Favourites/i);
//   expect(favouritesElement).toBeInTheDocument();
// });

// test('renders Clear All button', () => {
//   render(<App />);
//   const clearAllElement = screen.getByText(/Clear All/i);
//   expect(clearAllElement).toBeInTheDocument();
// });
