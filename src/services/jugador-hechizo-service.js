import http from '../shared/services/http-common'

class JugadorHechizoService {
    GetByJugadorId(jugadorId) {
        return http.get(`/jugadorhechizos/${jugadorId}`)
    }

    Create(data) {
        return http.post('/jugadorhechizos', data)
    }
}

export default new JugadorHechizoService()