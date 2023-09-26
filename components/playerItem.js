import React from 'react'

export default function playerItem({player}) {

const handelDelete=async(id)=>{
    const res=await fetch(`/api/players/${id}`,{
        method:'DELETE'
    });
    const data=await res.json();
}

  return (
    <div>
       
      <h3>{player.name}</h3>
      <p>{player.country}</p>
      <button onClick={()=>handelDelete(player.id)}>Delete</button>
      <hr/>
    </div>
  )
}
