import { Dialog } from 'primereact/dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { DatePicker } from '@mantine/dates';
import 'dayjs/locale/fr';
import { create } from 'react-modal-promise'
import { Button, Select, TextInput } from '@mantine/core';
import { parseISO } from 'date-fns';
// import { useQuery } from 'react-query';
// import { getTournoiTypes } from '../services/tournoi-type-service';
// import { useState } from 'react';

const schema = yup.object({
    nom: yup.string()
    .required(),
    date: yup.string()
    .required(),
    dateDeFermiture: yup.string()
    .required(),
    genre: yup.string()
    .required(),
    type: yup.string()
    .required(),
  }).required();


const UpdateTournoiModal = ({ isOpen, onResolve, onReject,tournoi }) => {

  // const [types,setTypes] = useState([]);

  // const qk = ['get_TournoiTypes']

  // useQuery(qk, () => getTournoiTypes(), {
  //   onSuccess: (_) => {
  //     const t = _.map(ty => ({label: ty.nom, value: ty._id}));
  //     setTypes(t)
  //   }
  // });


    const defaultValues = {_id: tournoi?._id,nom: tournoi?.nom, date: tournoi?.date,dateDeFermiture:tournoi?.dateDeFermiture ,genre: tournoi?.genre,type: tournoi?.type};
      const {control, handleSubmit,getValues, formState: {errors} } = useForm({
          resolver: yupResolver(schema),
        defaultValues
      });

    
    const onCreate = (data) => {
        onResolve(data);
      };

  return (
    <>
       <Dialog header="Modifier un tournoi" visible={isOpen} onHide={() => onReject()} className="w-1/2">
    <form  className="mb-3" onSubmit={handleSubmit(onCreate)} method="POST">
    <div className="mb-3">
            <Controller control={control} name="nom" render={({field}) => (
                <TextInput value={field.value} onChange={field.onChange}
                 label="Nom du Tournoi" error={errors.nom && errors.nom.message}
                 placeholder="nom du tournoi"
                   withAsterisk/>
             )}/>
            </div>
            <div className="mb-3">
            <Controller control={control} name="date" render={({field}) => (
             <DatePicker placeholder="Choisir la date du tournoi" label="Date du Tournoi" withAsterisk locale="fr" value={parseISO(field.value)} onChange={(v) => field.onChange(v.toISOString())} error={errors.date && errors.date.message} />
             )}/>
            </div>
            <div className="mb-3">
            <Controller control={control} name="dateDeFermiture" render={({field}) => (
             <DatePicker placeholder="Choisir la date de Fermiture du tournoi" label="Date de Fermiture Tournoi" withAsterisk locale="fr" minDate={parseISO(getValues().date)} value={parseISO(field.value)} onChange={(v) => field.onChange(v.toISOString())} error={errors.date && errors.date.message} />
             )}/>
            </div>
            <div className="mb-3">
            <Controller control={control} name="genre" render={({field}) => (
             <Select value={field.value} onChange={field.onChange} placeholder="selectionnez le genre" label="Genre du tournoi" data={
              [
              {label: 'HOMME', value: 'H'},
              {label: 'FEMME', value: 'F'},
              {label: 'MIXTE', value: 'X'}
             ]} withAsterisk/>
             )}/>
            </div>
             
            <div className="mb-3">
            <Controller control={control} name="type" render={({field}) => (
             <Select value={field.value} onChange={field.onChange} placeholder="selectionnez le type de tournoi" label="Type de tournoi" data={['SERIE A','SERIE B','SERIE C']} withAsterisk/>
             )}/>
            </div>
            <Button type="submit" className="bg-yellow-500 hover:bg-yellow-700"> MODIFIER LE TOURNOI</Button>
          </form>
  </Dialog>
    </>
  )
}

export default create(UpdateTournoiModal);