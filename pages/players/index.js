import { useState, useEffect } from "react";
import PlayerItem from "../../components/playerItem";

export default function players() {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [pname, setPname] = useState("");
  const [country, setCountry] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    const getplayer = async () => {
      try {
        setIsError("");
        setIsLoading(true);

        const res = await fetch("/api/players");
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        const data = await res.json();
        setPlayers(data);
        setIsLoading(false);
      } catch (error) {
        setIsError(error.message);
        setIsLoading(false);
      }
    };
    getplayer();
  }, []);

  const handelSumit = async (e) => {
    e.preventDefault();
    //create new player
    const newPlayer = {
      id: Date.now(),
      name: pname,
      country: country,
      age: age,
    };

    //send data to server
    try {
        setIsError("");
        
        const res=await fetch('/api/players',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'

            },
            body:JSON.stringify(newPlayer)  
        });
        const data=await res.json();
        if(!res.ok){
            throw new Error('Something went wrong');
        }
        if(res.ok){
            console.log("success",data);
            //update state
            setPlayers([...players,data]);
        }

    } catch (error) {
        setIsError(error.message);  
        setIsLoading(false);
    }

  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{isError}</div>;
  }

  return (
    <div>
      <h2>Add New Plyer</h2>
      <form onSubmit={handelSumit}>
        <label>
          Name:
          <input
            type="text"
           
            value={pname}
            onChange={(e) => setPname(e.target.value)}
          />
        </label>
        <label>
          Country:
          <input
            type="text"
           
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        <label>
          Age:
          <input
            type="text"
           
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <h1>Players list</h1>
      {players?.map((player) => (
        <PlayerItem key={player.id} player={player} />
      ))}
    </div>
  );
}
