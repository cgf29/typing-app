import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    value: 0,
}

export const textSlice = createSlice({
    name: 'text',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        }
    },
})

export default textSlice.reducer