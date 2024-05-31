import React from 'react';
import Calendarsemi from './components/Calendarsemi';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
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
  background-image: linear-gradient(132deg, #fff 66%, #E4CEFF 94%);
`;
const Box = styled.div`
  width: 737px;
  display: flex;
  margin: 35px 0 35px 49px;
  padding: 16px 26px 16px 32px;
  border-radius: 25px;
  background-color: #A99BEF;
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
const TitleBox = styled.div`
  width: 650px;
  height: 64px;
  margin: 0 0 0 27px;
  border-radius: 15.4px;
  background-color: #C8BDFD;
  font-size: 24px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;
const ContentBox = styled.div`
  width: 747px;
  height: 414px;
  margin: 35px 0 0 49px;
  padding: 16px 26px 25px 17px;
  border-radius: 25px;
  background-color: #A99BEF;
`;
const Content = styled.p`
  width: 54px;
  flex-grow: 0;
  margin: 0 27px 5px 0;
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
const ContentBox2 = styled.div`
  width: 710px;
  height: 320px;
  margin: 20px 0 0 4px;
  border-radius: 15.4px;
  background-color: #C8BDFD;
  font-size: 24px;
  color: #fff;
  padding: 20px;
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
  background-color: #FFC5C1;
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
  background-color: #FFC5C1;
  transition:
    background-color 0.3s ease,
    transform 0.1s ease; /* 추가: 트랜지션 효과 */
  &:hover {
    background-color: #ff52e2c5; /* 호버 시 배경 색상 변경 */
  }
`;
function Read() {
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/list');
  };
  return (
    <>
      <Main>
        <Calendarsemi onDateSelect={handleDateSelect} />
        <Container>
          <Box>
            <Title>Title</Title>
            <TitleBox>ㅁㄴㅁㄴㅁㄴ</TitleBox>
          </Box>
          <ContentBox>
            <Content>Content</Content>
            <ContentBox2>ㅁㄴㅁㄴㅁㄴ</ContentBox2>
          </ContentBox>
          <SaveBack>
            <Play>Play</Play>
            <Back onClick={handleClick}>Back</Back>
          </SaveBack>
        </Container>
      </Main>
    </>
  );
}
export default Read;