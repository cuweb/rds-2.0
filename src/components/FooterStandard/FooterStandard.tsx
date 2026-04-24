/* eslint-disable react-hooks/static-components -- LinkComponent is injected via context, stable across renders */
import { Icon } from '../Icon/Icon';
import { useLinkContext } from '../LinkProvider/useLinkContext';
import { assets } from '../../config/assets';
import {
  defaultAcknowledgment,
  defaultFooterContact,
  defaultFooterSocial,
  footerLinksByType,
  type FooterContactInfo,
  type FooterSocialLink,
  type FooterType,
} from '../../data/FooterData';
import './styles.scss';

export interface FooterStandardProps {
  type?: FooterType;
  acknowledgment?: string;
  contact?: FooterContactInfo;
  social?: FooterSocialLink[];
  logoSrc?: string;
  logoAlt?: string;
  privacyHref?: string;
  accessibilityHref?: string;
  copyrightHref?: string;
}

export const FooterStandard = ({
  type = 'standard',
  acknowledgment = defaultAcknowledgment,
  contact = defaultFooterContact,
  social = defaultFooterSocial,
  logoSrc = assets.cuLogoColorVerticalOutlined,
  logoAlt = 'Logo of Carleton University',
  privacyHref = 'https://carleton.ca/privacy/privacy-notices/general-notice-of-collection-use-and-disclosure/',
  accessibilityHref = 'https://carleton.ca/accessibility/',
  copyrightHref = 'https://library.carleton.ca/copyright-carleton',
}: FooterStandardProps) => {
  const LinkComponent = useLinkContext();
  const columns = footerLinksByType[type];
  const year = new Date().getFullYear();

  return (
    <footer className={`cu-footer cu-footer--${type}`} aria-labelledby="cu-footer-heading">
      <h2 id="cu-footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="cu-footer__inner">
        <div className="cu-footer__acknowledgment">
          <p>{acknowledgment}</p>
        </div>

        <div className="cu-footer__columns">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="cu-footer__column">
              {column.map((group, groupIndex) => (
                <div key={groupIndex} className="cu-footer__column-group">
                  <h3 className="cu-footer__column-heading">{group.heading}</h3>
                  <ul className="cu-footer__column-list">
                    {group.links.map((link, linkIndex) => (
                      <li key={linkIndex} className="cu-footer__column-item">
                        <LinkComponent href={link.href} className="cu-footer__column-link">
                          {link.name}
                        </LinkComponent>
                      </li>
                    ))}
                  </ul>
                  {group.media &&
                    (group.media.href ? (
                      <LinkComponent
                        href={group.media.href}
                        className="cu-footer__column-media"
                        style={{ width: group.media.width }}
                      >
                        <img src={group.media.src} alt={group.media.alt} />
                      </LinkComponent>
                    ) : (
                      <img
                        className="cu-footer__column-media"
                        src={group.media.src}
                        alt={group.media.alt}
                        style={{ width: group.media.width }}
                      />
                    ))}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="cu-footer__contact">
          <p className="cu-footer__contact-lead">
            Contact us by{' '}
            {contact.phoneHref && (
              <LinkComponent href={contact.phoneHref} className="cu-footer__contact-link">
                phone
              </LinkComponent>
            )}
            {contact.phoneHref && contact.contactHref && ' or '}
            {contact.contactHref && (
              <LinkComponent href={contact.contactHref} className="cu-footer__contact-link">
                email
              </LinkComponent>
            )}
          </p>
          <p className="cu-footer__contact-address">{contact.address}</p>
          <ul className="cu-footer__social">
            {social.map((item) => (
              <li key={item.name} className="cu-footer__social-item">
                <LinkComponent href={item.href} className="cu-footer__social-link">
                  <span className="sr-only">{item.name}</span>
                  <Icon name={item.icon} size={24} />
                </LinkComponent>
              </li>
            ))}
          </ul>
        </div>

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
      </div>
    </footer>
  );
};
