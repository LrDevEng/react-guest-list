import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import * as guestListApi from '../api/GuestListApi.js';
import styles from '../styles/GuestList.module.css';
import { guestFilters } from '../util/stateObjects.js';
import AddGuest from './AddGuest';
import DisplayGuests from './DisplayGuests';
import LoadingSpinner from './LoadingSpinner.js';
import MenuSmall from './MenuSmall.js';

// Derived state function to filter guests
function filterGuests(guests, filterType) {
  switch (filterType) {
    case guestFilters.showAttending:
      return guests.filter((guest) => guest.attending);
    case guestFilters.showNotAttending:
      return guests.filter((guest) => !guest.attending);
    default: {
      return guests;
    }
  }
}

export default function GuestList() {
  // State
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddMenuSmall, setShowAddMenuSmall] = useState(true);
  const [filterType, setFilterType] = useState(guestFilters.showAll);

  const deflate = useMediaQuery({ maxWidth: 960 });

  // Initial fetch of guest list from api
  useEffect(() => {
    console.log('in use effect');
    guestListApi
      .getAllGuests()
      .then((allGuests) => setGuests(allGuests))
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  // Add new guest
  function handleNewGuest(firstName, lastName) {
    guestListApi
      .addGuest({
        firstName: firstName,
        lastName: lastName,
      })
      .then((newGuest) => {
        setGuests([...guests, newGuest]);
      })
      .catch((error) => console.log(error));
  }

  // Delete specific guest
  function deleteGuest(id) {
    guestListApi
      .deleteGuest(id)
      .then((deletedGuest) => {
        const guestsCopy = [...guests];
        setGuests(guestsCopy.filter((guest) => guest.id !== deletedGuest.id));
      })
      .catch((error) => console.log(error));
  }

  // Update attendance status of specific guest
  function toggleAttendance(id, isAttending) {
    guestListApi
      .updateGuest(id, { attending: isAttending })
      .then((updatedGuest) => {
        setGuests(
          guests.map((guest) => {
            if (guest.id === updatedGuest.id) {
              guest.attending = updatedGuest.attending;
            }
            return guest;
          }),
        );
      })
      .catch((error) => console.log(error));
  }

  // Delete all guests
  function deleteAllGuests() {
    const promises = [];
    guests.forEach((guest) => {
      promises.push(guestListApi.deleteGuest(guest.id));
    });

    Promise.all(promises)
      .then(() => {
        guestListApi
          .getAllGuests()
          .then((allGuests) => {
            setGuests(allGuests);
            setFilterType(guestFilters.showAll);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className={styles.guestList}>
      {deflate ? (
        <MenuSmall
          onMenuAction={() => {
            setShowAddMenuSmall((prev) => !prev);
          }}
        >
          {showAddMenuSmall && (
            <section>
              <AddGuest
                disabled={isLoading}
                handleNewGuest={handleNewGuest}
                reset={deleteAllGuests}
              />
            </section>
          )}
        </MenuSmall>
      ) : (
        <section className={styles.menu}>
          <AddGuest
            disabled={isLoading}
            handleNewGuest={handleNewGuest}
            reset={deleteAllGuests}
          />
        </section>
      )}
      <section className={styles.list}>
        <div className={styles.info}>
          {isLoading ? (
            <div className={styles.loading}>
              <div>Loading...</div>
              <LoadingSpinner />
            </div>
          ) : (
            <DisplayGuests
              guests={filterGuests(guests, filterType)}
              deleteGuest={deleteGuest}
              toggleAttendance={toggleAttendance}
              filterType={filterType}
              setFilterType={setFilterType}
            />
          )}
        </div>
      </section>
    </div>
  );
}
