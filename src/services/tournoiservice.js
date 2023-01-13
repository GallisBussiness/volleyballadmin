import Api from "./api";

export const createTournoi = (data) => Api.post('/tournoi', data).then(res => res.data);
export const getTournois = () => Api.get('/tournoi').then(res => res.data);
export const getTournoi = (id) => Api.get('/tournoi/'+ id).then(res => res.data);
export const updateTournoi = (id,data) => Api.patch('/tournoi/' + id, data).then(res => res.data);
export const removeTournoi = (id) => Api.delete('/tournoi/'+id).then(res => res.data);
export const toggleClose = (id,data) => Api.post('/tournoi/toggle/' + id, data).then(res => res.data);