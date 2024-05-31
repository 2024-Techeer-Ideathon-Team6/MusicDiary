import React, { useState } from 'react';
import styled from 'styled-components';

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
`;

const Day = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const Calendar = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleDayClick = (day) => {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const formattedDate = `${selectedDate.getFullYear()}.${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}.${selectedDate.getDate().toString().padStart(2, '0')}`;
    onDateSelect(formattedDate);
  };

  return (
    <CalendarContainer>
      <h2>{`${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`}</h2>
      <DaysGrid>
        {daysArray.map((day) => (
          <Day key={day} onClick={() => handleDayClick(day)}>
            {day}
          </Day>
        ))}
      </DaysGrid>
    </CalendarContainer>
  );
};

export default Calendar;
