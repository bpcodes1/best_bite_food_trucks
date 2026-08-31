export interface DaySchedule {
  open: string;
  close: string;
}

/**
 * Weekly hours keyed by `Date#getDay()` (0 = Sunday … 6 = Saturday). A value of
 * `null` means the park is closed that day. Update this in one place to change
 * both the live status bar and the footer hours list.
 */
export const weeklyHours: Record<number, DaySchedule | null> = {
  0: { open: '09:00', close: '20:00' },
  1: { open: '09:00', close: '20:00' },
  2: { open: '09:00', close: '20:00' },
  3: { open: '09:00', close: '20:00' },
  4: { open: '09:00', close: '20:00' },
  5: { open: '09:00', close: '20:00' },
  6: { open: '09:00', close: '20:00' },
};

export const parkInfo = {
  address: {
    line1: '3282 Silverton Rd NE',
    line2: 'Salem, OR 97301-8655',
  },
  phone: '(503) 902-2050',
  email: 'bestbite868@gmail.com',
  social: {
    instagram: 'https://instagram.com/bestbitefoodpark',
    facebook: 'https://www.facebook.com/Thebestbitefoodpark/',
    tiktok: 'https://tiktok.com/@the_bestbite_',
  },
  /** Number of currently open (unleased) food truck spaces. */
  availableSlots: 4,
  /** Total number of food truck spaces the park has room for. */
  totalSlots: 15,
};
