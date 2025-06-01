import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarView.css';

export default function CalendarView() {
    const [date, setDate] = useState(new Date());
    return (
        <div className="calendar-view">
        <h2>Calendário</h2>
        <Calendar onChange={setDate} value={date} />
        <p>Data selecionada: {date.toDateString()}</p>
        </div>
    );
}
