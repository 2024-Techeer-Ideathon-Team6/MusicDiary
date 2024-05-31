import React, {useEffect, useState, useRef} from "react";
import styled from "styled-components";


const Wrapper = styled.div`
    width: 700px;
    height: 190px;
    margin-block: 20px;
    padding: 0;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    display: flex;

`;
const ContentContainer = styled.div`
    background-color: #${props => props.nowcolor ?"A99BEF":"FFE4E1"};
    width: 500px;
    height: 180px;
    margin: 0;
    padding: 0;
    border-radius: 25px 0 0 25px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;

`;

const DateContainer = styled.div`
    background-color: #${props => props.nowcolor ?"FF94A4":"FFC5C1"};
    width: 200px;
    height: 180px;
    margin: 0;
    padding: 0;
    border-radius: 0 25px 25px 0;
    align-items: center;
    justify-content: center;
    text-align: center;
    display: flex;
    flex-direction: column;


`;

const TitleText = styled.p`
    width: 90%;
    margin: 0 0 20px 0;
    font-size: 25px;
    padding: 0;
    color: #FFFFFF;

`;
const ContentText = styled.p`
    width: 90%;
    margin: 0;
    font-size: 20px;
    padding: 0;
    color: #FFFFFF;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

`;
const DayText = styled.p`
    width: 90%;
    margin: 0 0 0px 0;
    font-size: 70px;
    padding: 0;
    color: #FFFFFF;

`;
const MonthText = styled.p`
    width: 90%;
    margin: 0;
    font-size: 40px;
    padding: 0;
    color: #FFFFFF;

`;
function DiaryList(props){
    // title, onClick
    const {title, content, day, month, onClick, nowDate} = props;


    const isNow = useRef(false)
    
    if(day == nowDate){
        isNow.current=true
    }
    return (
        <Wrapper onClick={onClick}>
            <ContentContainer nowcolor={isNow.current ? 1:0} >
                <TitleText>{title || ""}</TitleText>
                <ContentText>{content || ""}</ContentText>
            </ContentContainer>
            <DateContainer nowcolor={isNow.current ? 1:0} >
                <DayText>{day || ""}</DayText>
                <MonthText>{month || ""}</MonthText>
            </DateContainer>
            
        </Wrapper>
        
    )
}

export default DiaryList