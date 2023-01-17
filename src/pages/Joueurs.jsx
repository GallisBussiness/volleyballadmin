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
import {  getJoueurs, removeJoueur, setActiveJoueur} from '../services/joueur-service'
import { ActionIcon, Button, LoadingOverlay, Switch } from '@mantine/core';


function Joueurs() {
    const [selectedJoueurs, setSelectedJoueurs] = useState([]);
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

    const qk = ['get_Joueurs']

    const {data: Joueurs, isLoading } = useQuery(qk, () => getJoueurs());


    const {mutate: deleteD} = useMutation((id) => removeJoueur(id), {
        onSuccess: (_) => {
            showNotification({
                title: 'Suppréssion Joueur',
                message: 'Suppréssion réussie !!',
                color:'green',
              })
         qc.invalidateQueries(qk);
        },
        onError: (_) => {
            showNotification({
                title: 'Suppréssion Joueur',
                message: 'Suppréssion échouée !!',
                color:'red',
              })
        }
    })

    const {mutate: activer, isLoading: activeLoading} = useMutation((data) => setActiveJoueur(data.id,data.data), {
      onSuccess: (_) => {
          showNotification({
              title: 'Activation Joueur',
              message: 'Modification réussie',
              color:'green',
            })
       qc.invalidateQueries(qk);
      },
      onError: (_) => {
          showNotification({
              title: 'Activation Joueur',
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
          for(let i = 0; i < selectedJoueurs?.length; i++) {
            deleteD(selectedJoueurs[i]._id);
         }
        },
        reject: () => null,
    });
            
    }

    const renderHeader = () => {
        return (
            <div className="flex justify-between items-center">
                <h5 className="m-0">Liste des Joueurs</h5>
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
      return <Switch checked={row.isActive} onChange={(event) => {
        setChecked(event.currentTarget.checked)
        activer({id: row._id,data: {isActive: event.currentTarget.checked}})
      }} />
    }

  return (
    <>
    <LoadingOverlay visible={activeLoading} overlayBlur={2} />
     <div className="flex flex-wrap bg-whity">
  <div className="w-full px-3 mb-6 lg:mb-0 lg:flex-none">
    <div className="relative flex flex-col h-40 min-w-0 break-words bg-white shadow-soft-xl  bg-clip-border">
      <div className="flex-auto p-4">
        <div className="flex flex-wrap -mx-3">
          <div className="max-w-full px-3 lg:w-1/2 lg:flex-none">
            <div className="flex items-center justify-start h-full">
              <h5 className="font-bold text-3xl">Liste des Joueurs</h5>
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
                <DataTable value={Joueurs} paginator className="p-datatable-customers" header={header} rows={10}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}
                    dataKey="_id" rowHover selection={selectedJoueurs} onSelectionChange={e => setSelectedJoueurs(e.value)}
                    filters={filters} filterDisplay="menu" loading={isLoading} responsiveLayout="scroll"
                    globalFilterFields={['nom', 'prenom']}
                    currentPageReportTemplate="Voir {first} de {last} à {totalRecords} Joueurs">
                    <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                    <Column header="Activation" body={activationTemplate} style={{ minWidth: '6rem' }} />
                    <Column field="prenom" header="Prenom" sortable style={{ minWidth: '6rem' }} />
                    <Column field="nom" header="Nom" sortable style={{ minWidth: '6rem' }} />
                    <Column field="tel" header="Téléphone" sortable style={{ minWidth: '6rem' }} />
                    <Column field="email" header="Email" sortable style={{ minWidth: '6rem' }} />
                    <Column field="licence" header="Numero Licence" sortable style={{ minWidth: '6rem' }} />
                    <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                </DataTable>
            </div>
        </div>
        <ConfirmDialog />
    </>
  )
}

export default Joueurs