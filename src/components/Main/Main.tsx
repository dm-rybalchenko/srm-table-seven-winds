function Main({ children }: { children: JSX.Element }) {
	
  return (
    <main className="main-content">
      <div className="main-content__header">
        <div className="main-content__title">Строительно-монтажные работы</div>
      </div>
      <div className="main-content__table">{children}</div>
    </main>
  );
}

export { Main };
