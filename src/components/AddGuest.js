import { useState } from 'react';

export default function AddGuest({ handleNewGuest }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <div>
      <form onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="first-name">First name</label>
        <input
          id="first-name"
          value={firstName}
          onChange={(event) => setFirstName(event.currentTarget.value)}
        />

        <label htmlFor="last-name">Last name</label>
        <input
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
