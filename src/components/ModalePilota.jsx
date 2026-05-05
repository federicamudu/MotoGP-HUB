function ModalePilota({ aperto, setAperto, pilota, loading }) {
  if (!aperto) return null;

  return (
    <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn transition-colors duration-300">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded shadow-2xl w-full max-w-md overflow-hidden flex flex-col transition-colors duration-300">
        
        <div className="bg-zinc-900 dark:bg-zinc-950 p-6 text-white relative flex items-center space-x-4">
            {/* Foto Pilota */}
            {pilota?.foto && (
                <div className="w-20 h-20 rounded-full border-2 border-red-600 bg-zinc-800 shadow-lg overflow-hidden shrink-0 flex items-start justify-center">
                    <img 
                        src={pilota.foto} 
                        alt={pilota.nome} 
                        className="w-full h-full object-cover object-top scale-150 origin-top mt-1" 
                    />
                </div>
            )}
            <div className="flex-1">
                <p className="text-red-600 text-3xl font-black italic">#{pilota?.numero}</p>
                <h2 className="text-xl font-black uppercase tracking-tighter">{pilota?.nome}</h2>
            </div>
            <button onClick={() => setAperto(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-red-500 text-3xl leading-none font-light">&times;</button>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="py-10 text-center font-mono text-zinc-500 animate-pulse uppercase tracking-widest text-xs">`&gt;` ACCESSO DATABASE...</div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="border-l-2 border-zinc-200 dark:border-zinc-800 pl-3">
                    <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest">Team</p>
                    <p className="font-bold dark:text-zinc-200 uppercase text-sm">{pilota?.team}</p>
                </div>
                <div className="border-l-2 border-zinc-200 dark:border-zinc-800 pl-3">
                    <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest">Nazione</p>
                    <p className="font-bold dark:text-zinc-200 uppercase text-sm">{pilota?.nazione}</p>
                </div>
                <div className="border-l-2 border-zinc-200 dark:border-zinc-800 pl-3">
                    <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest">Nato il</p>
                    <p className="font-bold dark:text-zinc-200 uppercase text-sm">{pilota?.nascita}</p>
                </div>
                <div className="border-l-2 border-zinc-200 dark:border-zinc-800 pl-3">
                    <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest">Città</p>
                    <p className="font-bold dark:text-zinc-200 uppercase text-sm">{pilota?.citta}</p>
                </div>
              </div>
              <p className="text-[10px] font-mono text-zinc-400 text-center pt-4 uppercase tracking-widest">Status: {pilota?.ruolo}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ModalePilota