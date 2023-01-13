import Api from "./api";

export const createTournoiType = (data) => Api.post('/tournoi-type', data).then(res => res.data);
export const getTournoiTypes = () => Api.get('/tournoi-type').then(res => res.data);
export const updateTournoiType = (id,data) => Api.patch('/tournoi-type/' + id, data).then(res => res.data);
export const removeTournoiType = (id) => Api.delete('/tournoi-type/'+id).then(res => res.data);