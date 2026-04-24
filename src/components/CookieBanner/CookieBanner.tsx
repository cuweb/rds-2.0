import { useState } from 'react';
import { Button } from '../Button/Button';
import { useLinkContext } from '../LinkProvider/useLinkContext';
import { isCookieExpired, setCookie } from './cookies';
import './styles.scss';

export interface CookieBannerProps {
  cookieName?: string;
  message?: string;
  policyHref?: string;
  policyLabel?: string;
  buttonLabel?: string;
}

export const CookieBanner = ({
  cookieName = 'cookieConsent',
  message = 'This site uses cookies to offer you a better browsing experience. Find out more on',
  policyHref = 'https://carleton.ca/privacy/privacy-notices/website-privacy-notice/',
  policyLabel = 'how we use cookies and how you can change your settings.',
  buttonLabel = 'Ok, got it!',
}: CookieBannerProps) => {
  const LinkComponent = useLinkContext();
  const [isVisible, setIsVisible] = useState(() => isCookieExpired(cookieName));

  const handleAccept = () => {
    setCookie(cookieName);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cu-cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie notice">
      <div className="cu-cookie-banner__content">
        <p className="cu-cookie-banner__message">
          {message}{' '}
          {/* eslint-disable-next-line react-hooks/static-components -- LinkComponent is injected via context, stable across renders */}
          <LinkComponent href={policyHref} className="cu-cookie-banner__link">
            {policyLabel}
          </LinkComponent>
        </p>
        <div className="cu-cookie-banner__action">
          <Button onClick={handleAccept} title={buttonLabel} />
        </div>
      </div>
    </div>
  );
};
