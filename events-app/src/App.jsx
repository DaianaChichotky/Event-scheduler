import { BrowserRouter, Route, Routes } from 'react-router';
import { MainLayout, ProtectedLayout } from './layouts/index.js';
import {
  HomePage,
  LogInPage,
  RegisterPage,
  EventDetailsPage,
  CreateEventPage,
} from './pages/index';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='login' element={<LogInPage />} />
        <Route path='register' element={<RegisterPage />} />
        <Route path='events/:id' element={<EventDetailsPage />} />
        {/* Protected Routes */}
        <Route element={<ProtectedLayout />}>
          <Route path='events/new' element={<CreateEventPage />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
