import styles from '../styles/DisplayGuests.module.css';

export default function DisplayGuests({
  guests,
  deleteGuest,
  toggleAttendance,
}) {
  if (guests.length === 0) {
    return <div />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.cardHolder}>
        <h2>Our VIPs</h2>
        <div className={styles.card}>
          <h6>Name</h6>
          <h6>Surname</h6>
          <h6>Attending</h6>
        </div>
        {guests.map((guest) => {
          return (
            <div
              className={styles.card}
              key={`guest-${guest.id}`}
              data-test-id="guest"
            >
              <div>{guest.firstName}</div>
              <div>{guest.lastName}</div>
              <input
                aria-label="attending"
                type="checkbox"
                checked={guest.attending}
                onChange={(event) => {
                  toggleAttendance(guest.id, event.currentTarget.checked);
                }}
              />
              <button
                aria-label={`Remove-${guest.id}`}
                onClick={() => {
                  deleteGuest(guest.id);
                }}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
