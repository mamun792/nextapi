import { useState,useEffect } from "react";
import PlayerItem from "../../components/playerItem";   

export default function players() {

const [players, setPlayers] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [isError, setIsError] = useState('');  


useEffect(()=>{
    const getplayer=async()=>{
            try {
                setIsError("");
                setIsLoading(true);

                const res=await fetch("/api/players");
               if(!res.ok){
                   throw new Error("Something went wrong");
               }
                const data=await res.json();    
                 setPlayers(data);
                setIsLoading(false);
                
            } catch (error) {
                setIsError(error.message);
                setIsLoading(false);
            }
    }
    getplayer();
},[]);

if(isLoading){
    return <div>Loading...</div>    
}

if(isError){
    return <div>{isError}</div>
}

  return (
    <div>
      <h1>Players list</h1>
      {
        players?.map((player)=>(
        
           <PlayerItem key={player.id} player={player} />
           
        ),
        )
      }
    </div>
  )
}
