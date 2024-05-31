import React, { useState } from 'react';
import Calendarsemi from './components/Calendarsemi';
import styled from 'styled-components';
import DiaryList from './components/DiaryList';
const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding-inline: 50px;
  width: calc(100vw - 115px);
  height: calc(100vh - 25px);
  background-image: linear-gradient(132deg, #fff 66%, #e4ceff 94%);
`;
const ListContainer = styled.div`
  align-items: center;
  justify-content: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 800px;
`;
function Testtemp() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [nextDay, setNextDay] = useState(null);
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
  let month = selectedDate && monthNames[Number(selectedDate.substr(4, 2)) - 1];
  let day = selectedDate && Number(selectedDate.substr(6));
  let title = '';
  let content = '';
  const handleDateSelect = (date, nextDate) => {
    setSelectedDate(date);
    setNextDay(nextDate);
  };
  return (
    <Container>
      <Calendarsemi onDateSelect={handleDateSelect} />
      {/* {selectedDate && <p>선택된 날짜: {selectedDate}</p>}
      {selectedDate && <p>월: {Number(selectedDate.substr(5,2))}</p>}
      {selectedDate && <p>일: {Number(selectedDate.substr(8))}</p>} */}
      {/* {nextDay && <p>다음날: {Number(nextDay)}</p>} */}
      <ListContainer>
        <DiaryList
          nowDate={day}
          month={day == 1 ? '' : month}
          day={day ? day - 1 : ''}
          title={title}
          content={content}
        ></DiaryList>
        <DiaryList
          nowDate={day}
          month={month}
          day={day}
          title={title}
          content={content}
        ></DiaryList>
        <DiaryList
          nowDate={day}
          month={nextDay ? month : ''}
          day={Number(nextDay)}
          title={title}
          content={content}
        ></DiaryList>
      </ListContainer>
    </Container>
  );
}
export default Testtemp;
