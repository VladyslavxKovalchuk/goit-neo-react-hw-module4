import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-hot-toast";
import css from "./css/SearchBar.module.css";

export default function SearchBar({ onUpdateQuery, children }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      toast.error("Please enter a search keywords");
      return;
    }
    onUpdateQuery(trimmedQuery);
    setQuery("");
  };

  return (
    <header className={css.SearchBar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <div className={css.SearchFormInputContainer}>
          <input
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            className={css.SearchFormInput}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className={css.SearchFormButton}>
            <FaSearch />
          </button>
        </div>
        {children}
      </form>
    </header>
  );
}