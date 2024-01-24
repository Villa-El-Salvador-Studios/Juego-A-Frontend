import http from '../shared/services/http-common'

class HabilidadPersonajeService {

    GetByPersonajeId(id) {
        return http.get(`/habilidadpersonajes/${id}`)
    }

    Create(data) {
        return http.post('/habilidadpersonajes', data)
    }
}

export default new HabilidadPersonajeService()
