import { useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale/ru';
import { usePeriodStore } from '../stores/periodStore';
import { useI18n } from '../i18n/context';
import FluctuationSnippet from './FluctuationSnippet';
import CycleDynamicsChart from './CycleDynamicsChart';
import CycleHistory from './CycleHistory';

interface Props {
  onClose: () => void;
  onOpenCalendar: () => void;
}

function average(values: number[]): number {
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}

export default function KeyInfo({ onClose, onOpenCalendar }: Props) {
  const cycles = usePeriodStore((s) => s.cycles);
  const prediction = usePeriodStore((s) => s.prediction);
  const { t, lang } = useI18n();

  const info = useMemo(() => {
    if (cycles.length === 0) return null;

    const durations = cycles.map((c) => c.periodDuration).filter((d) => d > 0);
    const cycleLengths = cycles
      .filter((c) => !c.estimated && c.cycleLength > 0)
      .map((c) => c.cycleLength);
    const last = cycles[cycles.length - 1];

    return {
      avgPeriod: durations.length ? average(durations) : null,
      lastPeriod: last.periodDuration,
      lastPeriodStart: last.startDate,
      shortestPeriod: durations.length ? Math.min(...durations) : null,
      longestPeriod: durations.length ? Math.max(...durations) : null,
      avgCycle: cycleLengths.length ? average(cycleLengths) : null,
      shortestCycle: cycleLengths.length ? Math.min(...cycleLengths) : null,
      longestCycle: cycleLengths.length ? Math.max(...cycleLengths) : null,
      count: cycles.length,
    };
  }, [cycles]);

  const formatDate = (iso: string) =>
    format(parseISO(iso), 'd MMMM yyyy', { locale: lang === 'ru' ? ru : undefined });

  const days = (n: number | null) => (n === null ? '—' : t('info.days', { days: n }));

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
        {!info ? (
          <div className="info-empty">{t('info.empty')}</div>
        ) : (
          <>
            <div className="settings-section">
              <div className="section-title">{t('info.period_section')}</div>
              <div className="info-hero">
                <div className="info-hero-value">{days(info.avgPeriod)}</div>
                <div className="info-hero-label">{t('info.avg_period')}</div>
              </div>
              <div className="info-grid">
                <div className="info-card">
                  <div className="info-card-value">{days(info.lastPeriod)}</div>
                  <div className="info-card-label">{t('info.last_period')}</div>
                </div>
                <div className="info-card">
                  <div className="info-card-value">{info.count}</div>
                  <div className="info-card-label">{t('info.logged')}</div>
                </div>
                <div className="info-card">
                  <div className="info-card-value">{days(info.shortestPeriod)}</div>
                  <div className="info-card-label">{t('info.shortest_period')}</div>
                </div>
                <div className="info-card">
                  <div className="info-card-value">{days(info.longestPeriod)}</div>
                  <div className="info-card-label">{t('info.longest_period')}</div>
                </div>
              </div>
            </div>

            <div className="settings-section">
              <div className="section-title">{t('info.cycle_section')}</div>
              <div className="info-grid">
                <div className="info-card">
                  <div className="info-card-value">{days(info.avgCycle)}</div>
                  <div className="info-card-label">{t('info.avg_cycle')}</div>
                </div>
                <div className="info-card">
                  <div className="info-card-value">
                    {info.shortestCycle === null ? '—' : `${info.shortestCycle}–${info.longestCycle}`}
                  </div>
                  <div className="info-card-label">{t('info.cycle_range')}</div>
                </div>
              </div>
            </div>

            <div className="settings-section">
              <div className="section-title">{t('info.dates_section')}</div>
              <div className="settings-row info-row">
                <span>{t('info.last_start')}</span>
                <span className="info-row-value">{formatDate(info.lastPeriodStart)}</span>
              </div>
              <div className="settings-row info-row">
                <span>{t('info.next_expected')}</span>
                <span className="info-row-value">
                  {prediction ? formatDate(prediction.predictedStart) : t('info.need_more')}
                </span>
              </div>
            </div>

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

            <div className="section-divider" />
            <div className="settings-disclaimer">{t('info.note')}</div>
          </>
        )}
      </div>
    </div>
  );
}
