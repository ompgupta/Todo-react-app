import React, { useState ,useEffect} from 'react'
import './style.css'
//  get back data from localStorage
const localData=()=>{
    const getlist =localStorage.getItem("myTodolist");
    if(getlist){
        return JSON.parse(getlist);
    }
    else{
        return [];
    }
}
const Todo=() =>{
    const [val, setVal]=useState();
    const[items,setItems] = useState(localData());
    const[isedit,setIsedit]=useState("");
    const[togglebtn, setTogglebtn] = useState(false)
   console.log(val);

//    ***********add items**************
  const additem=()=>{
      if(!val){
          alert("Please fill the data..")
      } 
      else if(val && togglebtn){
      setItems(items.map((currEle)=>{
         if(currEle.id === isedit){
           return{...currEle, name:val}
         }
         return currEle;
      })
      )
      setVal("");
      setIsedit(null);
      setTogglebtn(false);
      }
      else{
          const myNewItems ={
              id:new Date().getTime().toString(),
              name:val
          }
          setItems([...items,myNewItems]);
          setVal("");

      }
      
  }
  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setVal(item_todo_edited.name);
    setIsedit(index);
    setTogglebtn(true);
  };
//   *****************delete items*************
const delItems=(index)=>{
  const updateItems = items.filter((currEle)=>{
      return currEle.id !== index;
  }) 
  setItems(updateItems);      
}
// *************remove all items***************
const delAllitems=()=>{
   setItems([]);
   
}
//   *********adding in localStorage
useEffect(() => {
  localStorage.setItem("myTodolist", JSON.stringify(items));
}, [items]);
    return (
        <>
         <div className="todo-conatiner">
             <img src="./images/list.png" alt="" />
             <h3>Add Your List :✌</h3>
             <input type="text" placeholder="✍ Add item..." value={val} onChange={(e)=>setVal(e.target.value)} />
             {togglebtn ? (
              <i className="far fa-edit add-btn" onClick={additem} style={{color:"rgb(0, 255, 0)"}}></i>
            ) : (
              <i className="fas fa-plus add-btn" onClick={additem}></i>
            )}
             
             <br />
             {
                 items.map((currEle)=>{
                     return (
                      <div className="todo-items" key={currEle.id}>
             <h4>{currEle.name}</h4>
             <div className="todo-btn">
             <i class="far fa-edit edit"  onClick={() => editItem(currEle.id)}></i>
             <i class="far fa-trash-alt del" onClick={()=>delItems(currEle.id)}></i>
             </div>
             </div>
                     )
                 })
             }
             <button className="check-btn" onClick={delAllitems}>Remove All</button>
             </div> 
               
        </>
    )
}

export default Todo;
