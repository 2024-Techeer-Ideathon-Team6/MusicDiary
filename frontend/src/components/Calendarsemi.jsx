import React, { useState } from 'react';
import styled from 'styled-components';
const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #a898ef;
  width: 500px;
  height: 600px;
  border-radius: 25px;
  padding-top: 30px;
  margin-left: 140px;
  padding: 20px;
`;
const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 15px;
`;
const Day = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #ffffff;
  border: 5px solid #ffffff;
  border-radius: 10px;
  font-weight: bold;
  background-color: ${(props) =>
    props.isSelected ? '#FF94A4' : 'none'}; // 클릭된 날짜의 배경색 변경
  &:hover {
    background-color: #ffe4e1;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 480px;
  margin-bottom: 10px;
  color: #ffffff;
`;
const MonthButton = styled.button`
  cursor: pointer;
`;
const DayOfWeek = styled.div`
  font-weight: bold;
  text-align: center;
  color: #ffffff;
  margin-top: 50px;
`;
const MonthButtonIcon = styled.img`
  width: 20px;
  height: 25px;
  margin-block: auto;
  text-align: center;
  margin-inline: 10px;
  cursor: pointer;
`;
const DateTextCover = styled.div`
  display: flex;
  text-align: center;
`;
const YearText = styled.p`
  font-weight: bold;
  font-size: 57px;
  margin: 0;
`;
const MonthText = styled.p`
  font-weight: bold;
  font-size: 36px;
  margin: 22px 0 0 0;
`;
const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
var monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const Calendarsemi = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const handleDayClick = (day) => {
    setSelectedDay(day);
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const nextDate =
      day < daysInMonth
        ? new Date(currentDate.getFullYear(), currentDate.getMonth(), day + 1)
        : null;
    const formattedDate = `${selectedDate.getFullYear()}${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}${selectedDate.getDate().toString().padStart(2, '0')}`;
    const formattedNextDate = nextDate ? `${nextDate.getDate().toString().padStart(2, '0')}` : null;
    onDateSelect(formattedDate, formattedNextDate);
  };
  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDay(null); // 달이 변경되면 선택된 날짜 초기화
  };
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDay(null); // 달이 변경되면 선택된 날짜 초기화
  };
  return (
    <CalendarContainer>
      <Header>
        <MonthButtonIcon src={'/prevMonth.png'} onClick={handlePreviousMonth}></MonthButtonIcon>
        <DateTextCover>
          <YearText>{`${currentDate.getFullYear()}`}</YearText>
          <MonthText>{`${monthNames[currentDate.getMonth()]}`}</MonthText>
        </DateTextCover>
        <MonthButtonIcon src={'/nextMonth.png'} onClick={handleNextMonth}></MonthButtonIcon>
      </Header>
      <DaysGrid>
        {weekDays.map((day) => (
          <DayOfWeek key={day}>{day}</DayOfWeek>
        ))}
        {Array.from({ length: firstDayOfMonth }, (_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {daysArray.map((day) => (
          <Day key={day} isSelected={day === selectedDay} onClick={() => handleDayClick(day)}>
            {day}
          </Day>
        ))}
      </DaysGrid>
    </CalendarContainer>
  );
};
export default Calendarsemi;
