import { Dialog } from 'primereact/dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { DatePicker, DateRangePicker } from '@mantine/dates';
import 'dayjs/locale/fr';
import { create } from 'react-modal-promise'
import { Button, NumberInput, Select, TextInput } from '@mantine/core';
import { parseISO } from 'date-fns';
import AddMembreTournois from './AddMembreTournois';
import DateTimeInput from '../components/DateTimeInput';
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
    nb_equipe_tableau_principal: yup.number().required(),
    dont_w_c_p: yup.number().required(),
    membre_locaux: yup.array(),
    dont_places_r_q: yup.number().required(),
    nb_eq_en_q: yup.number().required(),
    dont_w_e_q: yup.number().required(),
    nb_t_norme: yup.number().required(),
    date_qualification: yup.string().required(),
    date_tableau_principal: yup.array().required(),
    formule_sportive_qualification: yup.string().required(),
    formule_sportive_tableau_principal: yup.string().required(),
    modele_ballon: yup.string().required(),
    prize_money_par_tableau: yup.string().required(),
    repartition_prize_money: yup.string().required(),
    tarif_inscription_par_equipe: yup.string().required(),
  }).required();


const CreateTournoiModal = ({ isOpen, onResolve, onReject }) => {

    const defaultValues = {nom: '', date: new Date().toISOString(), dateDeFermiture: new Date().toISOString(),genre: 'H',type: '',
    nb_equipe_tableau_principal: 0,
    dont_w_c_p: 0,
    dont_places_r_q: 0,
    nb_eq_en_q: 0,
    dont_w_e_q: 0,
    nb_t_norme: 0,
    date_qualification: new Date().toISOString(),
    date_tableau_principal: '',
    formule_sportive_qualification: '',
    formule_sportive_tableau_principal: '',
    modele_ballon: '',
    membre_locaux: [],
    prize_money_par_tableau: '',
    repartition_prize_money: '',
    tarif_inscription_par_equipe: '',
  };
      const {control, handleSubmit,getValues,setValue, formState: {errors} } = useForm({
          resolver: yupResolver(schema),
        defaultValues
      });

    
    const onCreate = (data) => {
      const {date_tableau_principal} = data;
      const newdtp = date_tableau_principal.map(d => d.toISOString())
        onResolve({...data, date_tableau_principal: newdtp});
      };

      const addMembre = () => {
        AddMembreTournois({membres: getValues().membre_locaux}).then((d => {
            setValue('membre_locaux',d);
        }));
    }

  return (
    <>
       <Dialog header="Creer un tournoi" visible={isOpen} onHide={() => onReject()} className="w-1/2">
    <form  className="mb-3" onSubmit={handleSubmit(onCreate)} method="POST">
      <div className="flex flex-col sm:flex-row">
        <div className="flex flex-col items-center justify-center w-full">
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
            <div className="mb-3">
            <Controller control={control} name="nb_equipe_tableau_principal" render={({field}) => (
                <NumberInput value={field.value} onChange={field.onChange}
                 label="Nombre équipe tableau principal" 
                 error={errors.nb_equipe_tableau_principal && errors.nb_equipe_tableau_principal.message}
                   withAsterisk/>
             )}/>
            </div>
           
        </div>
        <div className="flex flex-col items-center justify-center w-full">
        <div className="mb-3">
            <Controller control={control} name="dont_w_c_p" render={({field}) => (
                <NumberInput value={field.value} onChange={field.onChange}
                 label="Dont Wild Card principales" 
                 error={errors.dont_w_c_p && errors.dont_w_c_p.message}
                   withAsterisk/>
             )}/>
            </div>
            <div className="mb-3">
            <Controller control={control} name="dont_places_r_q" render={({field}) => (
                <NumberInput value={field.value} onChange={field.onChange}
                 label="Dont places réservées qualif" 
                 error={errors.dont_places_r_q && errors.dont_places_r_q.message}
                   withAsterisk/>
             )}/>
            </div>
            <div className="mb-3">
            <Controller control={control} name="nb_t_norme" render={({field}) => (
                <NumberInput value={field.value} onChange={field.onChange}
                 label="NB terrains normés" 
                 error={errors.nb_t_norme && errors.nb_t_norme.message}
                   withAsterisk/>
             )}/>
            </div>
        <div className="mb-3">
            <Controller control={control} name="nb_eq_en_q" render={({field}) => (
                <NumberInput value={field.value} onChange={field.onChange}
                 label="Nb équipe en qualification" 
                 error={errors.nb_eq_en_q && errors.nb_eq_en_q.message}
                   withAsterisk/>
             )}/>
            </div>
            <div className="mb-3">
            <Controller control={control} name="dont_w_e_q" render={({field}) => (
                <NumberInput value={field.value} onChange={field.onChange}
                 label="Dont Wild Card qualification" 
                 error={errors.dont_w_e_q && errors.dont_w_e_q.message}
                   withAsterisk/>
             )}/>
            </div>
            
            <div className="mb-3">
            <Controller control={control} name="date_qualification" render={({field}) => (
             <DatePicker placeholder="Choisir la date qualification" label="Dates qualification" withAsterisk locale="fr" value={parseISO(field.value)} onChange={(v) => field.onChange(v.toISOString())}
              error={errors.date_qualification && errors.date_qualification.message} />
             )}/>
            </div>
           
            <div className="mb-3">
            <Controller control={control} name="date_tableau_principal" render={({field}) => (
             <DateRangePicker placeholder="Choisir dates tableau principal" label="Dates tableau principal" withAsterisk locale="fr" value={field.value} onChange={field.onChange}
              error={errors.date_tableau_principal && errors.date_tableau_principal.message} />
             )}/>
            </div>
      
        </div>
        <div className="flex flex-col items-center justify-center w-full">
        
        <div className="mb-3">
            <Controller control={control} name="formule_sportive_qualification" render={({field}) => (
                <TextInput value={field.value} onChange={field.onChange}
                 label="Formule sportive qualification " error={errors.formule_sportive_qualification && errors.formule_sportive_qualification.message}
                 placeholder="Formule sportive qualification "
                   withAsterisk/>
             )}/>
            </div>
            <div className="mb-3">
            <Controller control={control} name="formule_sportive_tableau_principal" render={({field}) => (
                <TextInput value={field.value} onChange={field.onChange}
                 label="Formule sportive tableau principal " error={errors.formule_sportive_tableau_principal && errors.formule_sportive_tableau_principal.message}
                 placeholder="Formule sportive tableau principal"
                   withAsterisk/>
             )}/>
            </div>
            <div className="mb-3">
            <Controller control={control} name="modele_ballon" render={({field}) => (
                <TextInput value={field.value} onChange={field.onChange}
                 label="Modèle ballon" error={errors.modele_ballon && errors.modele_ballon.message}
                 placeholder="Modèle ballon"
                   withAsterisk/>
             )}/>
            </div>
            <div className="mb-3">
            <Controller control={control} name="prize_money_par_tableau" render={({field}) => (
                <TextInput value={field.value} onChange={field.onChange}
                 label="Prize Money par tableau" error={errors.prize_money_par_tableau && errors.prize_money_par_tableau.message}
                 placeholder="Prize Money par tableau"
                   withAsterisk/>
             )}/>
            </div>
            <div className="mb-3">
            <Controller control={control} name="repartition_prize_money" render={({field}) => (
                <TextInput value={field.value} onChange={field.onChange}
                 label="Répartition du prize Money" error={errors.repartition_prize_money && errors.repartition_prize_money.message}
                 placeholder="Répartition du prize Money"
                   withAsterisk/>
             )}/>
            </div>
            <div className="mb-3">
            <Controller control={control} name="tarif_inscription_par_equipe" render={({field}) => (
                <TextInput value={field.value} onChange={field.onChange}
                 label="Tarif inscription par équipe" error={errors.tarif_inscription_par_equipe && errors.tarif_inscription_par_equipe.message}
                 placeholder="Tarif inscription par équipe"
                   withAsterisk/>
             )}/>
            </div>
        </div>
      </div>
        <div className="my-5 flex items-center justify-center">
            <Button onClick={addMembre} className="bg-green-500 hover:bg-green-700">AJOUTER DES MEMBRES LOCAUX</Button>
          </div>
            <Button type="submit" className="bg-yellow-500 hover:bg-yellow-700"> CREER LE TOURNOI</Button>
          </form>
  </Dialog>
    </>
  )
}

export default create(CreateTournoiModal);