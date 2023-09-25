import React from 'react'

export default function playerItem({player}) {
  return (
    <div>
       
      <h3>{player.name}</h3>
      <p>{player.country}</p>
      <hr/>
    </div>
  )
}
