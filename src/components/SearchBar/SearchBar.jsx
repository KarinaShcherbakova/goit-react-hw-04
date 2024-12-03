import { useState } from 'react';
import { toast } from 'react-hot-toast';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.error('Please enter a search term', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#f44336',
          color: '#fff',
          fontSize: '16px',
          borderRadius: '8px',
          padding: '10px 20px',
        },
      });
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={styles.header}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.input}
          placeholder="Search images and photos"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          autoFocus
        />
        <button className={styles.button} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;