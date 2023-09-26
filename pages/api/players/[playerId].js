import { players } from "@/data/players";

export default function handler(req, res) {
  const { playerId } = req.query;


 if(req.method==='GET'){
    const player = players.find((playe) => playe.id === +playerId);
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }
  
    if (player) {
      return res.status(200).json(player);
    }
 }

 if(req.method==='DELETE'){
    const index = players.findIndex((playe) => playe.id === +playerId);
    if (index === -1) {
      return res.status(404).json({ message: "Player not found" });
    }
    players.splice(index, 1);
    res.status(200).json({ message: "Player deleted successfully" });
 }  
  
}
