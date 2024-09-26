import { useEffect, useState } from 'react';
import * as guestListApi from '../api/GuestListApi.js';
import AddGuest from './AddGuest';
import DisplayGuests from './DisplayGuests';

export default function GuestList() {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    console.log('in use effect');
    guestListApi
      .getAllGuests()
      .then((allGuests) => setGuests(allGuests))
      .catch((error) => console.log(error));
  }, []);

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

  function deleteGuest(id) {
    guestListApi
      .deleteGuest(id)
      .then((deletedGuest) => {
        const guestsCopy = [...guests];
        setGuests(guestsCopy.filter((guest) => guest.id !== deletedGuest.id));
      })
      .catch((error) => console.log(error));
  }

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

  return (
    <div>
      <AddGuest handleNewGuest={handleNewGuest} />
      <DisplayGuests
        guests={guests}
        deleteGuest={deleteGuest}
        toggleAttendance={toggleAttendance}
      />
    </div>
  );
}
