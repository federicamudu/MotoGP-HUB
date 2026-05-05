import { useState } from 'react'

function TabellaClassifica({ classifica, apriPilota }) {
  const [ricerca, setRicerca] = useState('')

  const classificaFiltrata = classifica.filter(pilota => 
    pilota.nome.toLowerCase().includes(ricerca.toLowerCase()) || 
    pilota.team.toLowerCase().includes(ricerca.toLowerCase())
  )

  const getMotoColor = (moto) => {
    const brand = moto?.toLowerCase() || ''
    if (brand.includes('ducati')) return 'bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.8)]'
    if (brand.includes('aprilia')) return 'bg-zinc-800 dark:bg-white shadow-[0_0_8px_rgba(0,0,0,0.5)] dark:shadow-[0_0_8px_rgba(255,255,255,0.8)]'
    if (brand.includes('ktm')) return 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]'
    if (brand.includes('yamaha')) return 'bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.8)]'
    if (brand.includes('honda')) return 'bg-orange-700 shadow-[0_0_8px_rgba(194,65,12,0.8)]'
    return 'bg-zinc-400 dark:bg-zinc-600'
  }

  return (
    <div>
      <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 transition-colors">
        <input 
          type="text" 
          placeholder="CERCA PILOTA O TEAM..." 
          value={ricerca}
          onChange={(e) => setRicerca(e.target.value)}
          className="w-full md:w-1/2 p-3 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600 focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none font-mono text-sm uppercase transition-shadow"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-950 border-b border-zinc-300 dark:border-zinc-800 text-xs uppercase tracking-widest text-zinc-500 transition-colors">
              <th className="p-4 font-bold text-center">Pos</th>
              <th className="p-4 font-bold">Pilota</th>
              <th className="p-4 font-bold">Team</th>
              <th className="p-4 font-bold text-center">Pts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/50">
            {classificaFiltrata.map((pilota, index) => (
              <tr key={index} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                <td className="p-4 text-center font-black text-zinc-500">{pilota.pos}</td>
                <td 
                  onClick={() => apriPilota(pilota)} 
                  className="p-4 font-bold text-zinc-900 dark:text-zinc-100 uppercase cursor-pointer hover:text-red-600 transition-colors"
                >
                  {pilota.nome}
                </td>
                <td className="p-4 flex items-center space-x-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${getMotoColor(pilota.moto || pilota.team)}`}></span>
                  <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase">{pilota.team}</span>
                </td>
                <td className="p-4 text-center">
                  <span className="bg-zinc-100 dark:bg-zinc-950 text-red-600 dark:text-red-500 border border-red-200 dark:border-red-900/30 py-1 px-3 rounded font-bold text-sm font-mono transition-colors">
                    {pilota.punti}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TabellaClassifica