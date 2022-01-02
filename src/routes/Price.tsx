import React from 'react'
import { fetchTickersInfo } from '../api'
import  {useQuery} from "react-query";

interface IPriceData {

}
interface IPriceProps  {
    coinId:string;
}

function Price({coinId}:IPriceProps) {
    const {isLoading, data} = useQuery(["price", coinId], ()=>{fetchTickersInfo(coinId)})
    return (
        <h1></h1>
    )
}

export default Price
