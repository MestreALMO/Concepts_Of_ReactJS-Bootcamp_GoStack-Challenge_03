import React, { useState, useEffect } from 'react';
import "./styles.css";
import api from "./services/api";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
      api.get('projects').then(response => {
          setProjects(response.data);
      });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('projects', {
        title: `New repository ${Date.now()}`,
        owner: 'André Lusegardis'
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  async function handleRemoveRepository(id) {
    // const response = await api.delete(
    //   // AQUI
    // );
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map(project => 
          <li key={project.id}>
            {/* Repositório 1 */}
            {project.title}

            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
