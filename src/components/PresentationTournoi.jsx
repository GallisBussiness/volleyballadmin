import { Table, Text } from "@mantine/core"
import { format, parseISO } from "date-fns";
import { fr } from 'date-fns/locale';
import { BsCheckCircle } from 'react-icons/bs';
import { MdDoNotDisturbAlt } from 'react-icons/md';

function PresentationTournoi({tournoi}) {
  return (
    <div className="w-10/12 mx-auto my-10 flex flex-col justify-center">
        <div className="flex">
            <Text size={16} fw="bold" color="green">Nom du tournoi : </Text> <Text size={16}> {tournoi?.nom}</Text>
        </div>
        <div className="flex">
            <Text size={16} fw="bold" color="green">Type de tournoi : </Text> <Text size={16}> {tournoi?.type}</Text>
        </div>

        <div className="flex">
            <Text size={16} fw="bold" color="green">Genre : </Text> <Text size={16}> {tournoi?.genre === 'H' ? 'HOMME' : tournoi?.genre === 'F' ? 'FEMME' : 'MIXTE'}</Text>
        </div>
        <div className="flex flex-col my-5">
            <Text size={16} fw="bold" color="green">Membres locaux d'organisation : </Text>
            <Table>
            <thead>
                <tr>
                <th>Nom complet</th>
                <th>Telephone</th>
                <th>email</th>
                <th>Responsable</th>
                </tr>
            </thead>
            <tbody>
                {tournoi?.membre_locaux?.map((item,i) => (
                    <tr key={i}>
                        <td>{item.fullname}</td>
                        <td>{item.tel}</td>
                        <td>{item.email}</td>
                        <td>{item.isResponsable ? <BsCheckCircle className="text-green-500 h-6 w-6" /> : <MdDoNotDisturbAlt className="text-gray-500 h-6 w-6" />}</td>
                    </tr>
                )) }
            </tbody>
    </Table>
        </div>
        <div className="flex">
            <Text size={16} fw="bold" color="green">Nb équipe tableau principal : </Text> <Text size={16}> {tournoi?.nb_equipe_tableau_principal}</Text>
        </div>
        <div className="flex">
            <Text size={16} fw="bold" color="green">Dont Wild Card principales : </Text> <Text size={16}> {tournoi?.dont_w_c_p}</Text>
        </div>
        <div className="flex">
            <Text size={16} fw="bold" color="green">Dont places réservées qualif : </Text> <Text size={16}> {tournoi?.dont_places_r_q}</Text>
        </div>
        <div className="flex">
            <Text size={16} fw="bold" color="green">Nb équipe en qualification : </Text> <Text size={16}> {tournoi?.nb_eq_en_q}</Text>
        </div>
        <div className="flex">
            <Text size={16} fw="bold" color="green">Dont Wild Card qualification : </Text> <Text size={16}> {tournoi?.dont_w_e_q}</Text>
        </div>
        <div className="flex">
            <Text size={16} fw="bold" color="green">NB terrains normés : </Text> <Text size={16}> {tournoi?.nb_t_norme}</Text>
        </div>
       {tournoi?.date_qualification && <div className="flex">
            <Text size={16} fw="bold" color="green">Dates qualification : </Text> <Text size={16}> {format(parseISO(tournoi?.date_qualification),'dd MMMM yyy', {
                locale:fr
            })}</Text>
        </div>}
        {tournoi?.date_tableau_principal && <div className="flex">
            <Text size={16} fw="bold" color="green">Dates tableau principal  : </Text> <Text size={16}> du {format(parseISO(tournoi?.date_tableau_principal[0]),'dd MMMM yyy', {
                locale:fr
            })} au {format(parseISO(tournoi?.date_tableau_principal[1]),'dd MMMM yyy', {
                locale:fr
            })}</Text>
        </div>}
        <div className="flex">
            <Text size={16} fw="bold" color="green">Formule sportive qualification : </Text> <Text size={16}> {tournoi?.formule_sportive_qualification}</Text>
        </div>
        <div className="flex">
            <Text size={16} fw="bold" color="green">Formule sportive tableau principal : </Text> <Text size={16}> {tournoi?.formule_sportive_tableau_principal}</Text>
        </div>
        <div className="flex">
            <Text size={16} fw="bold" color="green">Modèle ballon : </Text> <Text size={16}> {tournoi?.modele_ballon}</Text>
        </div>
        <div className="flex">
            <Text size={16} fw="bold" color="green">Prize Money par tableau : </Text> <Text size={16}> {tournoi?.prize_money_par_tableau} FCFA</Text>
        </div>
        <div className="flex">
            <Text size={16} fw="bold" color="green">Répartition du prize Money : </Text> <Text size={16}> {tournoi?.repartition_prize_money}</Text>
        </div>
        <div className="flex">
            <Text size={16} fw="bold" color="green">Tarif inscription par équipe : </Text> <Text size={16}> {tournoi?.tarif_inscription_par_equipe} FCFA</Text>
        </div>
        {tournoi?.dateDeFermiture && <div className="flex">
            <Text size={16} fw="bold" color="green">Date limite d'inscription : </Text> <Text size={16}> {format(parseISO(tournoi?.dateDeFermiture),'dd MMMM yyy', {
                locale:fr
            })}</Text>
        </div>}
    </div>
  )
}

export default PresentationTournoi