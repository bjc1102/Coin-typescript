import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { Link,useLocation } from 'react-router-dom';
import styled from 'styled-components'
import { fetchCoins } from '../api';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useRecoilValue, useSetRecoilState } from 'recoil';
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
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${props => props.theme.accentColor};
    //theme이라서 error 발생이 없다
`;

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




function Coins() {
    const {isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins)
    const setDarkAtom = useSetRecoilState(isDarkAtom)
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
                <button onClick={toggleDarkAtom}>Toggle Dark mode</button>
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
