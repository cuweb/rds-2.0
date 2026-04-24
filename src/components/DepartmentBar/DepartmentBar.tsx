import { Button } from '../Button/Button';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';
import { useLinkContext } from '../LinkProvider/useLinkContext';
import type { FooterButton } from '../../data/FooterData';
import './styles.scss';

export interface DepartmentBarProps {
  deptName?: string;
  buildingName?: string;
  officeNumber?: string;
  phone?: string;
  email?: string;
  buttons?: FooterButton[];
}

export const DepartmentBar = ({
  deptName,
  buildingName,
  officeNumber,
  phone,
  email,
  buttons,
}: DepartmentBarProps) => {
  const LinkComponent = useLinkContext();

  return (
    <aside className="cu-department-bar">
      <div className="cu-department-bar__inner">
        <div className="cu-department-bar__info">
          {deptName && <h2 className="cu-department-bar__name">{deptName}</h2>}
          <ul className="cu-department-bar__meta">
            {buildingName && (
              <li className="cu-department-bar__meta-item">
                {officeNumber && `${officeNumber} `}
                {buildingName}
              </li>
            )}
            {phone && <li className="cu-department-bar__meta-item">{phone}</li>}
            {email && (
              <li className="cu-department-bar__meta-item">
                {/* eslint-disable-next-line react-hooks/static-components -- LinkComponent is injected via context, stable across renders */}
                <LinkComponent href={`mailto:${email}`} className="cu-department-bar__email">
                  {email}
                </LinkComponent>
              </li>
            )}
          </ul>
        </div>
        {buttons && buttons.length > 0 && (
          <div className="cu-department-bar__actions">
            <ButtonGroup align="end">
              {buttons.map((button, index) => (
                <Button
                  key={button.id}
                  title={button.title}
                  color={index === 0 ? 'red' : 'dark-grey'}
                />
              ))}
            </ButtonGroup>
          </div>
        )}
      </div>
    </aside>
  );
};
