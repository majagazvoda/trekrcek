import { useMemo, useState } from 'react';
import { usePeriodStore } from '../stores/periodStore';
import { PHASE_GUIDE, PHASE_ORDER } from '../data/phaseGuide';
import { CycleWheel, PhaseIllustration, SectionIcon } from './PhaseGraphics';
import type { CyclePhase } from '../types';

interface Props {
  initialPhase: CyclePhase | null;
  onClose: () => void;
}

type Ranges = Record<CyclePhase, string>;

function buildRanges(cycleLength: number, periodDays: number): Ranges {
  const ovulation = cycleLength - 14;
  const premenstrualStart = cycleLength - 3;
  return {
    menstrual: `Days 1–${periodDays}`,
    follicular: `Days ${periodDays + 1}–${ovulation - 1}`,
    ovulation: `Around day ${ovulation}`,
    luteal: `Days ${ovulation + 1}–${premenstrualStart - 1}`,
    premenstrual: `Days ${premenstrualStart}–${cycleLength}`,
  };
}

export default function PhaseGuide({ initialPhase, onClose }: Props) {
  const prediction = usePeriodStore((s) => s.prediction);
  const currentPhase = usePeriodStore((s) => s.phase?.phase ?? null);
  const [selected, setSelected] = useState<CyclePhase>(initialPhase ?? currentPhase ?? 'menstrual');

  const { ranges, personal } = useMemo(() => {
    if (prediction) {
      const length = Math.round(prediction.avgCycleLength);
      const period = Math.round(prediction.avgPeriodDuration);
      if (length >= 21 && length <= 45 && period >= 2 && length - 14 > period + 1) {
        return { ranges: buildRanges(length, period), personal: true };
      }
    }
    return { ranges: buildRanges(28, 5), personal: false };
  }, [prediction]);

  const guide = PHASE_GUIDE[selected];

  return (
    <div className="settings-screen">
      <div className="settings-header">
        <button onClick={onClose} className="settings-back">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </button>
        <h2>Phase guide</h2>
        <div className="settings-header-spacer" />
      </div>

      <div className="settings-content guide">
        <div className="guide-pills" role="tablist">
          {PHASE_ORDER.map((phase) => (
            <button
              key={phase}
              role="tab"
              aria-selected={phase === selected}
              className={`guide-pill pill-${phase}${phase === selected ? ' active' : ''}`}
              onClick={() => setSelected(phase)}
            >
              {PHASE_GUIDE[phase].short}
              {phase === currentPhase && <span className="guide-pill-dot" aria-label="current phase" />}
            </button>
          ))}
        </div>

        <CycleWheel selected={selected} current={currentPhase} onSelect={setSelected} />

        <div className={`guide-hero hero-${selected}`}>
          <PhaseIllustration phase={selected} />
          <div className="guide-hero-text">
            <div className="guide-days">
              {ranges[selected]}
              {personal ? ' of your cycle' : ' of a 28-day cycle'}
            </div>
            <h3 className="guide-name">{guide.name}</h3>
            <p className="guide-tagline">{guide.tagline}</p>
          </div>
        </div>

        <section className="guide-section">
          <p className="guide-intro">{guide.hormones}</p>
        </section>

        <section className="guide-section">
          <h4 className="guide-heading"><SectionIcon name="feel" />How you may feel</h4>
          <div className="guide-chips">
            {guide.feel.map((item) => (
              <span key={item} className={`guide-chip chip-${selected}`}>{item}</span>
            ))}
          </div>
        </section>

        <section className="guide-section">
          <h4 className="guide-heading"><SectionIcon name="food" />Food</h4>
          <ul className="guide-list">
            {guide.food.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section className="guide-section">
          <h4 className="guide-heading"><SectionIcon name="movement" />Movement</h4>
          <ul className="guide-list">
            {guide.movement.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section className="guide-section">
          <h4 className="guide-heading"><SectionIcon name="selfCare" />Self-care &amp; tips</h4>
          <ul className="guide-list">
            {guide.selfCare.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section className="guide-section">
          <div className="guide-note">
            <h4 className="guide-heading"><SectionIcon name="info" />Good to know</h4>
            <p>{guide.goodToKnow}</p>
          </div>
        </section>

        <p className="settings-disclaimer guide-disclaimer">
          This guide is general information, not medical advice. Every body and every cycle is different.
          If something feels wrong or painful, talk to a doctor.
        </p>
      </div>
    </div>
  );
}
