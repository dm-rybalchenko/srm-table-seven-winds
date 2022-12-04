import { Header, Aside, Main, Table, wraps } from './components';


function App() {
  return (
    <>
      <wraps.Wrapper>
        <Header />
        <wraps.Container>
          <Aside />
          <Main>
            <Table />
          </Main>
        </wraps.Container>
      </wraps.Wrapper>
    </>
  );
}

export default App;
