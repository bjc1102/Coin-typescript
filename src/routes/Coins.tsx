import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { Link,useLocation } from 'react-router-dom';
import styled, { ThemeConsumer } from 'styled-components'
import { fetchCoins } from '../api';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { isDarkAtom, ScrollHis } from '../atom';

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${props => props.theme.accentColor};
    flex: 1;
    text-align: center;
    //theme이라서 error 발생이 없다
`;


const Button = styled.button<IDarkAtom>`
    padding: 0;
    position: absolute;
    right: 50px;
    background-color: ${props => props.theme.bgColor};
    border: 1px solid ${props=>props.theme.neonColor};
    border-radius: 5px;
    padding: 3px;
    
    ${props => props.DarkAtom ? "box-shadow: 0px 0px 22px 5px rgba(100,255,218,0.5);" : ""};
    svg {
        width: 24px;
        height: 24px;
        color: ${props=>props.theme.neonColor};
        ${props => props.DarkAtom ? "filter : drop-shadow(0px 0px 2px rgba(100,255,218, 0.8))" : ""};
    }
    path {

    }
`

const CoinsList = styled.ul`
`;

const Coin = styled.li`
    background-color: ${props=>props.theme.bgColor};
    color: ${props=> props.theme.textColor};
    border: 2px solid ${props=>props.theme.textColor};
    margin-bottom: 10px;
    border-radius: 15px;
    a {
        padding: 20px;
        transition: color 0.2s ease-in;
        display: flex;
        align-items: center;
    }
    &:hover {
        a{
            color: ${props => props.theme.accentColor};
        }
    }
`;

const Loader = styled.span`
    text-align: center;
    color: ${(props) => props.theme.accentColor};
    display: block;
`
const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;



interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

interface IDarkAtom {
    DarkAtom:boolean,
}



function Coins() {
    const {isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins)
    const [DarkAtom, setDarkAtom] = useRecoilState(isDarkAtom);
    const toggleDarkAtom = () => setDarkAtom(prev => !prev)

    return (
        <Container>
            <HelmetProvider>
                <Helmet>
                    <title>코인</title>
                </Helmet>
            </HelmetProvider>
            <Header>
                <Title>코인</Title>
                <Button DarkAtom={DarkAtom} onClick={toggleDarkAtom}>
                    <svg  focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" ><path fill="currentColor" d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z"></path></svg>
                </Button>
            </Header>
            {isLoading ? <Loader>Loading...</Loader>
                : <CoinsList>
                    {data?.slice(0, 100).map((coin) => 
                    <Coin key={coin.id}>
                        <Link to={{
                            pathname:`/${coin.id}`,
                            state: {name:coin.name},
                        }}>
                            <Img
                                src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                            />
                            {coin.name}
                            &rarr; 
                        </Link>
                    </Coin>
                    )}
            </CoinsList>}
        </Container>
    )
}

export default Coins
