import { configureStore, createSlice } from '@reduxjs/toolkit';

const pizzaDataSlice = createSlice({
    name: 'pizzaData',
    initialState: [],
    reducers: {
        setPizzaData: (state, action) => {
            state = action.payload;
            return state;
        },
        editPizzaLocal: (state, action) => {
            const editedPizza = action.payload;
            return state.map((pizza) =>
                pizza.id === editedPizza.id ? editedPizza : pizza
            );
        },
        deletePizzaLocal: (state, action) => {
            const postId = action.payload;
            return state.filter((post) => post.id != postId);
        }
    }
});

const store = configureStore({
    reducer: {
        pizzaData: pizzaDataSlice.reducer
    },
});

export const { setPizzaData, deletePizzaLocal, editPizzaLocal } = pizzaDataSlice.actions;
export default store;