import http from '../shared/services/http-common'

class ObjetoService {
    GetAll() {
        return http.get('/objetos')
    }

    GetByObjetoId(id) {
        return http.get(`/objetos/${id}`)
    }
}

export default new ObjetoService()