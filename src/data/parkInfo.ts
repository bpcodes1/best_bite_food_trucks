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
  0: { open: '12:00', close: '20:00' },
  1: null,
  2: { open: '11:00', close: '21:00' },
  3: { open: '11:00', close: '21:00' },
  4: { open: '11:00', close: '21:00' },
  5: { open: '11:00', close: '22:00' },
  6: { open: '11:00', close: '22:00' },
};

export const parkInfo = {
  address: {
    line1: '3282 Silverton Rd NE',
    line2: 'Salem, OR 97301',
  },
  phone: '(512) 555-0148',
  email: 'hello@bestbitefoodpark.com',
  social: {
    instagram: 'https://instagram.com/bestbitefoodpark',
    facebook: 'https://facebook.com/bestbitefoodpark',
    tiktok: 'https://tiktok.com/@bestbitefoodpark',
  },
  /** Total number of food truck spaces the park has room for. */
  availableSlots: 6,
};
