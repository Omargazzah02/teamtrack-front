import api from "./api"
export function getProjects() {
  return api.get('/project').then(res => res.data)
}

export function getProjectById(id) {
  return api.get(`/project/${id}`);
}

export function createProject(title , description ) {
    return api.post('/project/add' , {title,description} )
}



export function deleteProject(id) {
  return api.delete(`/project/${id}`);
}





// collaborators 

export function addCollaborator (userId , projectId) {
  return api.post(`/project/add-collaborator/${projectId}` ,
    {userId}
  )
}


export function getCollaborators (projectId) {
  return api.get(`/project/collaborators/${projectId}`).then(res => res.data);
  
}

export function deleteCollaborator (userId , projectId)  {
  return  api.delete(`/project/${projectId}/collaborator/${userId}`);
  }


  export function getUsers () {
    return api.get('/project/users/get').then(res => res.data);
  }