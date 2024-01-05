import http from "../shared/services/http-common";

class MundoService {
    GetAll() {
        return http.get('/mundos')
    }

    Create(data) {
        return http.post('/mundos', data)
    }

    Update(id, data) {
        return http.put(`/mundos/${id}`, data)
    }

    Delete(id) {
        return http.delete(`/mundos/${id}`)
    }
}

export default new MundoService()