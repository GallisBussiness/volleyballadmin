import { FilterMatchMode, FilterOperator } from 'primereact/api'
import { ConfirmDialog,confirmDialog } from 'primereact/confirmdialog';
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { showNotification } from '@mantine/notifications';
import { Toolbar } from 'primereact/toolbar'
import { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { InputText } from 'primereact/inputtext'
import { BsPencilSquare } from 'react-icons/bs'
import CreateTournoiModal from '../modals/CreateTournoiModal'
import UpdateTournoiModal from '../modals/UpdateTournoiModal'
import { createTournoi, getTournois, removeTournoi, updateTournoi,toggleClose } from '../services/tournoiservice'
import { ActionIcon, Button, LoadingOverlay, Switch } from '@mantine/core';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';


function Tournois() {
    const [selectedTournois, setSelectedTournois] = useState([]);
    const [checked, setChecked] = useState(false);
    const qc = useQueryClient()
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'nom': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'genre': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    }

    const qk = ['get_Tournois']

    const {data: Tournois, isLoading } = useQuery(qk, () => getTournois());

    const {mutate: create} = useMutation((data) => createTournoi(data), {
        onSuccess: (_) => {
            showNotification({
                title: 'Creation Tournoi',
                message: 'Création réussie !!',
                color:'green',
              })
         qc.invalidateQueries(qk);
        },
        onError: (_) => {
            showNotification({
                title: 'Creation Tournoi',
                message: 'Creation échouée !!',
                color:'red',
              })
        }
    })

    const {mutate: deleteD} = useMutation((id) => removeTournoi(id), {
        onSuccess: (_) => {
            showNotification({
                title: 'Suppréssion Tournoi',
                message: 'Suppréssion réussie !!',
                color:'green',
              })
         qc.invalidateQueries(qk);
        },
        onError: (_) => {
            showNotification({
                title: 'Suppréssion Tournoi',
                message: 'Suppréssion échouée !!',
                color:'red',
              })
        }
    })

    const {mutate: update} = useMutation((data) => {
      const {_id,...rest} = data;
      return updateTournoi(_id,rest);
    }, {
        onSuccess: (_) => {
            showNotification({
                title: 'Mise à jour Tournoi',
                message: 'Mis à jour réussie !!',
                color:'green',
              })
            qc.invalidateQueries(qk);
           },
           onError: (_) => {
            showNotification({
                title: 'Mis à jour Tournoi',
                message: 'Mis à jour échouée !!',
                color:'red',
              })
           }
    })

    const {mutate: toggle, isLoading: toggleLoading} = useMutation((data) => toggleClose(data.id,data.data), {
      onSuccess: (_) => {
          showNotification({
              title: 'Activation Tournoi',
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
                <Button onClick={handleCreateTournoi} className="bg-green-500 hover:bg-green-600" leftIcon={<AiOutlinePlus />}>Nouveau</Button>
                <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-600" leftIcon={<MdDelete />}>Supprimer</Button>
            </div>
        )
    }


    const handleUpdateTournoi = (d) => {
        UpdateTournoiModal({tournoi: d}).then(((v) => {
            update(v);
        }));
    }

    const handleCreateTournoi = () => {
        CreateTournoiModal().then(create);
    }

    const handleDelete = async () => {
      confirmDialog({
        message: 'Etes vous sur de supprimer ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => { 
          for(let i = 0; i < selectedTournois?.length; i++) {
           deleteD(selectedTournois[i]._id);
          }
        },
        reject: () => null,
    });
    }

    const renderHeader = () => {
        return (
            <div className="flex justify-between items-center">
                <h5 className="m-0">Liste des Tournois</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Rechercher ..." />
                </span>
            </div>
        )
    }

    const actionBodyTemplate = (rowData) => {
        return <div className="flex items-center justify-center space-x-1">
           <ActionIcon color="yellow" size="lg" onClick={() => handleUpdateTournoi(rowData)}>
                <BsPencilSquare size={26} />
                </ActionIcon>
                <Link to={`/tournois/${rowData._id}`}>
              <ActionIcon size="md">
                <FaEye  className="h-12 w-12 text-blue-500"/>
              </ActionIcon>
            </Link>
        </div>;
        
    }

    const header = renderHeader();
    const activationTemplate = (row) => {
      return <Switch checked={row.ferme} onChange={(event) => {
        setChecked(event.currentTarget.checked)
        toggle({id: row._id,data: {isActive: event.currentTarget.checked}})
      }} />
    }

    const dateTemplate = (row) => format(parseISO(row.date),'dd-MM-yyyy');
    const genreTemplate = (row) => row.genre === 'H' ? 'HOMME' : row.genre === 'F' ? 'FEMME' : 'MIXTE';

  return (
    <>
    <LoadingOverlay visible={toggleLoading} overlayBlur={2} />
     <div className="flex flex-wrap bg-whity">
  <div className="w-full px-3 mb-6 lg:mb-0 lg:flex-none">
    <div className="relative flex flex-col h-40 min-w-0 break-words bg-white shadow-soft-xl  bg-clip-border">
      <div className="flex-auto p-4">
        <div className="flex flex-wrap -mx-3">
          <div className="max-w-full px-3 lg:w-1/2 lg:flex-none">
            <div className="flex items-center justify-start h-full">
              <h5 className="font-bold text-3xl">Liste des Tournois</h5>
              <img className="relative z-20 w-32 pt-6 h-32" src="/img/tournoi.png" alt="Tournois" />
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
                <DataTable value={Tournois} paginator className="p-datatable-customers" header={header} rows={10}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}
                    dataKey="_id" rowHover selection={selectedTournois} onSelectionChange={e => setSelectedTournois(e.value)}
                    filters={filters} filterDisplay="menu" loading={isLoading} responsiveLayout="scroll"
                    globalFilterFields={['nom', 'type']}
                    currentPageReportTemplate="Voir {first} de {last} à {totalRecords} tournois">
                    <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                    <Column header="Ferme" body={activationTemplate} style={{ minWidth: '6rem' }} />
                    <Column field="nom" header="Nom" sortable style={{ minWidth: '6rem' }} />
                    <Column field="date" header="Date" sortable body={dateTemplate} style={{ minWidth: '6rem' }} />
                    <Column field="type" header="Type de Tournoi" sortable style={{ minWidth: '6rem' }} />
                    <Column field="genre" header="genre" body={genreTemplate} sortable style={{ minWidth: '6rem' }} />
                    <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                </DataTable>
            </div>
        </div>
        <ConfirmDialog />
    </>
  )
}

export default Tournois