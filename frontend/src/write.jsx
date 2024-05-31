import React, { useState } from 'react';
import Calendarsemi from './components/Calendarsemi';
import styled from 'styled-components';
import axios from 'axios';

const Main = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 50px;
  margin-top: 80px;
`;
const Container = styled.div`
  margin-left: 20px;
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(132deg, #fff 66%, #e4ceff 94%);
`;

const Box = styled.div`
  width: 737px;
  display: flex;
  margin: 35px 0 35px 49px;
  padding: 16px 26px 16px 32px;
  border-radius: 25px;
  background-color: #a99bef;
`;

const Title = styled.h1`
  width: 30px;
  height: 29px;
  flex-grow: 0;
  margin: 0 27px 35px 0;
  font-family: Pretendard;
  font-size: 24.6px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 2px;
  text-align: left;
  color: #fff;
`;

const TitleBox = styled.input`
  width: 650px;
  height: 50px;
  margin: 0 0 0 27px;
  border-radius: 15.4px;
  background-color: #c8bdfd;
  font-size: 24px;
  border: none;
  padding: 10px;
`;

const ContentBox = styled.div`
  width: 747px;
  height: 414px;
  margin: 35px 0 0 49px;
  padding: 16px 26px 25px 17px;
  border-radius: 25px;
  background-color: #a99bef;
`;
const Content = styled.p`
  width: 54px;
  height: 0px;
  flex-grow: 0;
  margin: 0 27px 35px 0;
  font-family: Pretendard;
  font-size: 24.6px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 2px;
  text-align: left;
  color: #fff;
`;

const ContentBox2 = styled.textarea`
  width: 720px;
  height: 330px;
  margin-top: 10px;
  border-radius: 15.4px;
  background-color: #c8bdfd;
  border: none;
  padding: 20px;
  font-size: 18px;
`;

const SaveBack = styled.div`
  margin-left: 480px;
`;

const Play = styled.button`
  width: 188px;
  height: 71px;
  flex-grow: 0;
  margin: 0 0 0 32px;
  padding: 21px 65px;
  border-radius: 15.4px;
  border: none;
  background-color: #ffc5c1;
  font-weight: 800;
  font-size: 18px;
  color: #fff;
  transition:
    background-color 0.3s ease,
    transform 0.1s ease; /* 추가: 트랜지션 효과 */
  &:hover {
    background-color: #ff52e2c5; /* 호버 시 배경 색상 변경 */
  }
`;

const Back = styled.button`
  width: 94px;
  height: 71px;
  flex-grow: 0;
  margin: 21px 0 55px 44px;
  padding: 21px 17px 21px 18px;
  border-radius: 15.4px;
  font-weight: 800;
  font-size: 18px;
  border: none;
  color: #fff;
  background-color: #ffc5c1;
  transition:
    background-color 0.3s ease,
    transform 0.1s ease; /* 추가: 트랜지션 효과 */
  &:hover {
    background-color: #ff52e2c5; /* 호버 시 배경 색상 변경 */
  }
`;

function Read() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handlePlayClick = async () => {
      const response = await axios.post('http://localhost:5000/api/diary', {
        date: selectedDate,
        title: title,
        content: content,
      })
    alert("저장 완료!")
    window.location.href = `http://localhost:3000/read/${response.data.id}`;
  }

  return (
    <>
      <Main>
        <Calendarsemi onDateSelect={handleDateSelect} />
        <Container>
          <Box>
            <Title>Title</Title>
            <TitleBox value={title} onChange={(e) => setTitle(e.target.value)} />
          </Box>

          <ContentBox>
            <Content>Content</Content>
            <ContentBox2 value={content} onChange={(e) => setContent(e.target.value)} />
          </ContentBox>

          <SaveBack>
            <Play onClick={handlePlayClick}>Save</Play>
            <Back>Back</Back>
          </SaveBack>
        </Container>
      </Main>
    </>
  );
}

export default Read;
