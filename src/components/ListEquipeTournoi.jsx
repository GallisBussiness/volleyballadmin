import { LoadingOverlay, Table, Text } from "@mantine/core"
import { useQuery } from "react-query"
import { getEquipeByTournoi } from "../services/equipe-service"

function ListEquipeTournoi({tournoi}) {

    const key = ['get_equipe_by_tournoi', tournoi._id]

    const {data: equipes, isLoading} = useQuery(key, () => getEquipeByTournoi(tournoi._id))
    
  return (
    <>
      <div className="w-10/12 mx-auto my-10 flex flex-col justify-center">

        <LoadingOverlay visible={isLoading} overlayBlur={2} />
    <div className="flex flex-col my-5">
            <Text size={16} fw="bold" color="green">Liste des équipes inscrits : </Text>
            <Table>
            <thead>
                <tr>
                <th>JOUEURS</th>
                <th>NOM EQUIPE</th>
                </tr>
            </thead>
            <tbody>
                {equipes?.map((item,i) => (
                    <tr key={i}>
                        <td> <div className="flex flex-col">
                           <div className="flex">{item.idCapitaine.prenom} {item.idCapitaine.nom} </div>
                           <div className="flex">{item.idCoequipier.prenom} {item.idCoequipier.nom} </div>
                        </div> </td>
                        <td>{item.nom}</td>
                    </tr>
                )) }
            </tbody>
    </Table>
        </div>
      </div>
    
    </>
  )
}

export default ListEquipeTournoi