import http from '../shared/services/http-common'

class ObjetoService {
    GetAll() {
        return http.get('/objetos')
    }

    GetByObjetoId(id) {
        return http.get(`/objetos/${id}`)
    }

    Update(id, data) {
        return http.put(`/objetos/${id}`, data)
    }
}

export default new ObjetoService()