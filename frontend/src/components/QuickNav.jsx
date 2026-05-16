import { ArrowLeft, Globe2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function QuickNav() {
  const navigate = useNavigate()

  return (
    <div className="fixed left-4 top-4 z-50 flex gap-2">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="grid size-11 place-items-center rounded-2xl border border-white/10 bg-slate-950/70 text-slate-200 shadow-2xl backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/10"
        aria-label="Go back"
        title="Go back"
      >
        <ArrowLeft size={19} />
      </button>
      <button
        type="button"
        onClick={() => navigate('/')}
        className="grid size-11 place-items-center rounded-2xl border border-white/10 bg-slate-950/70 text-sky-200 shadow-2xl backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/10"
        aria-label="Return to website"
        title="Return to website"
      >
        <Globe2 size={19} />
      </button>
    </div>
  )
}
