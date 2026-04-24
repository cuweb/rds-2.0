/* eslint-disable react-hooks/static-components -- LinkComponent is injected via context, stable across renders */
import { useLinkContext } from '../LinkProvider/useLinkContext';
import { assets } from '../../config/assets';
import '../FooterStandard/styles.scss';

export interface FooterProps {
  logoSrc?: string;
  logoAlt?: string;
  privacyHref?: string;
  accessibilityHref?: string;
  copyrightHref?: string;
}

export const Footer = ({
  logoSrc = assets.cuLogoColorVerticalOutlined,
  logoAlt = 'Logo of Carleton University',
  privacyHref = 'https://carleton.ca/privacy/privacy-notices/general-notice-of-collection-use-and-disclosure/',
  accessibilityHref = 'https://carleton.ca/accessibility/',
  copyrightHref = 'https://library.carleton.ca/copyright-carleton',
}: FooterProps) => {
  const LinkComponent = useLinkContext();
  const year = new Date().getFullYear();

  return (
    <footer className="cu-footer cu-footer--basic" aria-labelledby="cu-footer-heading">
      <h2 id="cu-footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="cu-footer__logo-links">
        <img className="cu-footer__logo" src={logoSrc} alt={logoAlt} />
        <ul className="cu-footer__meta">
          <li className="cu-footer__meta-item">
            <LinkComponent href={privacyHref} className="cu-footer__meta-link">
              Privacy Policy
            </LinkComponent>
          </li>
          <li className="cu-footer__meta-item">
            <LinkComponent href={accessibilityHref} className="cu-footer__meta-link">
              Accessibility
            </LinkComponent>
          </li>
          <li className="cu-footer__meta-item">
            <LinkComponent href={copyrightHref} className="cu-footer__meta-link">
              &copy; Copyright {year}
            </LinkComponent>
          </li>
        </ul>
      </div>
    </footer>
  );
};
