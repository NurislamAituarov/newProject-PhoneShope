import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './App.scss';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const Header = lazy(() => import('../header/Header'));
const Main = lazy(() => import('../main/Main'));
const BuyPhone = lazy(() => import('../buyPhone/BuyPhone'));
const PhoneInfo = lazy(() => import('../phone-info/PhoneInfo'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<h1>Loading...</h1>}>
        <ErrorBoundary>
          <Header />
        </ErrorBoundary>

        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/BuyPhone" element={<BuyPhone />} />
            <Route path="/PhoneInfo/:phoneId" element={<PhoneInfo />} />
          </Routes>
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}

export default App;
