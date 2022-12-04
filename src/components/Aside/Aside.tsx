import { MENU_ITEMS } from './asideContent';


function Aside() {
  return (
    <aside className="aside">
      <div className="aside__header">
        <div className="aside__header-container">
          <p className="aside__header-title">Название проекта</p>
          <span className="aside__header-descr">Аббревиатура</span>
        </div>
      </div>
      <nav className="aside__nav">
        <ul className="aside__nav-items">
          {MENU_ITEMS.map((item) => (
            <li
              key={item}
              className={
                item === 'СМР' ? 'aside__nav-item active' : 'aside__nav-item'
              }
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export { Aside };
