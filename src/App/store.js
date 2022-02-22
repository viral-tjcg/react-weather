import { configureStore } from '@reduxjs/toolkit';
import snackBarSliceData from '../Components/Store/SnackBarSliceData';
import homeSliceData from '../Pages/Home/Store/homeSliceData';

export default configureStore({
  reducer: {
    snackBar: snackBarSliceData,
    home: homeSliceData,
  },
});
