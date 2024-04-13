import React, { useState } from 'react';
import Calendar from 'react-calendar';

const Dates = ({ pickedDate, setPickedDate}) => {
    const [date, setDate] = useState(new Date());

    const handleDateChange = newDate => {
        setDate(newDate);
        setPickedDate(newDate);
    };

    return (
        <main className="main_calendar">
            <div className="dates">
                <div className="calendar_centered">
                    <Calendar onChange={handleDateChange} value={date} showNeighboringMonth={true}/>
                </div>
            </div>
        </main>
    );
};

export default Dates;
