import { BrowserRouter, Route, Routes } from 'react-router';
import { MainLayout, ProtectedLayout } from './layouts/index.js';
import {
  HomePage,
  LogInPage,
  SignUpPage,
  EventDetailsPage,
  CreateEventPage,
} from './pages/index';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='login' element={<LogInPage />} />
        <Route path='sign-up' element={<SignUpPage />} />
        <Route path='events/:id' element={<EventDetailsPage />} />
        {/* Protected Routes */}

        <Route
          path='events/new'
          element={
            <ProtectedLayout>
              <CreateEventPage />
            </ProtectedLayout>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
