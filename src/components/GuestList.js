import { useState } from 'react';
import AddGuest from './AddGuest';
import DisplayGuests from './DisplayGuests';

export default function GuestList() {
  const [guests, setGuests] = useState([]);

  function handleNewGuest(firstName, lastName) {
    console.log(firstName, lastName);
    setGuests([
      ...guests,
      {
        id: guests.length > 0 ? guests[guests.length - 1].id + 1 : 1,
        firstName: firstName,
        lastName: lastName,
        deadline: '',
        attending: false,
      },
    ]);
  }

  function deleteGuest(id) {
    const guestsCopy = [...guests];
    setGuests(guestsCopy.filter((guest) => guest.id !== id));
  }

  function updateAttendance(id) {
    setGuests(
      guests.map((guest) => {
        if (guest.id === id) {
          guest.attending = !guest.attending;
        }
        return guest;
      }),
    );
  }

  return (
    <div>
      <AddGuest handleNewGuest={handleNewGuest} />
      <DisplayGuests
        guests={guests}
        deleteGuest={deleteGuest}
        updateAttendance={updateAttendance}
      />
    </div>
  );
}
