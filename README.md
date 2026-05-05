# 🏁 MotoGP HUB

**MotoGP HUB** è una dashboard interattiva e ultra-moderna dedicata al mondo del motomondiale. Il progetto offre un'esperienza utente fluida per consultare classifiche, calendari e risultati in tempo reale, con un design ispirato al mondo del racing.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## 🚀 Caratteristiche Principali

*   **Multi-Categoria:** Supporto completo per **MotoGP, Moto2 e Moto3**.
*   **Classifiche Dinamiche:** Visualizzazione per Piloti, Team e Costruttori con indicatori di colore dinamici per i brand (Ducati, KTM, Yamaha, ecc.).
*   **Countdown Real-Time:** Un sistema di cronometraggio nell'Header che calcola il tempo rimanente alla prossima gara (FP1).
*   **Dettagli Circuiti:** Schede tecniche dei circuiti con lunghezza, numero di curve (DX/SX) e planimetrie integrate nello sfondo.
*   **Dark Mode Nativa:** Interfaccia ottimizzata per la visione notturna con transizioni fluide.
*   **Telemetria Gare:** Modali dedicati per visualizzare i risultati ufficiali e i distacchi (Gap) di ogni GP concluso.
*   **Search Engine:** Filtro istantaneo per trovare rapidamente piloti o team in classifica.

---

## 🛠️ Stack Tecnologico

### Frontend
*   **React.js**: Gestione dello stato tramite `useState` e `useEffect`.
*   **Tailwind CSS**: Styling utility-first per un design "racing" reattivo e accattivante.
*   **Framer Motion / CSS Animations**: Effetti di fade-in e feedback visuali durante il caricamento.

### Backend (API)
*   **Python**: Il core logico che gestisce i dati.
*   **API Link**: [moto-gp-project.vercel.app](https://moto-gp-project.vercel.app/)
*   **Repository Backend**: [federicamudu/motoGP_project](https://github.com/federicamudu/motoGP_project)

---

## 📦 Struttura del Progetto
```text
src/
├── components/
│   ├── Header.jsx             # Header con Countdown e Info Pista
│   ├── TabellaClassifica.jsx  # Tabella piloti/team con filtri
│   ├── CalendarioGare.jsx     # Griglia dei GP stagionali
│   ├── ModalePilota.jsx       # Dettagli biometrici e foto pilota
│   └── ModaleRisultati.jsx    # Risultati ufficiali post-gara
├── App.jsx                    # Logica centrale e routing dei dati
└── main.jsx                   # Entry point
```

---

## 🔧 Installazione e Utilizzo

1.  **Clona il repository:**
    ```bash
    git clone [https://github.com/federicamudu/MotoGP-HUB.git](https://github.com/federicamudu/MotoGP-HUB.git)
    ```
2.  **Installa le dipendenze:**
    ```bash
    npm install
    ```
3.  **Avvia l'applicazione in locale:**
    ```bash
    npm run dev
    ```
4.  **Build per la produzione:**
    ```bash
    npm run build
    ```

---

## ⚓ API Endpoints utilizzati

L'app consuma i seguenti endpoint dal backend:
*   `GET /api/classifica/{categoria}`: Recupera la classifica piloti.
*   `GET /api/classifica_team/{categoria}`: Recupera la classifica team.
*   `GET /api/calendario`: Recupera la lista di tutti i GP.
*   `GET /api/risultati_gara/{id}`: Recupera l'ordine di arrivo di una gara specifica.
*   `GET /api/pilota/{nome}`: Recupera i dettagli specifici di un pilota.

---

## 📝 Note Tecniche
L'applicazione gestisce gli errori di caricamento delle immagini e delle API con stati di *loading* animati ("Scaldando i motori...", "Accesso Database..."), garantendo una UX coerente anche in caso di latenza.

---

## ⚠️ Disclaimer
Questo progetto è stato sviluppato **esclusivamente** a scopo didattico e dimostrativo.
Tutti i marchi, i nomi dei team, i nomi dei piloti e i loghi appartengono ai rispettivi proprietari (Dorna Sports SL). Questo sito non è affiliato, sponsorizzato o approvato dalla MotoGP™ o da alcuna delle organizzazioni collegate. I dati vengono forniti così come sono e potrebbero **non** essere aggiornati o accurati rispetto alle fonti ufficiali.

---

**Sviluppato con passione per il motorsport da Federica**