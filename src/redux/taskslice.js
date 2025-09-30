import {createSlice} from '@reduxjs/toolkit';

const loadlocalstorage = ()=>{
  const saved = localStorage.getItem("tasks")
  return saved? JSON.parse(saved):[]
}

const saveLocalstorage = (tasks)=>{
  localStorage.setItem("tasks" , JSON.stringify(tasks))
}


const initialState = {
  tasks:[],
}
const taskSlice = createSlice({
  name:"tasks",
  initialState:{
    tasks:loadlocalstorage()
  },
  reducers:{
    addTask:(state,action)=>{
      state.tasks.push(action.payload)
      saveLocalstorage(state.tasks)
    },
    deleteTask:(state,action)=>{
      state.tasks = state.tasks.filter((_,i)=> i !== action.payload)
      saveLocalstorage(state.tasks)
    },
    updateTask:(state,action) =>{
      const {index , newTask} = action.payload;
      state.tasks[index] = newTask
      saveLocalstorage(state.tasks)
    }
  }
})
export const {addTask, deleteTask , updateTask} = taskSlice.actions
export default taskSlice.reducer;