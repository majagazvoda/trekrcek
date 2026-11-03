import { useI18n } from '../i18n/context';
import FluctuationSnippet from './FluctuationSnippet';
import CycleDynamicsChart from './CycleDynamicsChart';
import CycleHistory from './CycleHistory';

interface Props {
  onOpenCalendar: () => void;
}

/** Statistics, cycle dynamics and cycle history, shown on the home screen. */
export default function KeyInfo({ onOpenCalendar }: Props) {
  const { t } = useI18n();

  return (
    <div className="key-info">
      <div className="section-divider" />
      <FluctuationSnippet />

      <div className="section-divider" />
      <CycleDynamicsChart />

      <div className="section-divider" />
      <button className="section-title-link" onClick={onOpenCalendar}>
        {t('home.cycle_history')}
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
      <CycleHistory />
    </div>
  );
}
