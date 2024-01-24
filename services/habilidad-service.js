import http from '../shared/services/http-common'

class HabilidadService {
    GetAll() {
        return http.get('/habilidades')
    }

    GetByHabilidadId(id) {
        return http.get(`/habilidades/${id}`)
    }
}

export default new HabilidadService()