import { writable } from 'svelte/store';

export const cursorCharge = writable(0); // -1 (blue), 0 (neutral), 1 (red)
