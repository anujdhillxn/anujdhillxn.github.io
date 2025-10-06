import { writable } from 'svelte/store';

export type ChargeValue = -1 | 0 | 1;

export const cursorCharge = writable<ChargeValue>(0); // -1 (blue), 0 (neutral), 1 (red)
