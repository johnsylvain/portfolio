import { h } from '../lib';

export const Link = ({ to }, children) => {
  const handleClick = event => {
    event.preventDefault();
    window.history.pushState(undefined, undefined, to);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
};
