import { ComponentProps } from 'react';
import { ComponentType } from 'react';
import { default as default_2 } from 'react';
import { FC } from 'react';
import { JSX as JSX_2 } from 'react/jsx-runtime';
import { ReactNode } from 'react';

export declare const Article: ({ children, content }: ArticleProps) => JSX_2.Element;

declare interface ArticleProps {
    children?: default_2.ReactNode;
    content?: string;
}

export declare const Aside: ({ children, isSticky, topSpace }: AsideProps) => JSX_2.Element;

declare interface AsideProps {
    children: default_2.ReactNode;
    isSticky?: boolean;
    topSpace?: number;
}

export declare const Badge: ({ text, href, rounded, color, ...rest }: BadgeProps) => JSX_2.Element;

export declare const BadgeGroup: ({ children, isAbsolute, top, right, bottom, left, }: BadgeGroupProps) => JSX_2.Element;

declare interface BadgeGroupProps {
    children: default_2.ReactNode;
    isAbsolute?: boolean;
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
}

declare interface BadgeProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    text: string;
    href?: string;
    rounded?: borderRadiusKeys;
    color?: 'grey' | 'white' | 'black80' | 'white80' | 'green' | 'red' | 'yellow' | 'blue' | 'purple' | 'teal';
}

declare const Body_2: ({ children, className }: BodyProps) => JSX_2.Element;
export { Body_2 as Body }

declare interface BodyProps {
    children: default_2.ReactNode;
    className?: string;
}

declare const borderRadiusClasses: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    full: string;
};

declare type borderRadiusKeys = keyof typeof borderRadiusClasses;

export declare const Column: {
    ({ children, cols }: ColumnProps): JSX_2.Element;
    displayName: string;
} & {
    Content: {
        ({ children, isFirst }: ColumnContentProps): JSX_2.Element;
        displayName: string;
    };
};

declare interface ColumnContentProps {
    children: default_2.ReactNode;
    isFirst?: boolean;
}

declare interface ColumnProps {
    children: default_2.ReactNode;
    cols?: gridColumnKeys;
}

declare const gridColumnClasses: {
    '1': string;
    '2': string;
    '3': string;
    '4': string;
    '1/3': string;
    '2/3': string;
};

declare type gridColumnKeys = keyof typeof gridColumnClasses;

declare type LinkComponent = ComponentType<ComponentProps<'a'>>;

export declare const LinkProvider: FC<LinkProviderProps>;

declare interface LinkProviderProps {
    component: LinkComponent;
    children: ReactNode;
}

export declare const Main: ({ children }: MainProps) => JSX_2.Element;

declare interface MainProps {
    children: default_2.ReactNode;
}

declare const maxWidthClasses: {
    aligncontent: string;
    alignwide: string;
    alignfull: string;
};

declare type maxWidthKeys = keyof typeof maxWidthClasses;

export declare const Section: ({ children, as, isGrey, maxWidth }: SectionProps) => JSX_2.Element;

declare interface SectionProps {
    children?: default_2.ReactNode;
    as?: 'section' | 'div';
    isGrey?: boolean;
    maxWidth?: maxWidthKeys;
}

export { }
