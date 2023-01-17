import { Dialog } from 'primereact/dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';

import { create } from 'react-modal-promise'
import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MdDelete, MdDoNotDisturbAlt } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';
import { ActionIcon, Button, Switch, TextInput } from '@mantine/core';
import { BsCheckCircle } from 'react-icons/bs';

const schema = yup.object({
    fullname: yup.string().required(),
    tel: yup.string().required(),
    email: yup.string().required(),
    isResponsable: yup.boolean(),
  }).required();

function AddMembreTournois({ isOpen, onResolve, onReject,membres }) {
 const [curMembre,setCurMembre] = useState(membres);
    const defaultValues = { fullname: '',
        tel: '',
        email: '',
        isResponsable: false
    };
const {control, handleSubmit,setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  defaultValues
});

const actionBodyTemplate = (rowData) => {
  return <div className="flex items-center justify-center space-x-1">
  <ActionIcon onClick={() => deleteMembre(rowData)}>
    <MdDelete />
  </ActionIcon>
  </div>;
  
}

const onCreate = () => {
    onResolve(curMembre);
  };

  const deleteMembre = (row) => {
    const rest = curMembre.filter(t => t.tel !== row.tel )
    setCurMembre(rest)
  }

  const addMembre = data => {
    const myd = {...data}
    setCurMembre(cur => ([...cur,myd]))
    setValue('fullname','');
    setValue('tel','');
    setValue('email','');
  };

  const responsableTemplate = (row) => row?.isResponsable ? <BsCheckCircle className="text-green-500" /> : <MdDoNotDisturbAlt className="text-gray-500" />;

  return (
    <>
         <Dialog header="Ajouter Membre" visible={isOpen} onHide={() => onReject(false)} className="w-1/2">
    <form  className="flex flex-col space-y-1 md: md:flex-row md:space-x-1 md:space-y-0" onSubmit={handleSubmit(addMembre)}>
            <div>
            <Controller control={control} name="fullname" render={({field}) => (
             <TextInput value={field.value} onChange={field.onChange} label="Nom complet" placeholder="votre nom complet" error={errors.fullname && errors.fullname.message} withAsterisk/>
             )}/>
            </div>
          
            <div>
            <Controller control={control} name="tel" render={({field}) => (
             <TextInput value={field.value} onChange={field.onChange} label="Telephone" placeholder="Telephone" error={errors.tel && errors.tel.message} withAsterisk/>
             )}/>
            </div>
            <div>
            <Controller control={control} name="email" render={({field}) => (
             <TextInput value={field.value} onChange={field.onChange} label="Email" placeholder="Email" error={errors.email && errors.email.message} withAsterisk/>
             )}/>
            </div>
            <div className="py-6 px-2">
            <Controller control={control} name="isResponsable" render={({field}) => (
             <Switch onLabel="OUI" offLabel="NON" value={field.value} onChange={field.onChange} label="Responsable"/>
             )}/>
            </div>
            <div className="self-end py-6 px-2">
            <Button type="submit" className="bg-green-400 hover:bg-green-600"> <FaPlus /> </Button>
            </div>
            
          </form>

          <div className="my-2">
            
          <DataTable value={curMembre}
                     size="small"
                    dataKey="tel" rowHover 
                    responsiveLayout="scroll"
                    emptyMessage="Aucun membres"
                    >
                    
                    <Column field="fullname" header="Nom Complet" style={{ minWidth: '8rem' }} />
                    <Column field="tel" header="Telephone"  style={{ minWidth: '8rem' }} />
                    <Column field="email" header="Email" style={{ minWidth: '8rem' }} />
                    <Column field="isResponsable" header="Responsable" body={responsableTemplate} style={{ minWidth: '8rem' }} />
                    <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                </DataTable>
          </div>
          <div className="my-2">
              <Button onClick={onCreate} className="bg-yellow-500 hover:bg-yellow-600">ENREGISTRER LES MEMBRES LOCAUX</Button>
          </div>
        
  </Dialog>
    </>
  )
}

export default create(AddMembreTournois)