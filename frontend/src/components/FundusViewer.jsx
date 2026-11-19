import { useState } from 'react'

export default function FundusViewer({ imageSrc, gradcamSrc }) {
  const [showMap, setShowMap] = useState(true)
  const mapped = Boolean(gradcamSrc && showMap)

  return (
    <section className="self-start overflow-hidden rounded-xl bg-shell-900 text-white shadow-stage" aria-label="Ko‘z tubi tasviri">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <h2 className="font-display font-600">Ko‘z tubi tasviri</h2>
        <span className="num text-xs text-slate-300">{mapped ? 'Grad-CAM' : 'Asl surat'}</span>
      </div>
      <div className="flex aspect-square items-center justify-center bg-black">
        <img
          src={mapped ? gradcamSrc : imageSrc}
          alt={mapped ? 'Grad-CAM diqqat xaritasi' : 'Fundus (ko‘z tubi) surati'}
          className="h-full w-full object-contain"
        />
      </div>
      {gradcamSrc && (
        <div className="px-4 pb-4 pt-1">
          <button
            type="button"
            role="switch"
            aria-checked={mapped}
            aria-label="Diqqat xaritasi"
            onClick={() => setShowMap(!showMap)}
            className="flex min-h-12 w-full items-center justify-between gap-3 rounded-md text-left text-sm font-600"
          >
            Diqqat xaritasi
            <span aria-hidden="true" className={'relative block h-6 w-11 shrink-0 rounded-full ' + (mapped ? 'bg-instrument-deep' : 'bg-slate-600')}>
              <span className={'absolute left-[3px] top-[3px] h-[18px] w-[18px] rounded-full bg-white transition-transform ' + (mapped ? 'translate-x-5' : '')} />
            </span>
          </button>
          {mapped && <div className="flex items-center gap-3 text-xs text-slate-300">
            <span>Past</span>
            <span aria-hidden="true" className="h-1.5 flex-1 rounded-full bg-[linear-gradient(to_right,#000080,blue,cyan,yellow,red,#800000)]" />
            <span>Yuqori</span>
          </div>}
        </div>
      )}
    </section>
  )
}
