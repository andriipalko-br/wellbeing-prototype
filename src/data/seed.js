import { generateSlotsForSpecialist } from './slots';

export const SEED_DIRECTIONS = [
  { id: 'stress', label: 'Стрес та тривога' },
  { id: 'burnout', label: 'Вигорання' },
  { id: 'family', label: 'Сімейні відносини' },
  { id: 'depression', label: 'Депресія' },
  { id: 'self-esteem', label: 'Самооцінка' },
  { id: 'trauma', label: 'Травма та ПТСР' },
  { id: 'growth', label: 'Особистісний розвиток' },
];

export const SEED_USER = { id: 'u1', name: 'John Doe' };

export const SEED_SPECIALISTS = [
  {
    id: 's1',
    name: 'Олена Ковальчук',
    title: 'Психолог, гештальт-терапевт',
    directions: ['stress', 'burnout', 'growth'],
    shortDescription:
      'Психолог із 7-річним досвідом. Гештальт-терапія, робота зі стресом і тривожністю.',
    fullDescription:
      'Олена спеціалізується на роботі зі стресом, тривожністю та емоційним вигоранням. Має 7 років практичного досвіду, працює в підході гештальт-терапії. Допомагає клієнтам знаходити ресурси та відновлювати внутрішній баланс.',
    colorHex: '#08a843',
  },
  {
    id: 's2',
    name: 'Максим Бондаренко',
    title: 'Клінічний психолог, КПТ',
    directions: ['depression', 'trauma', 'stress'],
    shortDescription:
      'Спеціаліст із травматерапії, КПТ. Досвід роботи з ПТСР та депресивними станами.',
    fullDescription:
      'Максим — клінічний психолог із 10-річним досвідом. Працює у підході когнітивно-поведінкової терапії та EMDR. Спеціалізується на роботі з ПТСР, депресією та наслідками травматичних подій.',
    colorHex: '#08a843',
  },
  {
    id: 's3',
    name: 'Наталія Савченко',
    title: 'Сімейний психолог',
    directions: ['family', 'self-esteem', 'growth'],
    shortDescription:
      'Сімейний психолог. Допомагає парам та окремим клієнтам у побудові здорових стосунків.',
    fullDescription:
      'Наталія працює з парами та окремими клієнтами. Допомагає налагоджувати комунікацію, вирішувати конфлікти, відновлювати довіру та розбудовувати здорові стосунки. Досвід роботи — 8 років.',
    colorHex: '#08a843',
  },
  {
    id: 's4',
    name: 'Ірина Шевченко',
    title: 'Психотерапевт, КПТ',
    directions: ['self-esteem', 'growth', 'stress'],
    shortDescription:
      'Робота з самооцінкою та особистісним розвитком. КПТ, схема-терапія.',
    fullDescription:
      'Ірина допомагає клієнтам усвідомити власні ресурси, попрацювати із самооцінкою, знайти точки росту. У роботі поєднує КПТ та схема-терапію. Практика — 6 років.',
    colorHex: '#08a843',
  },
  {
    id: 's5',
    name: 'Дмитро Левченко',
    title: 'Психолог, екзистенційний підхід',
    directions: ['depression', 'growth', 'burnout'],
    shortDescription:
      'Працює з пошуком сенсу, вигоранням, життєвими кризами.',
    fullDescription:
      'Дмитро — психолог в екзистенційно-гуманістичному підході. Допомагає клієнтам віднаходити сенс, проживати кризи та адаптуватися до змін. 5 років практики.',
    colorHex: '#08a843',
  },
  {
    id: 's6',
    name: 'Катерина Петренко',
    title: 'Психолог, схема-терапевт',
    directions: ['family', 'self-esteem', 'trauma'],
    shortDescription:
      'Схема-терапія, робота з ранніми дезадаптивними схемами та стосунками.',
    fullDescription:
      'Катерина працює у підході схема-терапії, спеціалізується на дослідженні ранніх дезадаптивних схем, які впливають на стосунки та самосприйняття. 9 років практики.',
    colorHex: '#08a843',
  },
  {
    id: 's7',
    name: 'Андрій Мельник',
    title: 'Психолог, КПТ',
    directions: ['stress', 'depression', 'self-esteem'],
    shortDescription:
      'Робота з тривогою, панічними атаками, депресивними станами. КПТ.',
    fullDescription:
      'Андрій — психолог у підході КПТ. Спеціалізується на тривожних розладах, панічних атаках, депресії. Має 4 роки практичного досвіду.',
    colorHex: '#08a843',
  },
];

// Користувач раніше консультувався з Оленою (s1) та Катериною (s6).
// Status: 'past-attended' | 'cancelled'
export function buildSeedBookings(userId) {
  return [
    {
      id: 'b-seed-1',
      userId,
      specialistId: 's1',
      slotId: 'seed-slot-1',
      dateISO: '2025-03-12',
      time: '11:00',
      status: 'past-attended',
      createdAt: '2025-03-01T10:00:00Z',
    },
    {
      id: 'b-seed-2',
      userId,
      specialistId: 's1',
      slotId: 'seed-slot-2',
      dateISO: '2025-02-05',
      time: '14:00',
      status: 'cancelled',
      createdAt: '2025-01-20T10:00:00Z',
    },
    {
      id: 'b-seed-3',
      userId,
      specialistId: 's6',
      slotId: 'seed-slot-3',
      dateISO: '2025-03-28',
      time: '16:00',
      status: 'past-attended',
      createdAt: '2025-03-15T10:00:00Z',
    },
  ];
}

export function buildSeedSlots() {
  return SEED_SPECIALISTS.flatMap((s) => generateSlotsForSpecialist(s.id));
}
