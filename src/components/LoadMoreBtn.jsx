import css from "./css/LoadMoreBtn.module.css";

export default function LoadMoreBtn({ onLoadMore, children }) {
  return (
    <button type="button" onClick={onLoadMore} className={css.Button}>
      {children}
    </button>
  );
}
