function ModaleRisultati({ modaleAperto, setModaleAperto, garaSelezionata, risultatiGara, loadingModale }) {
  if (!modaleAperto) return null;

  return (
    <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn transition-colors duration-300">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded shadow-2xl dark:shadow-[0_0_30px_rgba(0,0,0,0.8)] w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] transition-colors duration-300">
        
        <div className="bg-zinc-100 dark:bg-zinc-950 border-b border-zinc-300 dark:border-zinc-800 p-5 flex justify-between items-center text-zinc-900 dark:text-white transition-colors duration-300">
          <div>
            <p className="text-red-600 text-xs font-black uppercase tracking-widest mb-1">TELEMETRIA GARA</p>
            <h2 className="text-xl font-bold uppercase">{garaSelezionata?.nome}</h2>
          </div>
          <button 
            onClick={() => setModaleAperto(false)}
            className="text-zinc-400 dark:text-zinc-500 hover:text-red-600 dark:hover:text-red-500 text-3xl leading-none font-light transition-colors"
          >
            &times;
          </button>
        </div>

        <div className="p-0 overflow-y-auto bg-white dark:bg-zinc-900 transition-colors duration-300">
          {loadingModale ? (
            <div className="p-10 text-center text-zinc-500 font-mono text-sm uppercase tracking-widest animate-pulse">
              `&gt;` SCARICAMENTO DATI UFFICIALI...
            </div>
          ) : risultatiGara.length === 0 ? (
            <div className="p-10 text-center text-zinc-500 font-mono uppercase">
              Nessun dato disponibile.
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-950 text-xs uppercase tracking-widest text-zinc-500 sticky top-0 shadow-sm dark:shadow-none transition-colors">
                  <th className="p-3 text-center border-b border-zinc-200 dark:border-zinc-800">Pos</th>
                  <th className="p-3 border-b border-zinc-200 dark:border-zinc-800">Pilota</th>
                  <th className="p-3 border-b border-zinc-200 dark:border-zinc-800">Gap</th>
                  <th className="p-3 text-center border-b border-zinc-200 dark:border-zinc-800">Pts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
                {risultatiGara.map((pilota, i) => (
                  <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 text-sm transition-colors">
                    <td className="p-3 text-center font-black text-zinc-400 dark:text-zinc-500">{pilota.pos}</td>
                    <td className="p-3 font-bold text-zinc-900 dark:text-zinc-200 uppercase">{pilota.nome}</td>
                    <td className="p-3 text-zinc-500 font-mono text-xs">{pilota.tempo}</td>
                    <td className="p-3 text-center text-red-600 dark:text-red-500 font-mono font-bold">+{pilota.punti}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

export default ModaleRisultati