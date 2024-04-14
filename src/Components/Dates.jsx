import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';

const Dates = ({ pickedDate, setPickedDate}) => {
    const [date, setDate] = useState(new Date());
    const formattedDate = format(date, 'MM/dd/yyyy');

    const handleDateChange = newDate => {
        setDate(newDate);
        setPickedDate(format(newDate, 'MM/dd/yyyy'));
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
