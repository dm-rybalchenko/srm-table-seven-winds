import MenuIcon from './icons/MenuIcon';
import ShareIcon from './icons/ShareIcon';


function Header() {

  return (
    <header className="header">
      <nav className="header__nav">
        <a href="#" className="header__nav-item">
          <span>
            <MenuIcon />
          </span>
        </a>
        <a href="#" className="header__nav-item">
          <span>
            <ShareIcon />
          </span>
        </a>
        <a href="#" className="header__nav-item active">
          <span>Просмотр</span>
        </a>
        <a href="#" className="header__nav-item">
          Управление
        </a>
      </nav>
    </header>
  );
}

export { Header };
