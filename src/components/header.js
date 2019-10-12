import { h } from '../lib/vdom';
import { Link } from './link';

export const Header = ({ title }) => (
  <div className="cli-header">
    <div className="cli-header__buttons">
      <Link to="/" />
      <Link to="/" />
      <Link to="/" />
    </div>
    <span className="cli-header__title">{title}</span>
  </div>
);
