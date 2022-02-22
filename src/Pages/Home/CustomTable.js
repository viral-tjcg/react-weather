import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getWeatherJSON } from './Store/homeSliceData';
import moment from 'moment';
import AppMethods from '../../Helper/AppMethods';
function CustomTable(props) {
    const dispatch = useDispatch();
    const [headerData, setHeaderData] = useState([]);
    const [bodyData, setBodyData] = useState([]);


    useEffect(() => {
        if (props?.data) {
            let weekly = uniqueByKey(props?.data?.categoryAnalysisWeekly, 'weekNumber')
            weekly.push(weekly[weekly.length - 1])
            weekly = weekly.sort(AppMethods.sortByProperty('weekNumber'))

            setHeaderData([...weekly, ...props?.data?.weatherData])

            let allData = [...props?.data?.categoryAnalysisWeekly, ...props?.data?.categoryAnalysisDaily]
            let newData = []
            for (let i = allData.length - 1; i >= 0; i--) {
                let arr = []
                arr.push(allData[i])
                if (newData[allData[i].weekNumber]) {
                    if (allData[i]?.date) {
                        if (newData[moment(allData[i]?.date).format('MMDD')]) {
                            arr = [...newData[moment(allData[i]?.date).format('MMDD')], ...arr]
                            newData[moment(allData[i]?.date).format('MMDD')] = arr
                        } else {
                            newData[moment(allData[i]?.date).format('MMDD')] = arr
                        }
                    }
                    else {
                        arr = [...newData[allData[i].weekNumber], ...arr]
                        newData[allData[i].weekNumber] = arr
                    }
                } else {
                    newData[allData[i]?.date ? moment(allData[i]?.date).format('MMDD') : allData[i].weekNumber] = arr
                }
            }
            setBodyData(newData)
        }
    }, [props?.data])

    function uniqueByKey(array, key) {
        return [...new Map(array.map((x) => [x[key], x])).values()];
    }

    return (
        <>
            {headerData?.map((item, index) => (
                <>
                    {item?.hiTempNum ?
                        <>
                            <div key={index} className="column" style={{}}>
                                <div className='row border-light-1'>
                                    <label className='text-center'>{moment(item.wthrDte).format('MM/DD')}</label>
                                </div>
                                <div className='row border-light-1'>
                                    <label className='text-center'>{moment(item.wthrDte).format('ddd')}</label>
                                </div>
                                <div className='row border-dark-1'>
                                    <label className='text-center'>{`${item.hiTempNum}°/${item.loTempNum}°`}</label>
                                </div>

                                {bodyData[moment(item?.wthrDte).format('MMDD')] ? bodyData[moment(item?.wthrDte).format('MMDD')].map((itemBody, indexBody) => (
                                    <>
                                        {indexBody == 0 &&
                                            <>
                                                <div className='row border-light-1'>
                                                    <label className='text-center'>{itemBody.psaTotalSales}</label>
                                                </div>
                                                <div className='row border-light-1'>
                                                    <label className='text-center'>{itemBody.psaTotalWriteOffs}</label>
                                                </div>
                                            </>
                                        }
                                        <div className='row border-light-1'>
                                            <label className='text-center'>{itemBody.deliveries}</label>
                                        </div>
                                        <div className='row border-light-1'>
                                            <label className='text-center'>{itemBody.sales}</label>
                                        </div>
                                        <div className='row border-light-1'>
                                            <label className='text-center'>{itemBody.writeOffs}</label>
                                        </div>
                                        {((indexBody - 1) !== bodyData[1].length) &&
                                            <>
                                                <div className='row border-light-1'>
                                                    <label className='text-center'>{'-'}</label>
                                                </div>
                                                <div className='row border-light-1'>
                                                    <label className='text-center'>{'-'}</label>
                                                </div>
                                                <div className='row border-light-1'>
                                                    <label className='text-center'>{'-'}</label>
                                                </div>
                                            </>
                                        }
                                    </>
                                ))
                                    :
                                    bodyData[1].map((itemBody, indexBody) => (
                                        <>
                                            {indexBody == 0 &&
                                                <>
                                                    <div className='row border-light-1'>
                                                        <label className='text-center'>{'-'}</label>
                                                    </div>
                                                    <div className='row border-light-1'>
                                                        <label className='text-center'>{"-"}</label>
                                                    </div>
                                                </>
                                            }
                                            <div className='row border-light-1'>
                                                <label className='text-center'>{'-'}</label>
                                            </div>
                                            <div className='row border-light-1'>
                                                <label className='text-center'>{'-'}</label>
                                            </div>
                                            <div className='row border-light-1'>
                                                <label className='text-center'>{"-"}</label>
                                            </div>
                                        </>
                                    ))}
                            </div>
                        </>
                        :
                        <>
                            <div key={index} className="column" style={{ width: index == 0 ? 150 : 125 }}>
                                {index !== 0 ?
                                    <>
                                        <div className='row border-light-1'>
                                            <label className='text-center'>W{item.weekNumber}</label>
                                        </div>
                                        <br />
                                        <div className='row border-dark-1' style={{ marginTop: 1 }}>
                                            <label className='text-center'>{moment(item.fromDate).format('MM/DD') + " - " + moment(item.toDate).format('MM/DD')}</label>
                                        </div>
                                        {bodyData[item.weekNumber].map((itemBody, indexBody) => (
                                            <>
                                                {indexBody == 0 &&
                                                    <>
                                                        <div className='row border-light-1'>
                                                            <label className='text-center'>{itemBody.psaTotalSales}</label>
                                                        </div>
                                                        <div className='row border-light-1'>
                                                            <label className='text-center'>{itemBody.psaTotalWriteOffs}</label>
                                                        </div>
                                                    </>
                                                }
                                                <div className='row border-light-1'>
                                                    <label className='text-center'>{itemBody.deliveries}</label>
                                                </div>
                                                <div className='row border-light-1'>
                                                    <label className='text-center'>{itemBody.sales}</label>
                                                </div>
                                                <div className='row border-light-1'>
                                                    <label className='text-center'>{itemBody.writeOffs}</label>
                                                </div>
                                            </>
                                        ))}

                                    </>
                                    :
                                    <>
                                        <br />
                                        <br />
                                        <div className='row border-dark-1' style={{ marginTop: 2 }}>
                                            <label className='text-center'>{"Category"}</label>
                                        </div>
                                        {bodyData[1].map((itemBody, indexBody) => (
                                            <>
                                                {indexBody == 0 &&
                                                    <>
                                                        <div className='row border-light-1 w-50' style={{ marginLeft: 80 }}>
                                                            <label className='text-center'>{'Sales'}</label>
                                                        </div>
                                                        <div className='row border-light-1'>
                                                            <label className='text-center'>{"PSA Total WO's"}</label>
                                                        </div>
                                                    </>
                                                }
                                                <div className='row border-light-1 w-50' style={{ marginLeft: 80 }}>
                                                    <label className='text-center'>{'Del'}</label>
                                                </div>
                                                <div className='row border-light-1 w-50' style={{ marginLeft: 80 }}>
                                                    <label className='text-center'>{'Sales'}</label>
                                                </div>
                                                <div className='row border-light-1'>
                                                    <label className='text-center'>{itemBody.categoryDescription}&nbsp;&nbsp;{"WO's"}</label>
                                                </div>
                                            </>
                                        ))}
                                    </>
                                }
                            </div>
                        </>
                    }
                </>
            ))}
        </>
    );
}
export default CustomTable;
