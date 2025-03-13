import React from 'react'
import { useParams } from 'react-router-dom'
import ProjectProgress from '../../components/project/ProjectProgress'

const ProjectView = () => {
    const {projectId} = useParams()
  return (
    <div>
        <ProjectProgress projectId={projectId}/>
    </div>
  )
}

export default ProjectView