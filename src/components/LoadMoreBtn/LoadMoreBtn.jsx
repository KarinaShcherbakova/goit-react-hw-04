import styles from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick }) => (
  <div className={styles.loadMoreBtnWrapper}>
    <button className={styles.loadMoreBtn} onClick={onClick}>
      Load more
    </button>
  </div>
);

export default LoadMoreBtn;