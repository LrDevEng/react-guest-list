import { useState } from 'react';

export default function AddGuest({ handleNewGuest, disabled }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <div>
      <form disabled={disabled} onSubmit={(event) => event.preventDefault()}>
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
  );
}
