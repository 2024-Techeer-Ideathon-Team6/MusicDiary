import { useState } from 'react';
import back from './assets/background.svg';
import modal from './assets/1.svg';
import modal2 from './assets/2.svg';
import modal3 from './assets/3.svg';
import styled, { keyframes } from 'styled-components';

const Body = styled.div`
  margin-left: 20px;
  display: flex;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(132deg, #fff 66%, #e4ceff 94%);
`;

// 애니메이션 키프레임 정의
const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
`;

const TitleContainer = styled.div``;
const Title = styled.h1`
  width: 100%;
  margin: 140px 149px 48px 98px;
  letter-spacing: 2px;
  color: #a99bef;
  font-family: Caveat;
  font-size: 70px;
  font-weight: bold;
`;
const Sub = styled.p`
  margin: 0 0 0 117px;
  color: #9e8aff;
  font-family: AppleSDGothicNeo;
  letter-spacing: normal;
  font-size: 20px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  word-spacing: 2px;
`;
const Button = styled.button`
  width: 301px;
  height: 68px;
  flex-grow: 0;
  margin: 300px 239px 153px 100px;
  border-radius: 19px;
  background-color: #a99bef;
  border: none;
  color: #ffffff;
  letter-spacing: 2px;
  font-size: 28px;
  font-weight: bold;
  transition:
    background-color 0.3s ease,
    transform 0.1s ease; /* 추가: 트랜지션 효과 */
  &:hover {
    background-color: #ff52e2c5; /* 호버 시 배경 색상 변경 */
  }
`;
const Back = styled.img`
  margin-left: 100px;
`;
const ImgPiano = styled.img`
  position: absolute;
  top: 320px;
  right: 580px;
  animation: ${float} 2s ease-in-out infinite;
`;
const ImgWrite = styled.img`
  position: absolute;
  top: 270px;
  right: 170px;
  -webkit-backdrop-filter: blur(3px);
  backdrop-filter: blur(3px);
  animation: ${float} 4s ease-in-out infinite;
`;
const ImgMusic = styled.img`
  position: absolute;
  top: 550px;
  right: 170px;
  -webkit-backdrop-filter: blur(3px);
  backdrop-filter: blur(3px);
  animation: ${float} 6s ease-in-out infinite;
`;

function App() {
  return (
    <>
      <Body>
        <TitleContainer>
          <Title>
            music? diary? <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; IT's life!
          </Title>
          <Sub>이제 심심한 블로그 일기는 그만! 자신의 일기에 자신감을!</Sub>
          <Button>Enter</Button>
        </TitleContainer>

        <Back src={back} alt="" />
        <ImgPiano src={modal} alt=""></ImgPiano>
        <ImgWrite src={modal2}></ImgWrite>
        <ImgMusic src={modal3}></ImgMusic>
      </Body>
    </>
  );
}

export default App;
