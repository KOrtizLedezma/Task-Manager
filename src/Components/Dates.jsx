import React, { useState } from 'react';
import Calendar from 'react-calendar';

const Dates = () => {
    const [date, setDate] = useState(new Date());
    console.log(date);

    return (
        <main className="main_calendar">
            <div className="dates">
                <div className="calendar_centered">
                    <Calendar onChange={setDate} value={date} />
                </div>
            </div>
        </main>
    );
};

export default Dates;
