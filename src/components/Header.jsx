import { useState, useEffect } from 'react'

function Header({ schedaAttiva, setSchedaAttiva, calendario, isDarkMode, setIsDarkMode }) {
  const [prossimaGara, setProssimaGara] = useState(null)
  const [tempoMancante, setTempoMancante] = useState({ giorni: '00', ore: '00', minuti: '00', secondi: '00' })
  const [isWeekendGara, setIsWeekendGara] = useState(false)
  const [mostraDettagli, setMostraDettagli] = useState(false)

  useEffect(() => {
    if (!calendario || calendario.length === 0) return;
    const garaFutura = calendario.find(g => g.stato !== 'FINISHED');
    setProssimaGara(garaFutura);
    if (!garaFutura) return;

    const interval = setInterval(() => {
      const adesso = new Date().getTime();
      
      const orarioCorrettoFP1 = new Date(garaFutura.data).getTime() - 37800000;
      
      const distanza = orarioCorrettoFP1 - adesso;

      if (distanza < 0) {
        setIsWeekendGara(true);
        clearInterval(interval);
        return;
      }
      
      setIsWeekendGara(false);
      
      const formatNumber = (num) => String(num).padStart(2, '0');

      setTempoMancante({
        giorni: formatNumber(Math.floor(distanza / (1000 * 60 * 60 * 24))),
        ore: formatNumber(Math.floor((distanza % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
        minuti: formatNumber(Math.floor((distanza % (1000 * 60 * 60)) / (1000 * 60))),
        secondi: formatNumber(Math.floor((distanza % (1000 * 60)) / 1000))
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [calendario]);

  const circuitMapUrl = prossimaGara?.immagine_circuito || null;

  return (
    <div className="bg-zinc-100 dark:bg-zinc-900 border-b-4 border-red-600 dark:border-red-600 rounded-t p-6 shadow-lg relative overflow-hidden transition-colors duration-300">
      
      <button 
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="absolute top-6 right-6 z-20 bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-800 dark:hover:bg-zinc-700 p-2 rounded-full backdrop-blur-sm transition-all"
        title="Cambia Tema"
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>

      <h1 className="relative z-10 text-3xl font-black text-zinc-900 dark:text-white tracking-tighter italic text-center md:text-left pr-12 uppercase">
        MOTOGP<span className="text-red-600">HUB</span>
      </h1>

      {prossimaGara && (
        <div className="mt-6 relative bg-white dark:bg-zinc-950 rounded border border-zinc-300 dark:border-zinc-800 shadow-inner overflow-hidden transition-colors">
          
          {/* LO SFONDO DEL CIRCUITO */}
          <div className="absolute -right-5 top-1/2 -translate-y-1/2 h-56 w-56 opacity-10 dark:opacity-25 pointer-events-none select-none flex items-center justify-end">
             {circuitMapUrl && (
               <img 
                 src={circuitMapUrl} 
                 alt="Layout"
                 className="w-full h-full object-contain filter grayscale dark:invert"
                 onError={(e) => e.target.style.display = 'none'} 
               />
             )}
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-4 px-6">
            
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-red-600 dark:text-red-500 text-[10px] font-black uppercase tracking-[0.3em]">
                Next Race
              </p>
              <h2 className="text-zinc-900 dark:text-zinc-100 font-black text-xl uppercase mt-1 leading-tight">
                {prossimaGara.nome}
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 font-mono text-xs mt-1 uppercase tracking-wider">
                {prossimaGara.circuito}
              </p>
            </div>

            <div className="flex space-x-2 items-center">
              {isWeekendGara ? (
                <div className="bg-red-600 text-white px-4 py-2 rounded animate-pulse font-black uppercase tracking-widest text-sm">
                  È il Weekend di Gara! 🏁
                </div>
              ) : (
                <>
                  <div className="flex flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-900 rounded p-2 w-12 md:w-14 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <span className="text-base md:text-lg font-black font-mono text-zinc-800 dark:text-zinc-200">{tempoMancante.giorni}</span>
                    <span className="text-[9px] uppercase tracking-wider text-zinc-500">Days</span>
                  </div>
                  <span className="text-zinc-400 font-bold">:</span>
                  <div className="flex flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-900 rounded p-2 w-12 md:w-14 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <span className="text-base md:text-lg font-black font-mono text-zinc-800 dark:text-zinc-200">{tempoMancante.ore}</span>
                    <span className="text-[9px] uppercase tracking-wider text-zinc-500">Hrs</span>
                  </div>
                  <span className="text-zinc-400 font-bold">:</span>
                  <div className="flex flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-900 rounded p-2 w-12 md:w-14 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <span className="text-base md:text-lg font-black font-mono text-zinc-800 dark:text-zinc-200">{tempoMancante.minuti}</span>
                    <span className="text-[9px] uppercase tracking-wider text-zinc-500">Min</span>
                  </div>
                  <span className="text-zinc-400 font-bold">:</span>
                  <div className="flex flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-900 rounded p-2 w-12 md:w-14 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <span className="text-base md:text-lg font-black font-mono text-zinc-800 dark:text-zinc-200">{tempoMancante.secondi}</span>
                    <span className="text-[9px] uppercase tracking-wider text-zinc-500">Sec</span>
                  </div>
                </>
              )}
            </div>
            {/* SEZIONE DETTAGLI PISTA */}
            <div className="mt-4 border-t border-zinc-200 dark:border-zinc-800 pt-3">
              <button 
                onClick={() => setMostraDettagli(!mostraDettagli)}
                className="text-[10px] md:text-xs font-black uppercase tracking-widest text-red-600 dark:text-red-500 hover:text-red-700 transition-colors flex items-center"
              >
                {mostraDettagli ? '- Nascondi Dettagli' : '+ Info Pista'}
              </button>

              {mostraDettagli && prossimaGara.dettagli && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-zinc-100 dark:bg-zinc-900 p-2 rounded text-center border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <p className="text-[9px] text-zinc-500 uppercase tracking-widest">Lunghezza</p>
                    <p className="font-mono font-bold text-zinc-800 dark:text-zinc-200 text-sm mt-1">{prossimaGara.dettagli.lunghezza} <span className="text-[10px]">km</span></p>
                  </div>
                  <div className="bg-zinc-100 dark:bg-zinc-900 p-2 rounded text-center border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <p className="text-[9px] text-zinc-500 uppercase tracking-widest">Rettilineo</p>
                    <p className="font-mono font-bold text-zinc-800 dark:text-zinc-200 text-sm mt-1">{prossimaGara.dettagli.rettilineo} <span className="text-[10px]">m</span></p>
                  </div>
                  <div className="bg-zinc-100 dark:bg-zinc-900 p-2 rounded text-center border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <p className="text-[9px] text-zinc-500 uppercase tracking-widest">Curve SX</p>
                    <p className="font-mono font-black text-red-600 dark:text-red-500 text-sm mt-1">{prossimaGara.dettagli.curve_sx}</p>
                  </div>
                  <div className="bg-zinc-100 dark:bg-zinc-900 p-2 rounded text-center border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <p className="text-[9px] text-zinc-500 uppercase tracking-widest">Curve DX</p>
                    <p className="font-mono font-black text-red-600 dark:text-red-500 text-sm mt-1">{prossimaGara.dettagli.curve_dx}</p>
                  </div>
                  
                  {prossimaGara.dettagli.descrizione && (
                    <div className="col-span-2 md:col-span-4 bg-zinc-100 dark:bg-zinc-900 p-4 rounded border border-zinc-200 dark:border-zinc-800 shadow-inner mt-1 max-h-32 overflow-y-auto">
                      <p className="text-xs leading-relaxed italic text-zinc-600 dark:text-zinc-400">
                        "{prossimaGara.dettagli.descrizione}"
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-6 flex justify-center md:justify-start space-x-3 relative z-10">
        <button 
          onClick={() => setSchedaAttiva('classifica')} 
          className={`px-6 py-2 rounded font-bold uppercase text-sm tracking-wider transition-all ${
            schedaAttiva === 'classifica' 
              ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]' 
              : 'bg-zinc-300 text-zinc-600 hover:bg-zinc-400 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700'
          }`}
        >
          Piloti
        </button>
        <button 
          onClick={() => setSchedaAttiva('calendario')} 
          className={`px-6 py-2 rounded font-bold uppercase text-sm tracking-wider transition-all ${
            schedaAttiva === 'calendario' 
              ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]' 
              : 'bg-zinc-300 text-zinc-600 hover:bg-zinc-400 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700'
          }`}
        >
          Gare
        </button>
      </div>
    </div>
  )
}

export default Header