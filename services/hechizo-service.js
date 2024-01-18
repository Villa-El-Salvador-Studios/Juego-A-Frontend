import http from '../shared/services/http-common'

class HechizoService {
    GetAll() {
        return http.get('/hechizos')
    }

    GetByHechizoId(id) {
        return http.get(`/hechizos/${id}`)
    }

    Update(id, data) {
        return http.put(`/hechizos/${id}`, data)
    }
}

export default new HechizoService()