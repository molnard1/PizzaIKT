import { configureStore, createSlice } from '@reduxjs/toolkit';

const pizzaDataSlice = createSlice({
    name: 'pizzaData',
    initialState: [],
    reducers: {
        setPizzaData: (state, action) => {
            state = action.payload;
            return state;
        }
    }
});

const store = configureStore({
    reducer: {
        pizzaData: pizzaDataSlice.reducer
    },
});

export const { setPizzaData } = pizzaDataSlice.actions;
export default store;