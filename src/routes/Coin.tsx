import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import { useLocation, useParams } from 'react-router-dom'

interface Params {
    coinId : string
}
 
const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${props => props.theme.accentColor};
    //theme이라서 error 발생이 없다
`;

const Loader = styled.span`
    text-align: center;
    color: ${(props) => props.theme.textColor};
    display: block;
`

interface RouteState {
    name:string;
}


function Coin() {
    const [loading, setLoading] = useState(true);
    const {coinId} = useParams<Params>();
    // const {coinId} = useParams<{coinId:string}>();
    const { state } = useLocation<RouteState>();
    const [info, setInfo] = useState({});
    const [priceInfo, setPriceInfo] = useState({});
    

    useEffect(() => {
        (async() => {
            const infoData = await (
                await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
            ).json();
            const priceData = await (
                await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
            ).json();
            setInfo(infoData);
            setPriceInfo(priceData);
        })();
    }, [])


    return (
        <Container>
            <Header>
                <Title>{state?.name || "Loading"}</Title>
            </Header>
            {loading ? <Loader>Loading...</Loader> : null}
        </Container>
    )
}
// https://api.coinpaprika.com/v1/coins/btc-bitcoin
// https://api.coinpaprika.com/v1/tickers/btc-bitcoin

export default Coin
