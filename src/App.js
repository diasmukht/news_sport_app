// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./components/AuthContext";
import SharedLayout from "./components/SharedLayout";
import PostForm from "./components/PostForm";
import AuthForm from "./components/AuthForm";
import { ROUTES } from "./utils/const";

// Все страницы, которые должны быть в SharedLayout (включая главную, новости и т.д.)
import HomePage from "./components/HomePage";
import NewsDetail from "./components/NewsDetail";
import Categories from "./components/Categories";
import CategoryNews from "./components/CategoryNews";

// Защищённый маршрут — только для формы создания поста
const ProtectedPostForm = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to={ROUTES.LOGIN} replace />;
};

function AppContent() {
  return (
    <Routes>
      {/* Страницы авторизации — БЕЗ SharedLayout */}
      <Route path={ROUTES.LOGIN} element={<AuthForm mode="login" />} />
      <Route path={ROUTES.REGISTER} element={<AuthForm mode="register" />} />

      {/* Всё остальное — с хедером и футером */}
      <Route element={<SharedLayout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.NEWS_DETAIL} element={<NewsDetail />} />
        <Route path={ROUTES.CATEGORIES} element={<Categories />} />
        <Route path={ROUTES.CATEGORY_NEWS} element={<CategoryNews />} />

        {/* Только эта страница защищена */}
        <Route
          path={ROUTES.POST_FORM}
          element={
            <ProtectedPostForm>
              <PostForm />
            </ProtectedPostForm>
          }
        />
      </Route>

      {/* На любой неизвестный путь — домой */}
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}