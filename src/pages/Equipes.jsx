import { FilterMatchMode, FilterOperator } from 'primereact/api'
import { ConfirmDialog,confirmDialog } from 'primereact/confirmdialog';
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { showNotification } from '@mantine/notifications';
import { Toolbar } from 'primereact/toolbar'
import { useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { InputText } from 'primereact/inputtext'
import { BsPencilSquare } from 'react-icons/bs'
import {  getEquipes, removeEquipe, setActiveEquipe} from '../services/equipe-service'
import { ActionIcon, Button, Switch } from '@mantine/core';


function Equipes() {
    const [selectedEquipes, setSelectedEquipes] = useState([]);
    const [checked, setChecked] = useState(false);
    const qc = useQueryClient()
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'nom': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'prenom': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    }

    const qk = ['get_Equipes']

    const {data: Equipes, isLoading } = useQuery(qk, () => getEquipes());


    const {mutate: deleteD} = useMutation((id) => removeEquipe(id), {
        onSuccess: (_) => {
            showNotification({
                title: 'Suppréssion Equipe',
                message: 'Suppréssion réussie !!',
                color:'green',
              })
         qc.invalidateQueries(qk);
        },
        onError: (_) => {
            showNotification({
                title: 'Suppréssion Equipe',
                message: 'Suppréssion échouée !!',
                color:'red',
              })
        }
    })

    const {mutate: activer} = useMutation((data) => setActiveEquipe(data.id,data.data), {
      onSuccess: (_) => {
          showNotification({
              title: 'Activation Equipe',
              message: 'Modification réussie',
              color:'green',
            })
       qc.invalidateQueries(qk);
      },
      onError: (_) => {
          showNotification({
              title: 'Activation Equipe',
              message: 'Activation échouée !!',
              color:'red',
            })
      }
  })

    const leftToolbarTemplate = () => {
        return (
            <div className="flex items-center justify-center space-x-2">
                <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-600" leftIcon={<MdDelete />}>Supprimer</Button>
            </div>
        )
    }

    const handleDelete = async () => {
      confirmDialog({
        message: 'Etes vous sur de supprimer ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => { 
          for(let i = 0; i < selectedEquipes?.length; i++) {
            deleteD(selectedEquipes[i]._id);
         }
        },
        reject: () => null,
    });
    }

    const renderHeader = () => {
        return (
            <div className="flex justify-between items-center">
                <h5 className="m-0">Liste des Equipes</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Rechercher ..." />
                </span>
            </div>
        )
    }

    const actionBodyTemplate = (rowData) => {
        return <div className="flex items-center justify-center space-x-1">
           <ActionIcon color="yellow" size="lg">
                <BsPencilSquare size={26} />
                </ActionIcon>
        </div>;
        
    }

    const header = renderHeader();

    const activationTemplate = (row) => {
      return <Switch checked={row.isValidate} onChange={(event) => {
        setChecked(event.currentTarget.checked)
        activer({id: row._id,data: {isActive: event.currentTarget.checked}})
      }} />
    }

    const joueur1Template = (row) => `${row?.idCapitaine?.prenom} ${row?.idCapitaine?.nom}`;

    const joueur2Template = (row) => `${row?.idCoequipier?.prenom} ${row?.idCoequipier?.nom}`;

  return (
    <>
     <div className="flex flex-wrap bg-whity">
  <div className="w-full px-3 mb-6 lg:mb-0 lg:flex-none">
    <div className="relative flex flex-col h-40 min-w-0 break-words bg-white shadow-soft-xl  bg-clip-border">
      <div className="flex-auto p-4">
        <div className="flex flex-wrap -mx-3">
          <div className="max-w-full px-3 lg:w-1/2 lg:flex-none">
            <div className="flex items-center justify-start h-full">
              <h5 className="font-bold text-3xl">Liste des Equipes</h5>
            </div>
          </div>
          <div className="max-w-full h-40 px-3 mt-12 ml-auto text-center lg:mt-0 lg:w-5/12 hidden lg:block">
            <div className="h-full bg-gradient-to-tl from-primary to-blue-300 rounded-xl">
              <div className="relative flex items-center justify-center h-full">
                       
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div className="datatable-doc mt-4 mx-10">
            <div className="card">
            <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
                <DataTable value={Equipes} paginator className="p-datatable-customers" header={header} rows={10}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}
                    dataKey="_id" rowHover selection={selectedEquipes} onSelectionChange={e => setSelectedEquipes(e.value)}
                    filters={filters} filterDisplay="menu" loading={isLoading} responsiveLayout="scroll"
                    globalFilterFields={['nom']}
                    currentPageReportTemplate="Voir {first} de {last} à {totalRecords} Equipes">
                    <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                    <Column field="nom" header="Nom" sortable style={{ minWidth: '10rem' }} />
                    <Column field="idTournoi.nom" header="Tournoi" sortable style={{ minWidth: '6rem' }} />
                    <Column header="Joueur 1" body={joueur1Template} sortable style={{ minWidth: '10rem' }} />
                    <Column header="Joueur 2"  body={joueur2Template} sortable style={{ minWidth: '10rem' }} />
                    <Column header="Validation" body={activationTemplate} style={{ minWidth: '14rem' }} />
                    <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                </DataTable>
            </div>
        </div>
        <ConfirmDialog />
    </>
  )
}

export default Equipes