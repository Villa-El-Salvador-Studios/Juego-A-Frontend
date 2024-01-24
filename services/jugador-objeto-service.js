import http from '../shared/services/http-common'

class JugadorObjetoService {
    GetByJugadorIdAndObjetoId(jugadorId, objetoId) {
        return http.get(`/jugadorobjetos/${jugadorId}/${objetoId}`)
    }

    Update(jugadorId, objetoId, data) {
        return http.put(`/jugadorobjetos/${jugadorId}/${objetoId}`, data)
    }

    Create(data) {
        return http.post('/jugadorobjetos', data)
    }
}

export default new JugadorObjetoService()