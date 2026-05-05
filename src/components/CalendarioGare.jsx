function CalendarioGare({ calendario, apriDettagliGara }) {
  return (
    <div className="p-4 grid gap-4 md:grid-cols-2 bg-zinc-50 dark:bg-zinc-900 transition-colors">
      {calendario.map((gara) => (
        <div 
          key={gara.id} 
          onClick={() => apriDettagliGara(gara)}
          className={`border rounded p-4 transition-all duration-300 ${
            gara.stato === 'FINISHED' 
              ? 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 cursor-pointer hover:border-red-600 dark:hover:border-red-600 hover:shadow-[0_0_15px_rgba(220,38,38,0.15)]' 
              : 'border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950/50 opacity-60'
          }`}
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 leading-tight uppercase tracking-wide">{gara.nome}</h3>
            {gara.stato === 'FINISHED' ? (
              <span className="text-[10px] font-black bg-red-100 dark:bg-red-600/10 text-red-600 dark:text-red-500 border border-red-200 dark:border-red-600/30 px-2 py-1 rounded uppercase tracking-wider transition-colors">
                Risultati
              </span>
            ) : (
              <span className="text-[10px] font-bold bg-zinc-200 dark:bg-zinc-800 text-zinc-500 px-2 py-1 rounded uppercase tracking-wider transition-colors">
                Standby
              </span>
            )}
          </div>
          <p className="text-xs font-mono text-zinc-500 uppercase">📍 {gara.circuito}</p>
        </div>
      ))}
    </div>
  )
}

export default CalendarioGare