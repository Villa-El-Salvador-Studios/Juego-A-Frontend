import http from "../shared/services/http-common";

class MundoService {
    GetAll() {
        return http.get('/mundos')
    }

    GetById(id) {
        return http.get(`/mundos/${id}`)
    }

    Update(id, data) {
        return http.put(`/mundos/${id}`, data)
    }
}

export default new MundoService()