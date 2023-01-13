import Api from "./api";

export const createEquipe = (data) => Api.post('/equipe', data).then(res => res.data);
export const setActiveEquipe = (id,data) => Api.post('/equipe/validate/' + id, data).then(res => res.data);
export const getEquipes = () => Api.get('/equipe').then(res => res.data);
export const getEquipeByTournoi = (id) => Api.get('/equipe/bytournoi/' + id).then(res => res.data);
export const updateEquipe = (id,data) => Api.patch('/equipe/' + id, data).then(res => res.data);
export const removeEquipe = (id) => Api.delete('/equipe/'+id).then(res => res.data);