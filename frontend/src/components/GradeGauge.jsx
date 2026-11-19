import { GRADES, gradeInfo, gradeColor } from '../lib/grades.js'

export default function GradeGauge({ grade, label }) {
  return (
    <section aria-label="ICDR skrining darajasi">
      <p className="micro-label text-ink-55">ICDR darajasi</p>
      <div className="my-3 flex items-baseline gap-3">
        <span className="num text-4xl font-700 leading-none text-ink">{grade}<span className="text-base font-500 text-ink-55"> / 4</span></span>
        <h3 className="font-display text-xl font-600 leading-tight">{gradeInfo(grade)?.uz || label}</h3>
      </div>
      <ol className="grid grid-cols-5 gap-1" aria-label="ICDR shkalasi">
        {GRADES.map(item => (
          <li key={item.grade} aria-current={item.grade === grade ? 'step' : undefined}
            className={'num text-center text-xs ' + (item.grade === grade ? 'font-700 text-ink' : 'text-ink-55')}>
            <span className="mb-1 block h-2 rounded-sm" style={{backgroundColor: item.grade === grade ? gradeColor(grade) : '#dce3e7'}} />
            {item.grade}
          </li>
        ))}
      </ol>
    </section>
  )
}
