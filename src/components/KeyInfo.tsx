import { useI18n } from '../i18n/context';
import FluctuationSnippet from './FluctuationSnippet';
import CycleDynamicsChart from './CycleDynamicsChart';
import CycleHistory from './CycleHistory';

interface Props {
  onClose: () => void;
  onOpenCalendar: () => void;
}

export default function KeyInfo({ onClose, onOpenCalendar }: Props) {
  const { t } = useI18n();

  return (
    <div className="settings-screen">
      <div className="settings-header">
        <button onClick={onClose} className="settings-back">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          {t('settings.back')}
        </button>
        <h2>{t('info.title')}</h2>
        <div className="settings-header-spacer" />
      </div>

      <div className="settings-content">
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
    </div>
  );
}
