import React from 'react';
import { defaultStatusTypes, type StatusType, type StatusVariant } from './types';
import './styles.scss';

export type { StatusType, StatusVariant };
export { defaultStatusTypes };

export interface StatusProps {
  children?: React.ReactNode;
  variant?: StatusVariant;
  /**
   * Opt into the registry: when set, the component looks up a default label and
   * aria-prefix for the (type, variant) pair. Built-in types are `'hours'`,
   * `'availability'`, `'system'`. Consumers may pass other strings — they'll
   * resolve to no label unless a future Provider supplies a matching entry.
   */
  type?: StatusType | (string & {});
  /** Explicit text override. Used when no `children` are provided. Wins over the registry default. */
  label?: string;
  /**
   * @internal
   * Selects the context modifier class. `Card.Status` passes `'in-card'` so
   * the inner span gets `cu-status--in-card`; standalone use defaults to
   * `'standalone'` (`cu-status--standalone`). This lets each context have
   * fully independent styles without descendant-selector specificity battles.
   */
  context?: 'standalone' | 'in-card';
}

export const Status = ({
  children,
  variant = 'success',
  type,
  label,
  context = 'standalone',
}: StatusProps) => {
  const registryEntry = type ? defaultStatusTypes[type] : undefined;
  const registryLabel = registryEntry?.labels?.[variant];

  // Resolution: children > label prop > registry default > nothing.
  const resolvedText: React.ReactNode =
    children ?? label ?? registryLabel ?? undefined;

  // If a type was requested but nothing resolved, render nothing — the
  // registry says this (type, variant) combination has no signal to show.
  if (type !== undefined && resolvedText === undefined) {
    return null;
  }

  // Aria-label adds context only when a known type is in play.
  const ariaLabel =
    registryEntry && resolvedText !== undefined && typeof resolvedText !== 'object'
      ? `${registryEntry.ariaPrefix}: ${resolvedText}`
      : undefined;

  const className = `cu-status cu-status--${variant} cu-status--${context}`;

  return (
    <span className={className} aria-label={ariaLabel}>
      <span className="cu-status__dot" aria-hidden="true" />
      {resolvedText}
    </span>
  );
};

Status.displayName = 'Status';
