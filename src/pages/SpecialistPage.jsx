import { useMemo, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ChevronLeft, CalendarDays } from 'lucide-react';
import {
  useAppStore,
  selectSpecialistById,
  selectAvailableDays,
  selectSlotsForDay,
  selectUserBookingsWith,
} from '@/store/useAppStore';
import { Card, CardContent } from '@/components/ui/card';
import Avatar from '@/components/Avatar';
import BookingCalendar from '@/features/booking/BookingCalendar';
import TimeSlotPicker from '@/features/booking/TimeSlotPicker';
import BookingSummary from '@/features/booking/BookingSummary';
import BookingSuccess from '@/features/booking/BookingSuccess';
import ConsultationHistory from '@/features/booking/ConsultationHistory';
import { toISODate } from '@/utils/dates';

export default function SpecialistPage() {
  const { id } = useParams();
  const state = useAppStore();
  const bookSlot = useAppStore((s) => s.bookSlot);
  const specialist = selectSpecialistById(state, id);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const directionsById = useMemo(
    () => Object.fromEntries(state.directions.map((d) => [d.id, d])),
    [state.directions]
  );

  if (!specialist) {
    return <Navigate to="/" replace />;
  }

  const history = selectUserBookingsWith(state, specialist.id).filter(
    (b) => b.status !== 'upcoming'
  );
  const availableDays = selectAvailableDays(state, specialist.id);
  const selectedISO = selectedDate ? toISODate(selectedDate) : null;
  const slotsForDay = selectedISO ? selectSlotsForDay(state, specialist.id, selectedISO) : [];
  const selectedSlot = slotsForDay.find((s) => s.id === selectedSlotId) ?? null;

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlotId(null);
  };

  const handleConfirm = () => {
    if (!selectedSlot) return;
    const booking = bookSlot(specialist.id, selectedSlot.id);
    if (booking) setConfirmedBooking(booking);
  };

  return (
    <div className="flex flex-col gap-6">
      <nav className="flex items-center gap-1 text-sm">
        <Link
          to="/"
          className="inline-flex items-center gap-1 font-bold text-brand-700 hover:underline"
        >
          <ChevronLeft className="h-4 w-4" />
          Спеціалісти
        </Link>
        <span className="text-muted-foreground">· {specialist.name}</span>
      </nav>

      {/* Block 1: Specialist header */}
      <Card className="overflow-hidden rounded-2xl shadow-card">
        <div className="h-24 bg-brand-strong" />
        <CardContent className="flex flex-col gap-4 p-6 pt-0 sm:flex-row sm:gap-6">
          <div className="-mt-12">
            <Avatar name={specialist.name} colorHex={specialist.colorHex} size="2xl" ring />
          </div>
          <div className="flex-1 sm:pt-4">
            <h1 className="text-3xl">{specialist.name}</h1>
            <p className="mt-1 text-sm font-bold text-muted-foreground">{specialist.title}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {specialist.directions.map((dirId) => (
                <span
                  key={dirId}
                  className="rounded-full border border-brand-100 bg-brand-50 px-2.5 py-0.5 text-xs font-bold text-brand-700"
                >
                  {directionsById[dirId]?.label ?? dirId}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-foreground/90">
              {specialist.fullDescription}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Block 2: Consultation history */}
      <ConsultationHistory bookings={history} />

      {confirmedBooking ? (
        <BookingSuccess
          specialistName={specialist.name}
          dateISO={confirmedBooking.dateISO}
          time={confirmedBooking.time}
        />
      ) : (
        <Card className="rounded-2xl shadow-card">
          <CardContent className="grid grid-cols-1 gap-6 p-6 md:grid-cols-[auto,1px,1fr] md:gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-bold">Оберіть дату</h2>
              <BookingCalendar
                availableDays={availableDays}
                selectedDate={selectedDate}
                onSelect={handleDateSelect}
              />
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                  Є доступні слоти
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full ring-1 ring-brand-300" />
                  Сьогодні
                </span>
              </div>
            </div>

            <div className="hidden md:block md:border-l md:border-neutral-200" />

            <div className="flex flex-col gap-4">
              {selectedDate ? (
                <TimeSlotPicker
                  dateISO={selectedISO}
                  slots={slotsForDay}
                  selectedSlotId={selectedSlotId}
                  onSelect={setSelectedSlotId}
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-brand-100 bg-brand-soft p-8 text-center">
                  <CalendarDays className="h-12 w-12 text-brand-500/60" strokeWidth={1.5} />
                  <p className="text-sm text-muted-foreground">
                    Оберіть дату в календарі, щоб побачити доступні слоти.
                  </p>
                </div>
              )}

              {selectedSlot && (
                <BookingSummary
                  specialistName={specialist.name}
                  dateISO={selectedSlot.dateISO}
                  time={selectedSlot.time}
                  onConfirm={handleConfirm}
                />
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
