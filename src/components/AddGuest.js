import { useState } from 'react';
import styles from '../styles/AddGuest.module.css';

export default function AddGuest({ handleNewGuest, disabled, reset }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <div className={styles.addGuest}>
      <div>
        <h3>Luxury.</h3>
        <h3>Glamor.</h3>
        <h3>Thrill.</h3>
        <br />
        <h1>Deluxe - The Club</h1>
        <br />
        <h5>Join today!</h5>
        <br />
        <br />
        <form
          className={styles.form}
          disabled={disabled}
          onSubmit={(event) => event.preventDefault()}
        >
          <label htmlFor="first-name">First name</label>
          <input
            disabled={disabled}
            id="first-name"
            value={firstName}
            onChange={(event) => setFirstName(event.currentTarget.value)}
          />
          <label htmlFor="last-name">Last name</label>
          <input
            disabled={disabled}
            id="last-name"
            value={lastName}
            onChange={(event) => setLastName(event.currentTarget.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleNewGuest(firstName, lastName);
                setFirstName('');
                setLastName('');
              }
            }}
          />
        </form>
      </div>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
