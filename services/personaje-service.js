import http from "../shared/services/http-common"; 

class PersonajeService {
    GetAll() {
        return http.get('/personajes')
    }

    Create(data) {
        return http.post('/personajes', data)
    }

    GetById(id) {
        return http.get(`/personajes/${id}`)
    }

    GetByJugadorId(id) {
        return http.get(`/personajes/jugador/${id}`)
    }

    Update(id, data) {
        return http.put(`/personajes/${id}`, data)
    }

    Delete(id) {
        return http.delete(`/personajes/${id}`)
    }
}

export default new PersonajeService()