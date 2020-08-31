import React, {useState, useEffect} from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  const [repositories, setRepo] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepo(response.data);
    });
    
  }, []);

  //ADD REPOSITORY
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo projeto ${Date.now()}`,
      url: "github.com",
      techs: "React.js"
    });

    const repository = response.data;

    setRepo([...repositories, repository]);
  }

  //REMOVE REPOSITORY
  async function handleRemoveRepository(id) {
  await api.delete(`repositories/${id}`);    

    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository => <li key={repository.id}>{repository.title} 
        <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
        </li>)}
      </ul>
      <div>
        <button onClick={handleAddRepository}>Adicionar</button>
      </div>
    </div>
  );
}

export default App;
