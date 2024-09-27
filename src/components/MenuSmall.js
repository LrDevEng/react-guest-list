import styles from '../styles/MenuSmall.module.css';

export default function MenuSmall({ onMenuAction, children }) {
  return (
    <section className={styles.menu}>
      <button onClick={onMenuAction}>...</button>
      <div>{children}</div>
    </section>
  );
}
