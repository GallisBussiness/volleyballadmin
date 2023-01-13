import { Dialog } from 'primereact/dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { create } from 'react-modal-promise'
import { Button, TextInput } from '@mantine/core';

const schema = yup.object({
    nom: yup.string()
    .required(),
  }).required();


const CreateTournoiTypeModal = ({ isOpen, onResolve, onReject }) => {

    
    const defaultValues = {nom: ''};
      const {control, handleSubmit, formState: {errors} } = useForm({
          resolver: yupResolver(schema),
        defaultValues
      });

    
    const onCreate = (data) => {
        onResolve(data);
      };

  return (
    <>
       <Dialog header="Creer un type de tournoi" visible={isOpen} onHide={() => onReject()} className="w-1/2">
    <form  className="mb-3" onSubmit={handleSubmit(onCreate)} method="POST">
    <div className="mb-3">
            <Controller control={control} name="nom" render={({field}) => (
                <TextInput value={field.value} onChange={field.onChange}
                 label="Nom" error={errors.nom && errors.nom.message}
                 placeholder="nom"
                   withAsterisk/>
             )}/>
            </div>
            <Button type="submit" className="bg-yellow-500 hover:bg-yellow-700"> CREER LE TYPE DE TOURNOI</Button>
          </form>
  </Dialog>
    </>
  )
}

export default create(CreateTournoiTypeModal);