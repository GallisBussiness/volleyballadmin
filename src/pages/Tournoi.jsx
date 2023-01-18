import { LoadingOverlay, Tabs } from "@mantine/core";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom"
import { getTournoi } from "../services/tournoiservice";
import { FcDocument } from 'react-icons/fc';
import { GiArchiveRegister } from 'react-icons/gi';
import { MdSportsScore } from 'react-icons/md';
import PresentationTournoi from "../components/PresentationTournoi";
import ListEquipeTournoi from "../components/ListEquipeTournoi";
import { Navtop } from "../components/Navtop";

function Tournoi() {
    const {id} = useParams()
    const key = ['get_Tournoi',id];
    const {data: tournoi, isLoading} = useQuery(key, () => getTournoi(id))
  return (
    <>
    <LoadingOverlay visible={isLoading} overlayBlur={2} />
    <Navtop />
    <Tabs defaultValue="presentation">
      <Tabs.List position="center" className="w-1/2 mx-auto my-5" grow>
        <Tabs.Tab icon={<FcDocument size={14} />} value="presentation">
          PRESENTATION
        </Tabs.Tab>
        <Tabs.Tab icon={<GiArchiveRegister size={14} />} value="inscriptions">
          INSCRIPTIONS
        </Tabs.Tab>
        <Tabs.Tab icon={<MdSportsScore size={14} />} value="resultats">
            RESULTATS
        </Tabs.Tab>
      </Tabs.List>
      {tournoi && <>
      <Tabs.Panel value="presentation">
        <PresentationTournoi tournoi={tournoi}/>
        </Tabs.Panel>
      <Tabs.Panel value="inscriptions">
        <ListEquipeTournoi tournoi={tournoi} />
      </Tabs.Panel>
      <Tabs.Panel value="resultats">Les résultats ne sont pas encore accessibles, ils le seront prochainement</Tabs.Panel>
      </>}
    </Tabs>
    </>
  )
}

export default Tournoi