import React, { useState } from "react";
export default function ArrayStateVariable() {
 const [array, setArray] = useState([1, 2, 3, 4, 5]);
 const addElement = () => {
   setArray([...array, Math.floor(Math.random() * 100)]);
 };
 const deleteElement = (index: number) => {
   setArray(array.filter((item, i) => i !== index));
 };
 return (
  <div className="border rounded p-2 mt-2">
   <h2>Array State Variable</h2>
   <button 
     className="btn btn-success mb-3" 
     onClick={addElement}>
     Add Element
   </button>
   <div className="list-group">
    {array.map((item, index) => (
     <div key={index} className="list-group-item">
       <div className="row">
         <div className="col-2">{item}</div>
         <div className="col-6">
           <button 
             className="btn btn-danger" 
             onClick={() => deleteElement(index)}>
             Delete
           </button>
         </div>
       </div>
     </div>
    ))}
   </div>
   <hr/>
  </div>
 );
}