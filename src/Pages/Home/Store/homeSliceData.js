import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { trackPromise } from 'react-promise-tracker';
import { setSnackBarErrorMessage } from '../../../Components/Store/SnackBarSliceData';
import homeService from './homeService'


export function getWeatherJSON() {
    return (dispatch) =>
        trackPromise(
            homeService.getWeatherJSON()
                .then((response) => {
                    const { data } = response;
                    if(data?.status === false ) {
                        dispatch(setSnackBarErrorMessage({ message: data.msg }))
                    } else {
                        dispatch(setWeatherData(data))
                    }
                    return data
                }).catch(error => {
                    dispatch(setSnackBarErrorMessage({ message: error }))
                })
        )
}

// export function loginSuccessChange({ status }) {
//     return (dispatch) =>
//     dispatch(setLoginSuccess(status))
// }

export const slice = createSlice({
    name: 'weatherAPI',
    initialState: {
        weatherData: [],
    },
    reducers: {
        setWeatherData: (state, action) => {
            state.weatherData = action.payload;
        },
    },
    extraReducers: {}
});

export const { setWeatherData } = slice.actions;
export default slice.reducer;
