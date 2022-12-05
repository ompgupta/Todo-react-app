import React, { useEffect, useState } from 'react';
import {toast} from 'react-toastify'
import './style.css'
const Todo = () => {
  const [inputtext,setInputText]=useState("");
  const [tododata,setTodoData]=useState(localData);
  const [isedit,setIsEdit]=useState(false);
  const [editid,setEditId]=useState()
  const handleAdd = (ID) =>{
  if(!inputtext){
    toast.error("Please enter somthing")
  }else if(inputtext && isedit){
   setTodoData(tododata.map(ele=>{
    if(ele.id===editid){
      return {...ele, name:inputtext}
    }else{
      return ele
    }
   }))
   setInputText("");
   setIsEdit(false);
   setEditId(null)
  }else{
    const listdata={
      id:new Date().getTime().toString(),
      name:inputtext
    }
    setTodoData([...tododata,listdata]);
    setInputText("")
  }
  }
 const handleEdit = (id) => {
  if(id){
    const newVal = tododata.find(e=>e.id===id);
setInputText(newVal.name)
setIsEdit(true)
setEditId(id)
  }
 }
 const handleDelete=(id)=>{
  setTodoData(tododata.filter(e=>e.id !== id))
 }
 useEffect(()=>{
  localStorage.setItem("todolist",JSON.stringify(tododata))
 },[tododata])
 /////////////
 function localData(){
  const getTododata=localStorage.getItem("todolist");
  if(getTododata){
    return JSON.parse(getTododata)
  }else{
    return []
  }
 }
  return (
    <div className='main_div'>
      <div className='todo_div'>
   <h1>ToDo List</h1>
   <div className='input_div'>
    <input type="text" placeholder='✍ Add item...' value={inputtext} onChange={(e)=>setInputText(e.target.value)} />
    <i class={`fa-solid ${isedit?'fa-pencil isedit':'fa-plus'}`} id='add' onClick={handleAdd}></i>
   </div>
   <div className='list_div'>
    {tododata.map(Ele=>{
      return  <div className='item_list' key={Ele.id}>
      <p>{Ele.name}</p>
    <div className='list_action' >
    <i className="fa-solid fa-pencil" id='edit' onClick={()=>handleEdit(Ele.id)}></i>
    <i className="fa-regular fa-trash-can" id='delete' onClick={()=>handleDelete(Ele.id)}></i>
    </div>
    </div>
    })}
   
   </div>
   {tododata.length >1 && <button id='clear_btn' onClick={()=>setTodoData([])}>Clear all</button>}
      </div>
    </div>
  )
}

export default Todo