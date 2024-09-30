import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import * as guestListApi from '../api/GuestListApi.js';
import styles from '../styles/GuestList.module.css';
import AddGuest from './AddGuest';
import DisplayGuests from './DisplayGuests';
import LoadingSpinner from './LoadingSpinner.js';
import MenuSmall from './MenuSmall.js';

export default function GuestList() {
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showAddMenuSmall, setShowAddMenuSmall] = useState(true);

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
          .then((allGuests) => setGuests(allGuests))
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
              guests={guests}
              deleteGuest={deleteGuest}
              toggleAttendance={toggleAttendance}
            />
          )}
        </div>
      </section>
    </div>
  );
}
