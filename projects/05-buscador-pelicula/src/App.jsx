import './App.css'
import { useState, useRef, useCallback, useEffect } from 'react'
import {Movies} from './components/Movies'
import { useMovies } from './hooks/useMovies'
import debounce from 'just-debounce-it' 

function useSearch(){
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }
    if (search === ''){
      setError('Por favor, escribe algo en el buscador')
      return}
    if (search.match(/^[0-9]+$/)) {
      setError('No se permiten búsquedas con números')
      return
    }
    if (search.length < 3) {
      setError('Por favor, escribe al menos 3 caracteres')
      return
    }
    setError(null)
  }, [search])
  return {search, setSearch, error}
}

function App() {
  const [sort, setSort] = useState(false)
  const {search, setSearch, error} = useSearch()  
  const {movies, loading, getMovies} = useMovies({search, sort})
  
  const debouncedGetMovies = useCallback(
    debounce(search => {
      getMovies({search})
    }, 300)
    , [getMovies]
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    getMovies({search})
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (e) => {
    const newSearch = e.target.value
    setSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  return (
    <div>
      <header>
      <h1>Buscador de Películas</h1>
      <form className='form' onSubmit={handleSubmit}>
        <input onChange={handleChange} value={search} name='query' placeholder='Avengers, Star Wars...' />
        <input type="checkbox" onChange={handleSort} checked={sort} />
        <button type='submit'>Buscar</button>
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}
      </header>

      <main>
        {loading ? <p>Cargando...</p>
        : <Movies movies={movies} />}
      </main>
    </div>
  )
}

export default App
