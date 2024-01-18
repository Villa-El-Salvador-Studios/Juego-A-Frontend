import http from '../shared/services/http-common'

class HabilidadService {
    GetAll() {
        return http.get('/habilidades')
    }

    GetByHabilidadId(id) {
        return http.get(`/habilidades/${id}`)
    }

    Update(id, data) {
        return http.put(`/habilidades/${id}`, data)
    }
}

export default new HabilidadService()