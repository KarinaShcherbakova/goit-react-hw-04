import { Rings } from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader = () => (
  <div className={styles.loader}>
    <Rings height="80" width="80" color="#00BFFF" ariaLabel="loading" />
  </div>
);

export default Loader;