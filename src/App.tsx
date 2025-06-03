import { useState } from 'react'
import './App.css'

interface CatFact {
  fact: string;
  length: number;
}

function App() {
  const [fact, setFact] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const fetchRandomFact = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('https://catfact.ninja/fact')
      const data: CatFact = await response.json()
      setFact(data.fact)
    } catch (error) {
      console.error('Error fetching fact:', error)
      setFact('Failed to fetch fact. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app-container">
      <div className="task-description">
        <h2>Frontend Challenge</h2>
        <p className="description">
          This is a React application that demonstrates fetching and displaying data from a public API.
          Click the button below to fetch a random cat fact.
        </p>
      </div>

      <div className="content-container">
        <h1>Random Cat Facts</h1>
        <button 
          className="fetch-button"
          onClick={fetchRandomFact}
          disabled={isLoading}
        >
          {isLoading ? 'Fetching...' : 'Get Random Fact'}
        </button>
        
        <div className="fact-container">
          {fact ? (
            <p className="fact">{fact}</p>
          ) : (
            <p className="placeholder">Your random fact will appear here</p>
          )}
        </div>
      </div>

      <footer className="footer">
        <p>Built with React + TypeScript + Vite</p>
      </footer>
    </div>
  )
}

export default App
