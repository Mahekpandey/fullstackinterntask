import { useState } from 'react'
import './App.css'

interface CatFact {
  fact: string;
  length: number;
}

// Get the API URL based on the environment
const API_URL = import.meta.env.PROD 
  ? '/api/check-prime'  // Production URL (relative path for Vercel)
  : 'http://localhost:5000/api/check-prime'; // Development URL

function App() {
  const [fact, setFact] = useState<string>('')
  const [number, setNumber] = useState<string>('')
  const [result, setResult] = useState<string>('')
  const [isLoadingFact, setIsLoadingFact] = useState(false)
  const [isLoadingPrime, setIsLoadingPrime] = useState(false)

  const fetchRandomFact = async () => {
    try {
      setIsLoadingFact(true)
      const response = await fetch('https://catfact.ninja/fact')
      const data: CatFact = await response.json()
      setFact(data.fact)
    } catch (error) {
      console.error('Error fetching fact:', error)
      setFact('Failed to fetch fact. Please try again.')
    } finally {
      setIsLoadingFact(false)
    }
  }

  const checkPrime = async () => {
    try {
      setIsLoadingPrime(true)
      console.log('Sending request to:', API_URL)
      console.log('Request body:', { number: Number(number) })
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number: Number(number) }),
      })
      
      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Response data:', data)
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to check prime number')
      }
      
      setResult(data.isPrime 
        ? `${number} is a prime number!` 
        : `${number} is not a prime number.`)
    } catch (error) {
      console.error('Error checking prime:', error)
      setResult('Failed to check prime number. Please try again.')
    } finally {
      setIsLoadingPrime(false)
    }
  }

  return (
    <div className="app-container">
      <div className="task-description">
        <h2>Multi-Feature Demo</h2>
        <p className="description">
          This app demonstrates fetching cat facts and checking prime numbers.
        </p>
      </div>

      <div className="content-container">
        <section className="cat-facts-section">
          <h3>Random Cat Facts</h3>
          <button 
            className="fetch-button"
            onClick={fetchRandomFact}
            disabled={isLoadingFact}
          >
            {isLoadingFact ? 'Fetching...' : 'Get Random Fact'}
          </button>
          
          <div className="fact-container">
            {fact ? (
              <p className="fact">{fact}</p>
            ) : (
              <p className="placeholder">Your random fact will appear here</p>
            )}
          </div>
        </section>

        <section className="prime-checker-section">
          <h3>Prime Number Checker</h3>
          <div className="input-section">
            <input
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Enter a number"
              className="number-input"
            />
            <button 
              className="check-button"
              onClick={checkPrime}
              disabled={isLoadingPrime || !number}
            >
              {isLoadingPrime ? 'Checking...' : 'Check Prime'}
            </button>
          </div>
          
          <div className="result-container">
            {result && (
              <p className="result">{result}</p>
            )}
          </div>
        </section>
      </div>

     
    </div>
  )
}

export default App
