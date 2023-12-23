 import http from '../shared/services/http-common'

 class JugadorService {
    GetAll() {
        return http.get('/jugadores')
    }

    Create(data) {
        return http.post('/jugadores', data)
    }

    GetById(id) {
        return http.get(`/jugadores/${id}`)
    }

    Update(id, data) {
        return http.put(`/jugadores/${id}`, data)
    }

    Delete(id) {
        return http.delete(`/jugadores/${id}`)
    }

    Login(data) {
        return http.post('/jugadores/buscar', data)
    }
 }

 export default new JugadorService()