import { Status, type StatusProps } from '../Status/Status';

export type CardStatusProps = StatusProps;

/**
 * Thin Card-context wrapper around <Status>. Adds a wrapping div with
 * card-aware spacing so the indicator sits cleanly above sibling content
 * (typically a Card.Excerpt). When Status resolves to null, the wrapper
 * collapses via CSS `:empty`.
 */
export const CardStatus = (props: CardStatusProps) => (
  <div className="cu-card__status">
    <Status {...props} context="in-card" />
  </div>
);

CardStatus.displayName = 'Card.Status';
