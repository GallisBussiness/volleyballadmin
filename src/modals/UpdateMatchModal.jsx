import { Dialog } from 'primereact/dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { DatePicker, TimeInput } from '@mantine/dates';
import 'dayjs/locale/fr';
import { create } from 'react-modal-promise'
import { Button, Select, TextInput } from '@mantine/core';
import { formatISO, parseISO } from 'date-fns';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { getTournoi, getTournois } from '../services/tournoiservice';
import { getEquipeByTournoi } from '../services/equipe-service';

const schema = yup.object({
    date: yup.string()
    .required(),
    heure: yup.string()
    .required(),
    lieu: yup.string()
    .required(),
     tournoi: yup.string()
    .required(),
    equipeA: yup.string()
    .required(),
    equipeB: yup.string()
    .required(),
  }).required();


const UpdateMatchModal = ({ isOpen, onResolve, onReject,match }) => {

  const [tournois,setTournois] = useState([]);
  const [equipes,setEquipes] = useState([]);
  const [curTournoi,setCurTournoi] = useState(null);
  const [curTid,setCurTid] = useState(match?.tournoi?._id);
  const qk = ['get_Tournois']
   useQuery(qk, () => getTournois(), {
    onSuccess: (_) => {
      const t = _.map(ty => ({label: ty.nom, value: ty._id}));
      setTournois(t)
    }
  });
   const qko = ['get_Tournoi',curTid]
   useQuery(qko, () => getTournoi(curTid), {
    enabled: curTid !== null,
    onSuccess: (_) => {
     setCurTournoi(_);
    }
  });

  const qke = ['get_Equipe',curTid]
  useQuery(qke, () => getEquipeByTournoi(curTid), {
   enabled: curTid !== null,
   onSuccess: (_) => {
    const t = _.map(ty => ({label: ty.nom, value: ty._id}));
    setEquipes(t)
   }
 });


    const defaultValues = {tournoi: match?.tournoi?._id,date: match?.date, heure: match?.heure,lieu: match?.lieu,equipeA: match?.equipeA?._id, equipeB: match?.equipeB?._id};
      const {control, handleSubmit, formState: {errors} } = useForm({
          resolver: yupResolver(schema),
        defaultValues
      });

      const onChangeTournoi = (val,onChange) => {
        setCurTid(val);
        onChange(val);
      }
    
    const onCreate = (data) => {
        const heure = formatISO(new Date(data.heure), { representation: 'time' })
        onResolve({...data,heure});
      };

  return (
    <>
       <Dialog header="Modifier un Match" visible={isOpen} onHide={() => onReject()} className="w-1/2">
    <form  className="mb-3" onSubmit={handleSubmit(onCreate)} method="POST">
    <div className="mb-3">
            <Controller control={control} name="tournoi" render={({field}) => (
             <Select value={field.value} onChange={(v) => onChangeTournoi(v,field.onChange)} placeholder="selectionnez le tournoi" label="Tournoi" data={tournois} withAsterisk/>
             )}/>
            </div>
        
           {curTournoi && <>
           
            <div className="mb-3">
            <Controller control={control} name="date" render={({field}) => (
             <DatePicker placeholder="Choisir la date du Match" label="Date du Match" withAsterisk locale="fr" minDate={parseISO(curTournoi.date)} maxDate={parseISO(curTournoi.dateDeFermiture)} value={parseISO(field.value)} onChange={(v) => field.onChange(v.toISOString())} error={errors.date && errors.date.message} />
             )}/>
            </div>
            <div className="mb-3">
            <Controller control={control} name="equipeA" render={({field}) => (
             <Select value={field.value} onChange={field.onChange} placeholder="selectionnez l'equipe à domicile" label="Equipe Domicile" data={equipes} withAsterisk/>
             )}/>
            </div>

            <div className="mb-3">
            <Controller control={control} name="equipeB" render={({field}) => (
             <Select value={field.value} onChange={field.onChange} placeholder="selectionnez l'equipe Extérieur" label="Equipe Exterieur" data={equipes} withAsterisk/>
             )}/>
            </div>
           </>
            
            
            }
            <div className="mb-3">
            <Controller control={control} name="heure" render={({field}) => (
             <TimeInput label="Heure du Match" value={field.value} onChange={field.onChange} />
             )}/>
            </div>
            <div className="mb-3">
            <Controller control={control} name="lieu" render={({field}) => (
                <TextInput value={field.value} onChange={field.onChange}
                 label="Lieu du Match" error={errors.nom && errors.nom.message}
                 placeholder="Lieu du Match"
                   withAsterisk/>
             )}/>
            </div>
            <Button type="submit" className="bg-yellow-500 hover:bg-yellow-700"> MODIFIER LE MATCH</Button>
          </form>
  </Dialog>
    </>
  )
}

export default create(UpdateMatchModal);