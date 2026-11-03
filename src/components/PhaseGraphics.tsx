import type { CyclePhase } from '../types';

/* ---------- Fertility wheel ---------- */

function polar(cx: number, cy: number, r: number, deg: number) {
  const a = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function arcPath(cx: number, cy: number, r: number, start: number, end: number) {
  const s = polar(cx, cy, r, start);
  const e = polar(cx, cy, r, end);
  const large = end - start > 180 ? 1 : 0;
  return `M ${s.x.toFixed(2)} ${s.y.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${e.x.toFixed(2)} ${e.y.toFixed(2)}`;
}

interface FertileWheelProps {
  /** Average cycle length in days */
  cycleLength: number;
  title: string;
  subtitle: string;
}

/**
 * A ring for the whole cycle (day 1 at the top, clockwise) that only marks
 * the fertile window in lime and the estimated ovulation day in green.
 */
export function FertileWheel({ cycleLength, title, subtitle }: FertileWheelProps) {
  const L = Math.max(18, Math.min(50, Math.round(cycleLength)));
  const perDay = 360 / L;
  const ovulationOffset = L - 14; // same estimate as the calendar
  const fertileStart = (ovulationOffset - 4) * perDay;
  const fertileEnd = (ovulationOffset + 3) * perDay;
  const ovStart = ovulationOffset * perDay;
  const ovEnd = (ovulationOffset + 1) * perDay;

  return (
    <svg className="cycle-wheel" viewBox="0 0 200 200" aria-hidden="true">
      <circle cx="100" cy="100" r="78" className="wheel-track" />
      <path d={arcPath(100, 100, 78, fertileStart, fertileEnd)} className="wheel-fertile" />
      <path d={arcPath(100, 100, 78, ovStart + 1, ovEnd - 1)} className="wheel-ovulation" />
      <text x="100" y="96" className="wheel-title">{title}</text>
      <text x="100" y="118" className="wheel-sub">{subtitle}</text>
    </svg>
  );
}

/* ---------- Phase illustrations ---------- */

function drop(x: number, y: number, s: number) {
  return `M ${x} ${y - s} C ${x + s * 0.95} ${y + s * 0.05}, ${x + s * 0.75} ${y + s}, ${x} ${y + s} C ${x - s * 0.75} ${y + s}, ${x - s * 0.95} ${y + s * 0.05}, ${x} ${y - s} Z`;
}

export function PhaseIllustration({ phase }: { phase: CyclePhase }) {
  return (
    <svg className={`phase-illustration ill-${phase}`} viewBox="0 0 240 150" aria-hidden="true">
      {phase === 'menstrual' && (
        <>
          <circle cx="120" cy="75" r="62" className="f-cream" />
          <path d={drop(120, 74, 34)} className="f-pink" />
          <path d={drop(72, 46, 13)} className="f-wine" />
          <path d={drop(172, 104, 16)} className="f-wine" />
          <circle cx="110" cy="66" r="7" className="f-white" />
        </>
      )}

      {phase === 'follicular' && (
        <>
          <circle cx="120" cy="75" r="62" className="f-cream" />
          <circle cx="182" cy="34" r="14" className="f-sun" />
          <path d="M 120 128 C 120 105, 118 88, 120 66" className="s-green" />
          <ellipse cx="98" cy="78" rx="24" ry="11" transform="rotate(-30 98 78)" className="f-lime" />
          <ellipse cx="142" cy="62" rx="26" ry="12" transform="rotate(28 142 62)" className="f-green" />
          <ellipse cx="120" cy="132" rx="46" ry="8" className="f-green-soft" />
        </>
      )}

      {phase === 'ovulation' && (
        <>
          <circle cx="120" cy="75" r="62" className="f-green" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <ellipse
              key={deg}
              cx="120"
              cy="44"
              rx="13"
              ry="24"
              transform={`rotate(${deg} 120 75)`}
              className="f-lime"
            />
          ))}
          <circle cx="120" cy="75" r="20" className="f-sun" />
          <circle cx="114" cy="69" r="5" className="f-cream" />
        </>
      )}

      {phase === 'luteal' && (
        <>
          <circle cx="120" cy="75" r="62" className="f-wine" />
          <circle cx="116" cy="75" r="36" className="f-sun" />
          <circle cx="134" cy="64" r="32" className="f-wine" />
          <circle cx="160" cy="40" r="4" className="f-pink" />
          <circle cx="170" cy="96" r="3" className="f-cream" />
          <circle cx="82" cy="36" r="3" className="f-pink" />
          <circle cx="150" cy="116" r="2.5" className="f-sun" />
        </>
      )}

      {phase === 'premenstrual' && (
        <>
          <circle cx="120" cy="75" r="62" className="f-pink-soft" />
          <circle cx="96" cy="72" r="22" className="f-wine" />
          <circle cx="124" cy="60" r="28" className="f-wine" />
          <circle cx="152" cy="74" r="20" className="f-wine" />
          <rect x="88" y="70" width="70" height="24" rx="12" className="f-wine" />
          <path d={drop(100, 116, 7)} className="f-pink" />
          <path d={drop(124, 124, 7)} className="f-pink" />
          <path d={drop(148, 116, 7)} className="f-pink" />
          <path d="M 160 40 l 4 -10 l 4 10 l 10 4 l -10 4 l -4 10 l -4 -10 l -10 -4 Z" className="f-sun" />
        </>
      )}
    </svg>
  );
}

/* ---------- Section icons ---------- */

export type SectionIconName = 'feel' | 'food' | 'movement' | 'selfCare' | 'info';

export function SectionIcon({ name }: { name: SectionIconName }) {
  return (
    <span className={`section-icon icon-${name}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {name === 'feel' && (
          <>
            <path d="M12 3 l1.8 4.6 L18.5 9 l-4.7 1.6 L12 15 l-1.8 -4.4 L5.5 9 l4.7 -1.4 Z" />
            <path d="M18 15 l0.8 2 l2 0.8 l-2 0.8 L18 21 l-0.8 -2 l-2 -0.8 l2 -0.8 Z" />
          </>
        )}
        {name === 'food' && (
          <>
            <path d="M3 11 h18 a9 9 0 0 1 -18 0 Z" />
            <path d="M9 7 c0 -2 2 -2 2 -4" />
            <path d="M14 7 c0 -2 2 -2 2 -4" />
          </>
        )}
        {name === 'movement' && (
          <>
            <circle cx="14" cy="4.5" r="1.8" />
            <path d="M6 20 l3.5 -5 l3 2 l1.5 -6 l-4 1 l-2 3" />
            <path d="M14.5 11 l2.5 3 h3" />
          </>
        )}
        {name === 'selfCare' && (
          <path d="M12 20 s-7 -4.4 -7 -9.5 A4 4 0 0 1 12 8 a4 4 0 0 1 7 2.5 C19 15.6 12 20 12 20 Z" />
        )}
        {name === 'info' && (
          <>
            <circle cx="12" cy="12" r="9" />
            <line x1="12" y1="16" x2="12" y2="11.5" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </>
        )}
      </svg>
    </span>
  );
}
