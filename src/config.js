const backend_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const localStorageId = "pokemon-trainer";
// For debounce search timer
const searchTimer = 1500;

// Display pokemon image duration
const displayTimer = 3000;
const transDurationTimer = 1000;

export { backend_URL, localStorageId, searchTimer, displayTimer, transDurationTimer };