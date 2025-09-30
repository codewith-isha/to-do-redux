import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  tasks:[],
}
const taskSlice = createSlice({
  name:"tasks",
  initialState,
  reducers:{
    addTask:(state,action)=>{
      state.tasks.push(action.payload)
    },
    deleteTask:(state,action)=>{
      state.tasks = state.tasks.filter((_,i)=> i !== action.payload)
    },
    updateTask:(state,action) =>{
      const {index , newTask} = action.payload;
      state.tasks[index] = newTask
    }
  }
})
export const {addTask, deleteTask , updateTask} = taskSlice.actions
export default taskSlice.reducer;