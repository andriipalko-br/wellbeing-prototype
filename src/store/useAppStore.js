import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  SEED_DIRECTIONS,
  SEED_SPECIALISTS,
  SEED_USER,
  buildSeedBookings,
  buildSeedSlots,
} from '@/data/seed';

function makeInitialState() {
  return {
    currentUserId: SEED_USER.id,
    user: SEED_USER,
    specialists: SEED_SPECIALISTS,
    directions: SEED_DIRECTIONS,
    slots: buildSeedSlots(),
    bookings: buildSeedBookings(SEED_USER.id),
  };
}

export const useAppStore = create(
  persist(
    (set, get) => ({
      ...makeInitialState(),

      bookSlot: (specialistId, slotId) => {
        const state = get();
        const slot = state.slots.find((s) => s.id === slotId);
        if (!slot || slot.status !== 'available') return null;

        const booking = {
          id: `b-${Date.now()}`,
          userId: state.currentUserId,
          specialistId,
          slotId,
          dateISO: slot.dateISO,
          time: slot.time,
          status: 'upcoming',
          createdAt: new Date().toISOString(),
        };

        set({
          bookings: [...state.bookings, booking],
          slots: state.slots.map((s) =>
            s.id === slotId ? { ...s, status: 'booked' } : s
          ),
        });

        return booking;
      },

      resetToSeed: () => set(makeInitialState()),
    }),
    {
      name: 'wellbeing-store',
      version: 2,
    }
  )
);

/* ---------- selectors (pure functions, викликаються поза store) ---------- */

export function selectSpecialistById(state, id) {
  return state.specialists.find((s) => s.id === id);
}

export function selectDirectionById(state, id) {
  return state.directions.find((d) => d.id === id);
}

export function selectAvailableSlotsForSpecialist(state, specialistId) {
  return state.slots.filter(
    (s) => s.specialistId === specialistId && s.status === 'available'
  );
}

export function selectAvailableSlotCount(state, specialistId) {
  return selectAvailableSlotsForSpecialist(state, specialistId).length;
}

export function selectAvailableDays(state, specialistId) {
  const set = new Set();
  selectAvailableSlotsForSpecialist(state, specialistId).forEach((s) => set.add(s.dateISO));
  return set;
}

export function selectSlotsForDay(state, specialistId, dateISO) {
  return selectAvailableSlotsForSpecialist(state, specialistId)
    .filter((s) => s.dateISO === dateISO)
    .sort((a, b) => a.time.localeCompare(b.time));
}

export function selectUserBookingsWith(state, specialistId) {
  return state.bookings.filter(
    (b) => b.userId === state.currentUserId && b.specialistId === specialistId
  );
}

export function selectHasVisited(state, specialistId) {
  return state.bookings.some(
    (b) =>
      b.userId === state.currentUserId &&
      b.specialistId === specialistId &&
      b.status === 'past-attended'
  );
}

export function selectAllUserBookings(state) {
  return state.bookings.filter((b) => b.userId === state.currentUserId);
}
