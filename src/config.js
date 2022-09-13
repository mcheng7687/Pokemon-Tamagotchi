const backend_URL = process.env.NODE_ENV !== "production" ? 'http://localhost:3001' : 'https://pokemon-tamagotchi-backend.herokuapp.com';

console.log('***********************',process.env.NODE_ENV,'**********************')
const localStorageId = "pokemon-trainer";
// For debounce search timer
const searchTimer = 1500;

// Display pokemon image duration
const displayTimer = 3000;
const transDurationTimer = 1000;

export { backend_URL, localStorageId, searchTimer, displayTimer, transDurationTimer };