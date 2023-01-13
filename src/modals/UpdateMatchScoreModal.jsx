import { Dialog } from 'primereact/dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { create } from 'react-modal-promise'
import { Button, NumberInput } from '@mantine/core';
const schema = yup.object({
    scoreA: yup.number()
    .required(),
    scoreB: yup.number()
    .required(),
  }).required();


const UpdateMatchScoreModal = ({ isOpen, onResolve, onReject,match }) => {


    const defaultValues = {_id: match?._id,scoreA: match?.scoreA, scoreB: match?.scoreB};
      const {control, handleSubmit, formState: {errors} } = useForm({
          resolver: yupResolver(schema),
        defaultValues
      });

    
    const onCreate = (data) => {
        onResolve(data);
      };

  return (
    <>
       <Dialog header="Remplire le Score" visible={isOpen} onHide={() => onReject()} className="w-1/2">
    <form  className="mb-3" onSubmit={handleSubmit(onCreate)} method="POST">
            <div className="mb-3">
            <Controller control={control} name="scoreA" render={({field}) => (
             <NumberInput label="Score equipe domicile" error={errors.scoreA && errors.scoreA.message} value={field.value} onChange={field.onChange} withAsterisk/>
             )}/>
            </div>

            <div className="mb-3">
            <Controller control={control} name="scoreB" render={({field}) => (
            <NumberInput label="Score equipe exterieur" error={errors.scoreB && errors.scoreB.message} value={field.value} onChange={field.onChange} withAsterisk/>
             )}/>
            </div>
            <Button type="submit" className="bg-yellow-500 hover:bg-yellow-700"> METTRE A JOUR LE SCORE DU MATCH</Button>
          </form>
  </Dialog>
    </>
  )
}

export default create(UpdateMatchScoreModal);