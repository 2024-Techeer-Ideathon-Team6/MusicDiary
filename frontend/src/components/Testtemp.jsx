import React, { useState } from 'react';
import Calendarsemi from './Calendarsemi';
import styled from 'styled-components';
import DiaryList from './DiaryList';

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #FFFFFF;
  padding-inline: 50px;
  width: calc(100vw - 115px);
  height: calc(100vh - 25px);
`;
const ListContainer = styled.div`
  align-items: center;
  justify-content: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  width:800px;
`;

function Testtemp() {
  const [selectedDate, setSelectedDate] = useState(null);

  
  var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];

  let month = selectedDate && monthNames[Number(selectedDate.substr(5,2))-1]
  let day = selectedDate && Number(selectedDate.substr(8))
  console.log(month)
  console.log(day)

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };
  return (
    <Container>
      <Calendarsemi onDateSelect={handleDateSelect} />
      {/* {selectedDate && <p>선택된 날짜: {selectedDate}</p>}
      {selectedDate && <p>월: {Number(selectedDate.substr(5,2))}</p>}
      {selectedDate && <p>일: {Number(selectedDate.substr(8))}</p>} */}

      <ListContainer>
        
        <DiaryList nowDate={day} month={month} day={day-1}></DiaryList>
        <DiaryList nowDate={day} month={month} day={day}></DiaryList>
        <DiaryList nowDate={day} month={month} day={day+1}></DiaryList>
      </ListContainer>
    </Container>
  );
}

export default Testtemp;
