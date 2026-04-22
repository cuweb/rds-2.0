declare module '*.scss';
declare module '*.css';

declare module '*.scss?inline' {
  const content: string;
  export default content;
}
