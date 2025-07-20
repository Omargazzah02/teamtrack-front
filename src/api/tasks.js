import api from "./api"

export function getTasksByProjectId (id ) {
    return api.get(`/task/byproject/${id}`);

}


export function addTask(title , description , id ) {
    return api.post(`/task/add/${id}` , {title,description} )
}


export function updateTask (state , id ) {
    return api.put(`/task/${id}`, {state})
}


export function deleteTask (id) {
    return api.delete(`/task/${id}`)
}