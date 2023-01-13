import Api from "./api";

export const createMatch = (data) => Api.post('/match', data).then(res => res.data);
export const getMatchs = () => Api.get('/match').then(res => res.data);
export const updateMatch = (id,data) => Api.patch('/match/' + id, data).then(res => res.data);
export const removeMatch = (id) => Api.delete('/match/'+id).then(res => res.data);
export const toggleClose = (id,data) => Api.post('/match/toggle/' + id, data).then(res => res.data);