import ReferralBanner from './ReferralBanner.jsx'
import FundusViewer from './FundusViewer.jsx'
import GradeGauge from './GradeGauge.jsx'
import ProbabilityReadout from './ProbabilityReadout.jsx'
import { gradcamSrc as toGradcamSrc } from '../lib/api.js'
import { isReferable } from '../lib/grades.js'

export default function ResultCard({ result, imageSrc }) {
  if (!result) return null

  const referable =
    typeof result.referable === 'boolean'
      ? result.referable
      : isReferable(result.grade)

  const heatmap = toGradcamSrc(result.gradcam_png_base64)

  return (
    <div className="animate-settle-in grid gap-5 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
      {/* LEFT — viewing stage */}
      <FundusViewer imageSrc={imageSrc} gradcamSrc={heatmap} />

      {/* RIGHT — readout panel */}
      <div className="order-first md:order-none flex flex-col self-start rounded-lg border border-exam-200 bg-exam-0 shadow-readout">
        <div className="flex items-center justify-between border-b border-exam-200 px-4 py-2.5">
          <h2 className="font-display font-600">Skrining natijasi</h2>
        </div>

        <div className="flex flex-col gap-4 p-4 sm:p-5">
          {/* Signature gauge */}
          <GradeGauge grade={result.grade} label={result.grade_label} />

          <ReferralBanner referable={referable} />

          <details className="border-t border-exam-200 pt-2">
            <summary className="cursor-pointer rounded py-3 text-sm font-600 text-instrument-deep">Darajalar bo‘yicha model ballari</summary>
            <ProbabilityReadout probabilities={result.probabilities} predicted={result.grade} />
          </details>
        </div>

        <div className="mt-auto border-t border-exam-200 px-4 py-2.5">
          <p className="text-[0.68rem] leading-relaxed text-ink-40">
            Triage tavsiyasi — tashxis emas. Yakuniy qaror oftalmologda.
          </p>
        </div>
      </div>
    </div>
  )
}
