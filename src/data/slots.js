import { addDays, format } from 'date-fns';

// Детермінований псевдорандом (без сіду можна, бо seed виконується один раз).
// Щоб результат був стабільним між перезапусками, використаємо хеш від specialistId + dateISO.
function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pseudoRandom(seed) {
  return (hash(seed) % 1000) / 1000;
}

const TIME_POOL = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

/**
 * Генерує слоти на 4 тижні наперед починаючи з сьогодні.
 * Для кожного дня: з імовірністю ~65% спеціаліст має 1–4 слоти; інакше день закрито.
 * Вихідні дні (Sat/Sun) — рідше мають слоти.
 */
export function generateSlotsForSpecialist(specialistId, weeks = 4) {
  const slots = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const totalDays = weeks * 7;

  for (let i = 0; i < totalDays; i++) {
    const day = addDays(today, i);
    const dateISO = format(day, 'yyyy-MM-dd');
    const isWeekend = day.getDay() === 0 || day.getDay() === 6;
    const rnd = pseudoRandom(`${specialistId}-${dateISO}`);
    const threshold = isWeekend ? 0.3 : 0.72;
    if (rnd > threshold) continue;

    const slotCount = 1 + Math.floor(pseudoRandom(`${specialistId}-${dateISO}-count`) * 4);
    const chosenTimes = new Set();
    for (let k = 0; k < slotCount; k++) {
      const idx = Math.floor(pseudoRandom(`${specialistId}-${dateISO}-${k}`) * TIME_POOL.length);
      chosenTimes.add(TIME_POOL[idx]);
    }
    const sortedTimes = [...chosenTimes].sort();
    sortedTimes.forEach((time, idx) => {
      slots.push({
        id: `${specialistId}-${dateISO}-${idx}`,
        specialistId,
        dateISO,
        time,
        status: 'available',
      });
    });
  }
  return slots;
}
