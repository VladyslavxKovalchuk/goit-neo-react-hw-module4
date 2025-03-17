import css from "./css/LoadMore.module.css";

export default function LoadMore({ onLoadMore, children }) {
  return (
    <button type="button" onClick={onLoadMore} className={css.Button}>
      {children}
    </button>
  );
}
