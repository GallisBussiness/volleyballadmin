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
import CreateUserModal from '../modals/CreateUserModal'
import UpdateUserModal from '../modals/UpdateUserModal'
import { createUser, getUsers, removeUser, updateUser } from '../services/Userservice'
import { ActionIcon, Button } from '@mantine/core';


function Users() {
    const [selectedUsers, setSelectedUsers] = useState([]);
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

    const qk = ['get_Users']

    const {data: Users, isLoading } = useQuery(qk, () => getUsers());

    const {mutate: create} = useMutation((data) => createUser(data), {
        onSuccess: (_) => {
            showNotification({
                title: 'Creation User',
                message: 'Création réussie !!',
                color:'green',
              })
         qc.invalidateQueries(qk);
        },
        onError: (_) => {
            showNotification({
                title: 'Creation User',
                message: 'Creation échouée !!',
                color:'red',
              })
        }
    })

    const {mutate: deleteD} = useMutation((id) => removeUser(id), {
        onSuccess: (_) => {
            showNotification({
                title: 'Suppréssion User',
                message: 'Suppréssion réussie !!',
                color:'green',
              })
         qc.invalidateQueries(qk);
        },
        onError: (_) => {
            showNotification({
                title: 'Suppréssion User',
                message: 'Suppréssion échouée !!',
                color:'red',
              })
        }
    })

    const {mutate: update} = useMutation((data) => {
      const {_id,...rest} = data;
      return updateUser(_id,rest);
    }, {
        onSuccess: (_) => {
            showNotification({
                title: 'Mise à jour User',
                message: 'Mis à jour réussie !!',
                color:'green',
              })
            qc.invalidateQueries(qk);
           },
           onError: (_) => {
            showNotification({
                title: 'Mis à jour User',
                message: 'Mis à jour échouée !!',
                color:'red',
              })
           }
    })

    const leftToolbarTemplate = () => {
        return (
            <div className="flex items-center justify-center space-x-2">
                <Button onClick={handleCreateUser} className="bg-green-500 hover:bg-green-600" leftIcon={<AiOutlinePlus />}>Nouveau</Button>
                <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-600" leftIcon={<MdDelete />}>Supprimer</Button>
            </div>
        )
    }


    const handleUpdateUser = (d) => {
        UpdateUserModal({user: d}).then(((v) => {
            update(v);
        }));
    }

    const handleCreateUser = () => {
        CreateUserModal().then(create);
    }

    const handleDelete = async () => {
      confirmDialog({
        message: 'Etes vous sur de supprimer ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => { 
          for(let i = 0; i < selectedUsers?.length; i++) {
            deleteD(selectedUsers[i]._id);
         }
        },
        reject: () => null,
    });
    }

    const renderHeader = () => {
        return (
            <div className="flex justify-between items-center">
                <h5 className="m-0">Liste des Admins</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Rechercher ..." />
                </span>
            </div>
        )
    }

    const actionBodyTemplate = (rowData) => {
        return <div className="flex items-center justify-center space-x-1">
           <ActionIcon color="yellow" size="lg" onClick={() => handleUpdateUser(rowData)}>
                <BsPencilSquare size={26} />
                </ActionIcon>
        </div>;
        
    }

    const header = renderHeader();
  return (
    <>
     <div className="flex flex-wrap bg-whity">
  <div className="w-full px-3 mb-6 lg:mb-0 lg:flex-none">
    <div className="relative flex flex-col h-40 min-w-0 break-words bg-white shadow-soft-xl  bg-clip-border">
      <div className="flex-auto p-4">
        <div className="flex flex-wrap -mx-3">
          <div className="max-w-full px-3 lg:w-1/2 lg:flex-none">
            <div className="flex items-center justify-start h-full">
              <h5 className="font-bold text-3xl">Liste des Admins</h5>
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
                <DataTable value={Users} paginator className="p-datatable-customers" header={header} rows={10}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}
                    dataKey="_id" rowHover selection={selectedUsers} onSelectionChange={e => setSelectedUsers(e.value)}
                    filters={filters} filterDisplay="menu" loading={isLoading} responsiveLayout="scroll"
                    globalFilterFields={['nom', 'prenom']}
                    currentPageReportTemplate="Voir {first} de {last} à {totalRecords} Users">
                    <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                    <Column field="prenom" header="Prenom" sortable style={{ minWidth: '14rem' }} />
                    <Column field="nom" header="Nom" sortable style={{ minWidth: '14rem' }} />
                    <Column field="tel" header="Téléphone" sortable style={{ minWidth: '14rem' }} />
                    <Column field="email" header="Email" sortable style={{ minWidth: '14rem' }} />
                    <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                </DataTable>
            </div>
        </div>
        <ConfirmDialog />
    </>
  )
}

export default Users