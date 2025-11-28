import {Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginScreen from '../pages/LoginScreen'
import RegisterScreen from '../pages/RegisterScreen';
import AiChat from '../pages/AiChat';
import DetailedPage from '../pages/DetailedPage';
import ProfilePage from '../pages/ProfilePage';
import CategoryPage from '../pages/CategoryPage';
import ForPeoplePage from '../pages/ForPeoplePage';
import AdminPage from '../pages/AdminPage';
import EmotionPage from '../pages/EmotionPage';
export  const AllRouters = ()=>{
    return(
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/content/:id" element={<DetailedPage />} />
            <Route path="/category/:cg" element={<CategoryPage />} />
            <Route path="/for/:fp" element={<ForPeoplePage />} />
            <Route path="/emotion/:emotion" element={<EmotionPage />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/aichat" element={<AiChat />} />
            <Route path="/admin" element={<AdminPage />} />
        </Routes>
    )
}