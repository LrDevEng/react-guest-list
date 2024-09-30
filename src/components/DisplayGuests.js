import styles from '../styles/DisplayGuests.module.css';
import { guestFilters } from '../util/stateObjects';

export default function DisplayGuests({
  guests,
  deleteGuest,
  toggleAttendance,
  filterType,
  setFilterType,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.cardHolder}>
        <h2>Our VIPs</h2>
        <fieldset>
          <legend>Filter</legend>
          <input
            type="radio"
            name="filter"
            value={guestFilters.showAll}
            id="none"
            checked={filterType === guestFilters.showAll}
            onChange={(event) => {
              setFilterType(event.target.value);
            }}
          />
          <label htmlFor="none">None</label>

          <input
            type="radio"
            name="filter"
            value={guestFilters.showAttending}
            id="attending"
            checked={filterType === guestFilters.showAttending}
            onChange={(event) => {
              setFilterType(event.target.value);
            }}
          />
          <label htmlFor="attending">Attending</label>

          <input
            type="radio"
            name="filter"
            value={guestFilters.showNotAttending}
            id="notAttending"
            checked={filterType === guestFilters.showNotAttending}
            onChange={(event) => {
              setFilterType(event.target.value);
            }}
          />
          <label htmlFor="notAttending">Not Attending</label>
        </fieldset>
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
