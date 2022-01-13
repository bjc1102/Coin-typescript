import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { fetchCoinHistory } from '../api'
import ApexChart from "react-apexcharts";
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atom';


interface IChartProps  {
    coinId:string;
}

interface ICoinData {
    time_open: String;
    time_close: String;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

function Chart({coinId}:IChartProps) {
    const {isLoading, data} = useQuery<ICoinData[]>(
        ["ohlcv", coinId], () => fetchCoinHistory(coinId), {refetchInterval:10000})
    const isDark = useRecoilValue(isDarkAtom)

    return (
        <div>
            {isLoading ? "Loading chart..." : 
            <ApexChart 
            type='line'
            series={[
                {
                    name : "price",
                    data: data?.map((price) => price.close)
                },
            ]}
            options={{ //첫번째 {} html태그에서 열 수 있게 해주고 두번째 {} object의 options를 찾아서 세 번째 {} 그 option의 값을 넣는다
                theme : {
                    mode: isDark ? 'dark' : "light",
                },
                chart: {
                    height: 500,
                    width: 500,
                    background: "transparent",
                    toolbar :{
                        show: false
                    },
                    
                },
                grid: {
                    show:false,
                },
                stroke: {
                    curve:"smooth",
                    width: 4,
                },
                xaxis: {
                    axisBorder: {
                        show: false
                    },
                    axisTicks : {
                        show :false
                    },
                    labels : {
                        show: false
                    },
                    type:"datetime",
                    categories: data?.map((price) => price.time_close),
                },
                yaxis: {
                    labels : {
                        show: false
                    }
                },
                fill: {
                    type:"gradient", 
                    gradient:{
                        gradientToColors:["#0be881"],
                        stops:[0,100]
                    }
                },
                colors: ["#e67e22"],
                tooltip: {
                    y: {
                        formatter: (value) => `$ ${value.toFixed(2)}`
                        //formatter는 우리한테 값을 넘겨주는 함수, 우리는 리턴시켜줘야함..
                        //그래서 값을 받은 뒤 다시 3자리로 수정해서 보내준다
                    },
                },
            }}/>}
        </div>
    )
}

export default Chart
