export default function DisplayGuests({
  guests,
  deleteGuest,
  updateAttendance,
}) {
  return (
    <div>
      {guests.map((guest) => {
        return (
          <div key={`guest-${guest.id}`} data-test-id="guest">
            {guest.firstName}
            {guest.lastName}
            <input
              aria-label="attending"
              type="checkbox"
              checked={guest.attending}
              onChange={() => {
                updateAttendance(guest.id);
              }}
            />
            <button
              onClick={() => {
                deleteGuest(guest.id);
              }}
            >
              Remove
            </button>
          </div>
        );
      })}
    </div>
  );
}
