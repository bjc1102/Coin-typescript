import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import { Switch, Route, useLocation, useParams, Link, useRouteMatch} from 'react-router-dom'
import Price from './Price';
import Chart from './Chart';
import { useQuery } from 'react-query';
import { fetchCoinInfo, fetchTickersInfo } from '../api';


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

const OverView = styled.div`
    background-color: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    border-radius: 10px;
`;

const OverViewItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span:first-child {
        font-size: 10px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`

const Description = styled.p`
    color: ${props=>props.theme.textColor};
    margin: 20px 0px;
`;

const Tabs = styled.div`
    margin: 25px 0px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
`

const Tab = styled.span<{isActive:boolean}>`
    background-color: rgba(0,0,0,0.5);
    text-align: center;
    text-transform: uppercase;
    padding: 10px;
    border-radius: 10px;
    font-weight: 400;
    font-size: 15px;
    -webkit-box-shadow: 5px 5px 5px -5px rgba(0,0,0,0.8); 
    box-shadow: 5px 5px 5px -5px rgba(0,0,0,0.8);
    color: ${props => props.isActive ? props.theme.accentColor : props.theme.textColor};
    a { //Router Link는 a태그를 가지고 있다
        display: block;
    }
`

interface RouteState {
    name:string;
}

interface ITag {
    coin_counter: number
    ico_counter: number
    id: string
    name: string
}

interface IInfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    contract: string;
    platform: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}

interface IPriceData {
    d: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;

    quotes: {
        ath_date: string;
        ath_price: number
        market_cap: number
        market_cap_change_24h: number
        percent_change_1h: number
        percent_change_1y: number
        percent_change_6h: number
        percent_change_7d: number
        percent_change_12h: Number
        percent_change_15m: number
        percent_change_24h: number
        percent_change_30d: number
        percent_change_30m: number
        percent_from_price_ath: number
        price: number
        volume_24h: number
        volume_24h_change_24h: number
    };
}


function Coin() {
    // const [loading, setLoading] = useState(true);
    // const [info, setInfo] = useState<IInfoData>();
    // const [priceInfo, setPriceInfo] = useState<IPriceData>();
    const {coinId} = useParams<Params>();
    // const {coinId} = useParams<{coinId:string}>();
    const { state } = useLocation<RouteState>();
    const priceMatch = useRouteMatch("/:coinId/price");    
    const chartMatch = useRouteMatch("/:coinId/chart");
    //null 아니면 object값만 필요하다

    const {isLoading: infoLoading, data:infoData } = useQuery<IInfoData>(
        ["info",coinId], () => fetchCoinInfo(coinId)
    );
    const {isLoading: tickersLoading, data:tickersData} = useQuery<IPriceData>(
        ["tickers",coinId], () => fetchTickersInfo(coinId)
    );


    // useEffect(() => {
    //     (async () => {
    //         const infoData = await (
    //             await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
    //         ).json();
    //         const priceData = await (
    //             await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
    //         ).json();
    //         setInfo(infoData);
    //         setPriceInfo(priceData);
    //         setLoading(false);
    //     })();
    // }, [])

    const loading = infoLoading || tickersLoading;

    return (
        <Container>
            <Header>
                <Title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</Title>
            </Header>
            {loading ? (<Loader>Loading...</Loader> ): (
                <>
                    <OverView>
                        <OverViewItem>
                            <span>Rank:</span>
                            <span>{infoData?.rank}</span>
                        </OverViewItem>
                        <OverViewItem>
                            <span>Symbol:</span>
                            <span>{infoData?.symbol}</span>
                        </OverViewItem>
                        <OverViewItem>
                            <span>open source:</span>
                            <span>{infoData?.rank}</span>
                        </OverViewItem>
                    </OverView>
                    <Description>{infoData?.description}</Description>
                    <OverView>
                        <OverViewItem>
                            <span>ToTal suply:</span>
                            <span>{tickersData?.total_supply}</span>
                        </OverViewItem>
                        <OverViewItem>
                            <span>max supply:</span>
                            <span>{tickersData?.max_supply}</span>
                        </OverViewItem>
                    </OverView>
                    <Tabs>
                        <Tab isActive={chartMatch !==null}><Link to={`/${coinId}/chart`}>Chart</Link></Tab>
                        <Tab isActive={priceMatch !== null}><Link to={`/${coinId}/price`}>Price</Link></Tab>
                    </Tabs>
                    <Switch>
                        <Route path={`/:coinId/price`}>{/* `/${coinId}/price` */}
                            <Price/>
                        </Route>
                        <Route path={`/:coinId/chart`}>
                            <Chart/>
                        </Route>
                    </Switch>
                </>
            )}
        </Container>
    )
}
// https://api.coinpaprika.com/v1/coins/btc-bitcoin
// https://api.coinpaprika.com/v1/tickers/btc-bitcoin

export default Coin
