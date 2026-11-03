import { parseISO, formatDistanceToNow } from 'date-fns';
import { usePeriodStore } from '../stores/periodStore';
import { useI18n } from '../i18n/context';

interface Props {
  dimmed?: boolean;
  onOpenGuide?: () => void;
}

function GuideLink({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button className="phase-guide-link" onClick={onClick}>
      {label}
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>
  );
}

export default function PhaseStatus({ dimmed, onOpenGuide }: Props) {
  const cycleDay = usePeriodStore((s) => s.cycleDay);
  const prediction = usePeriodStore((s) => s.prediction);
  const phase = usePeriodStore((s) => s.phase);
  const isEmpty = usePeriodStore((s) => s.periods.length === 0);
  const isSingle = usePeriodStore((s) => s.periods.length === 1);
  const { t } = useI18n();

  // Empty state — dimmed "No data"
  if (isEmpty) {
    return (
      <div className={`phase-status${dimmed ? ' dimmed' : ''}`}>
        <div className="phase-name">{t('status.no_data')}</div>
      </div>
    );
  }

  // Stale data: last period was way too long ago
  if (cycleDay?.stale) {
    const ago = formatDistanceToNow(parseISO(cycleDay.lastPeriodDate), { addSuffix: true, locale: undefined });
    return (
      <div className="phase-status">
        <div className="phase-name">{t('status.no_recent')}</div>
        <div className="phase-detail">{t('status.last_period_ago', { ago })}</div>
      </div>
    );
  }

  // Only 1 period — no predictions yet
  if (!prediction || isSingle) {
    return (
      <div className="phase-status">
        <div className="phase-detail">
          {cycleDay ? t('status.day', { day: cycleDay.day }) : ''}
        </div>
        <div className="phase-detail">{t('status.log_more')}</div>
        {onOpenGuide && <GuideLink onClick={onOpenGuide} label="Phase guide" />}
      </div>
    );
  }

  // Normal state with phase
  const phaseKey = phase ? `phase.${phase.phase}` : '';
  const phaseColorClass = phase ? phase.phase : '';

  // Build countdown text
  let countdownText = '';
  if (phase?.phase === 'menstrual') {
    // During period — special text, no countdown to next
    countdownText = t('status.during_period', { day: phase.dayInPhase });
  } else if (cycleDay?.daysUntilNext !== null && cycleDay?.daysUntilNext !== undefined) {
    if (cycleDay.daysUntilNext > 0) {
      countdownText = t('status.period_in', { days: cycleDay.daysUntilNext });
    } else if (cycleDay.daysUntilNext === 0) {
      countdownText = t('status.period_today');
    } else {
      const absDays = Math.abs(cycleDay.daysUntilNext);
      countdownText = t(absDays === 1 ? 'status.period_overdue_1' : 'status.period_overdue', { days: absDays });
    }
  }

  return (
    <div className="phase-status">
      {phase && (
        <div className={`phase-name ${phaseColorClass}`}>{t(phaseKey)}</div>
      )}
      <div className="phase-detail">
        {cycleDay && (
          <>
            <span>{t('status.day', { day: cycleDay.day })}</span>
            {countdownText && (
              <>
                <span className="separator"> · </span>
                <span>{countdownText}</span>
              </>
            )}
          </>
        )}
      </div>
      {onOpenGuide && (
        <GuideLink onClick={onOpenGuide} label={phase ? 'Read about this phase' : 'Phase guide'} />
      )}
    </div>
  );
}
