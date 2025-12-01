// src/utils/routes.js
import HomePage from '../components/HomePage';
import NewsDetail from '../components/NewsDetail';
import Categories from '../components/Categories';
import CategoryNews from '../components/CategoryNews';
import PostForm from '../components/PostForm';
import AuthForm from '../components/AuthForm';



import { ROUTES } from './const';


export const publicRoutes = [
  { path: ROUTES.HOME, element: <HomePage /> },
  { path: ROUTES.NEWS_DETAIL, element: <NewsDetail /> },
  { path: ROUTES.CATEGORIES, element: <Categories /> },
  { path: ROUTES.CATEGORY_NEWS, element: <CategoryNews /> },
  { path: ROUTES.LOGIN, element: <AuthForm mode="login" /> },
  { path: ROUTES.REGISTER, element: <AuthForm mode="register" /> },
];


export const protectedRoutes = [
  { path: ROUTES.POST_FORM, element: <PostForm /> },
];