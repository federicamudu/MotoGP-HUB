import { useState, useEffect } from 'react'
import Header from './components/Header'
import TabellaClassifica from './components/TabellaClassifica'
import CalendarioGare from './components/CalendarioGare'
import ModaleRisultati from './components/ModaleRisultati'
import ModalePilota from './components/ModalePilota'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [schedaAttiva, setSchedaAttiva] = useState('classifica') 
  const [classifica, setClassifica] = useState([])
  const [calendario, setCalendario] = useState([])
  const [loading, setLoading] = useState(true)
  const [categoriaAttiva, setCategoriaAttiva] = useState('motogp');
  const [tipoClassifica, setTipoClassifica] = useState('piloti')

  const [modaleAperto, setModaleAperto] = useState(false)
  const [garaSelezionata, setGaraSelezionata] = useState(null)
  const [risultatiGara, setRisultatiGara] = useState([])
  const [loadingModale, setLoadingModale] = useState(false)

  const [modalePilotaAperto, setModalePilotaAperto] = useState(false)
  const [pilotaSelezionato, setPilotaSelezionato] = useState(null)
  const [loadingPilota, setLoadingPilota] = useState(false)

  const BASE_URL = "https://moto-gp-project.vercel.app" 
  //const BASE_URL = "http://127.0.0.1:8000" 

  useEffect(() => {
    setLoading(true)
    
    let urlClassifica = `${BASE_URL}/api/classifica/${categoriaAttiva}`
    if (tipoClassifica === 'team') urlClassifica = `${BASE_URL}/api/classifica_team/${categoriaAttiva}`
    if (tipoClassifica === 'costruttori') urlClassifica = `${BASE_URL}/api/classifica_costruttori/${categoriaAttiva}`

    Promise.all([
      fetch(urlClassifica).then(res => res.json()),
      fetch(`${BASE_URL}/api/calendario`).then(res => res.json())
    ]).then(([datiClassifica, datiCalendario]) => {
      setClassifica(Array.isArray(datiClassifica) ? datiClassifica : [])
      setCalendario(Array.isArray(datiCalendario) ? datiCalendario : [])
      setLoading(false)
    }).catch(error => {
      console.error("Errore:", error)
      setLoading(false)
    })
  }, [categoriaAttiva, tipoClassifica])

  const apriDettagliPilota = (pilotaClassifica) => {
    setModalePilotaAperto(true)
    setLoadingPilota(true)
    setPilotaSelezionato(null)
    
    fetch(`${BASE_URL}/api/pilota/${encodeURIComponent(pilotaClassifica.nome)}?categoria=${categoriaAttiva}`)
      .then(res => res.json())
      .then(data => {
        setPilotaSelezionato(data)
        setLoadingPilota(false)
      })
      .catch(err => {
        console.error(err)
        setLoadingPilota(false)
      })
  }

  const apriDettagliGara = (gara) => {
    if (gara.stato !== 'FINISHED') return;
    setGaraSelezionata(gara)
    setModaleAperto(true)
    setLoadingModale(true)
    setRisultatiGara([])

    fetch(`${BASE_URL}/api/risultati_gara/${gara.id}?categoria=${categoriaAttiva}`)
      .then(res => res.json())
      .then(data => {
        setRisultatiGara(Array.isArray(data) ? data : []);
        setLoadingModale(false);
      }).catch(() => setLoadingModale(false))
  }

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-zinc-200 dark:bg-zinc-950 py-8 px-4 font-sans text-zinc-900 dark:text-zinc-200 transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          
          <Header 
            schedaAttiva={schedaAttiva} setSchedaAttiva={setSchedaAttiva} 
            calendario={calendario} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} baseUrl={BASE_URL}
          />
          {/* SELETTORE CATEGORIA */}
          <div className="flex justify-center bg-zinc-900 border-x border-zinc-800 p-2 space-x-2">
            {['motogp', 'moto2', 'moto3'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaAttiva(cat)}
                className={`px-6 py-2 rounded uppercase font-black tracking-widest text-sm transition-all duration-200 ${
                  categoriaAttiva === cat 
                    ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)] scale-105' 
                    : 'bg-zinc-800 text-zinc-500 hover:text-white hover:bg-zinc-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          {/* SELETTORE TIPO CLASSIFICA */}
          <div className="flex justify-center bg-zinc-950 p-3 space-x-4 border-b border-zinc-800">
            {['piloti', 'team', 'costruttori'].map((tipo) => (
              <button
                key={tipo}
                onClick={() => setTipoClassifica(tipo)}
                className={`uppercase font-bold tracking-wider text-xs pb-1 transition-all border-b-2 ${
                  tipoClassifica === tipo 
                    ? 'border-red-600 text-red-500' 
                    : 'border-transparent text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {tipo}
              </button>
            ))}
          </div>
          {/* Bordi meno arrotondati (rounded-b anziché rounded-b-2xl) */}
          <div className="bg-white dark:bg-zinc-900 rounded-b shadow-2xl dark:shadow-[0_0_40px_rgba(0,0,0,0.5)] border-x border-b border-zinc-300 dark:border-zinc-800 min-h-[400px] transition-colors duration-300">
            {loading ? (
              <div className="p-10 text-center font-mono text-zinc-500 dark:text-red-500 font-bold animate-pulse mt-10 tracking-widest uppercase">
                `&gt;` SCALDANDO I MOTORI...
              </div>
            ) : (
              <>
                {schedaAttiva === 'classifica' && <TabellaClassifica classifica={classifica} apriPilota={apriDettagliPilota} />}
                {schedaAttiva === 'calendario' && <CalendarioGare calendario={calendario} apriDettagliGara={apriDettagliGara} />}
              </>
            )}
          </div>
        </div>
        <ModalePilota 
            aperto={modalePilotaAperto} 
            setAperto={setModalePilotaAperto} 
            pilota={pilotaSelezionato} 
            loading={loadingPilota} 
        />
        <ModaleRisultati 
          modaleAperto={modaleAperto} setModaleAperto={setModaleAperto}
          garaSelezionata={garaSelezionata} risultatiGara={risultatiGara} loadingModale={loadingModale}
        />
      </div>
    </div>
  )
}

export default App