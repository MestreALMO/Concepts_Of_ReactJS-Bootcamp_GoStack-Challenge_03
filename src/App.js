import React, { useState, useEffect } from 'react';
import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
      api.get('repositories').then(response => {
        setRepositories(response.data);
      });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
        title: `Repository: ${Date.now()}`,
        url: "https://github.com/MestreALMO",
        techs: ["Node.js", "ReactJS"]
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = api.delete(`repositories/${id}`);
    const index = repositories.findIndex(repository => repository.id === id);
    repositories.splice(index,1);
    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repositories.id}>
            {/* Repositório 1 */}
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remove
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Add</button>
    </div>
  );
}

export default App;
