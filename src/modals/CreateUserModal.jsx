import { Dialog } from 'primereact/dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { create } from 'react-modal-promise'
import { Button, Input, PasswordInput, TextInput } from '@mantine/core';
import { FiAtSign } from 'react-icons/fi';
import { MaskField } from 'react-mask-field';


const schema = yup.object({
    prenom: yup.string()
    .required(),
    nom: yup.string()
    .required(),
   tel: yup.string().required(),
   email: yup.string().email().required(),
   password: yup.string().required(),
  }).required();


const CreateUserModal = ({ isOpen, onResolve, onReject }) => {

    const defaultValues = {nom: '', prenom: '',tel: '',email: '', password: (Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)).substring(0,9)};
    const {control,setValue, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
      defaultValues
    });


  const generatePassword = (e) =>  {
      e.preventDefault();
      setValue("password",(Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)).substring(0,9))
  }
  
  const onCreate = data => {
      onResolve(data);
    };

  return (
    <>
        <Dialog header="Creer un utilisateur" visible={isOpen} onHide={() => onReject(false)} className="w-1/2">
    <form  className="mb-3" onSubmit={handleSubmit(onCreate)} method="POST">
    <div className="mb-3">
            <Controller control={control} name="prenom" render={({field}) => (
              <TextInput
              placeholder="Prénom"
              label="Prénom"
              withAsterisk
              value={field.value}
              onChange={field.onChange}
              error={errors.prenom && errors.prenom.message}
            />
        
             )}/>
            </div>
            <div className="mb-3">
            <Controller control={control} name="nom" render={({field}) => (
              <TextInput
              placeholder="Nom"
              label="Nom"
              withAsterisk
              value={field.value}
              onChange={field.onChange}
              error={errors.nom && errors.nom.message}
            />
             )}/>
            </div>
            <div className="mb-3">
            <Controller control={control} name="email" render={({field}) => (
              <TextInput
              placeholder="Email"
              label="Email"
              withAsterisk
              value={field.value}
              onChange={field.onChange}
              error={errors.email && errors.email.message}
              icon={<FiAtSign/>}
            />
             )}/>
            </div>
            <div className="mb-3 flex flex-col space-y-2">
            <Controller control={control} name="tel" render={({field}) => (
              <Input.Wrapper id="tel" label="Téléphone" error={errors.tel && errors.tel.message} required>
              <Input component={MaskField} mask="+221 (__) ___-__-__" replacement={{ _: /\d/ }} id="tel" placeholder="Numéro de téléphone" value={field.value} onChange={field.onChange}/>
            </Input.Wrapper>
             )}/>
            </div>
            <div className="mb-3 w-full">           
                  <Controller control={control} name="password" render={({field}) => (
                    <div className="flex items-center space-x-4 w-full">
                                        <PasswordInput
                        placeholder="Mot de Passe"
                        label="Mot de Passe"
                        withAsterisk
                        value={field.value} onChange={field.onChange}
                        error={errors.password && errors.password.message}
                        className="w-full"
                      />
                      <Button className="bg-green-500 hover:border-green-600" onClick={generatePassword}>Generer un mot de passe</Button>
                    </div>
                    
                    )} />
                  </div>
            
                  <Button type="submit" className="bg-yellow-500 hover:bg-yellow-700"> CREER L'UTILISATEUR</Button>
          </form>
  </Dialog>
    </>
  )
}

export default create(CreateUserModal);