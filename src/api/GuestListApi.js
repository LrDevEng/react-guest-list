const baseUrl = 'http://localhost:4000';

// Api guest object definition
// type Guest = {
//   id: string;
//   firstName: string;
//   lastName: string;
//   deadline?: string;
//   attending: boolean;
// };

// CRUD functions to interact with guest list api

// C --> Create
// Add new guest to guest list
export async function addGuest(guest) {
  const response = await fetch(`${baseUrl}/guests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(guest),
  });
  return await response.json();
}

// R --> Read
// Get all guests from guest list
export async function getAllGuests() {
  const response = await fetch(`${baseUrl}/guests`);
  return await response.json();
}

// R --> Read
// Get individual guest from guest list
export async function getGuest(id) {
  const response = await fetch(`${baseUrl}/guests/${id}`);
  return await response.json();
}

// U --> Update
// Update information of individual guest
export async function updateGuest(id, update) {
  const response = await fetch(`${baseUrl}/guests/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(update),
  });
  return await response.json();
}

// D --> Delete
// Delete individual guest from guest list
export async function deleteGuest(id) {
  const response = await fetch(`${baseUrl}/guests/${id}`, { method: 'DELETE' });
  return await response.json();
}
