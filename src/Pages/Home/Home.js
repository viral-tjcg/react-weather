import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getWeatherJSON } from './Store/homeSliceData';
import moment from 'moment';
import CustomTable from './CustomTable';
function Home(props) {
    const dispatch = useDispatch();
    const { weatherData } = useSelector(state => state.home)
    const [weatherList, setWeatherList] = useState([]);

    useEffect(() => {
        dispatch(getWeatherJSON())
    }, [])

    useEffect(() => {
        setWeatherList(weatherData)
    }, [weatherData])

    return (
        <>
            <div>
                <p className='m-1'><b>Sales Period : </b>{weatherList?.response?.salesPeriod}</p>
            </div>
            <div className=''></div>
            <CustomTable data={weatherList?.response} />
        </>
    );
}
export default Home;
