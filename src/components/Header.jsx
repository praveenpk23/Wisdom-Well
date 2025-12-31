// import { useState } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import {
//   useGetUserProfileQuery,
//   useLogoutMutation,
//   userApiSlice,
// } from "../Redux/UserApiSlice";

// const categoriesList = [
//   "Philosophy",
//   "Wisdom",
//   "Mental Health",
//   "Self-Improvement",
//   "Productivity",
//   "Stoicism",
//   "Life",
// ];

// const forPeopleList = [
//   "Entrepreneurs",
//   "Students",
//   "Thinkers",
//   "Leaders",
//   "Fitness People",
// ];

// export default function Header() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { data } = useGetUserProfileQuery();
//   const [logout] = useLogoutMutation();
//   const [selectedEmotion, setSelectedEmotion] = useState(null);

//   const [theme, setTheme] = useState("dark");

//   const toggleTheme = () => {
//     const newTheme = theme === "light" ? "dark" : "light";
//     setTheme(newTheme);
//     document.documentElement.setAttribute("data-theme", newTheme);
//   };

//   const logoutHandler = async () => {
//     try {
//       await logout();
//       dispatch(userApiSlice.util.resetApiState());
//       navigate("/login");
//     } catch (err) {
//       console.log(err);
//     }
//   };
// const emotionList = [
//   { emoji: "😊", name: "happy" },
//   { emoji: "😢", name: "sad" },
//   { emoji: "😡", name: "angry" },
//   { emoji: "😌", name: "calm" },
//   { emoji: "🔥", name: "motivated" },
//   { emoji: "💔", name: "heartbroken" },
//   { emoji: "🤔", name: "thoughtful" },
// ];

//   return (
//   <header className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-xl border-b border-base-300 dark:border-neutral-700 shadow-sm">
//     <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

//       {/* ✅ LOGO */}
//       <Link to="/" className="flex items-center gap-1 select-none">
//         <span className="text-3xl font-bold text-primary">Wisdom</span>
//         <span className="text-3xl font-light">Well</span>
//       </Link>
// {/* EMOTION DROPDOWN */}
// <div className="dropdown dropdown-hover">
//   <label tabIndex={0} className="hover:text-primary cursor-pointer">
//     Emotion
//   </label>

//   <ul
//     tabIndex={0}
//     className="dropdown-content menu p-3 shadow bg-base-100 rounded-xl w-40 border grid grid-cols-4 gap-2 text-xl"
//   >
//     {emotionList.map((item) => (
//       <li key={item.name} className="text-center">
//         <button
//           onClick={() => {
//             setSelectedEmotion(item);
//             navigate(`/emotion/${item.name}`);
//           }}
//           className="hover:scale-110 transition text-2xl"
//         >
//           {item.emoji}
//         </button>
//       </li>
//     ))}
//   </ul>
// </div>

//       {/* ✅ DESKTOP NAVBAR */}
//       <nav className="hidden lg:flex items-center gap-6 text-[16px] font-medium">

//         {/* ✅ ACTIVE LINK */}
//         <NavLink
//           to="/"
//           className={({ isActive }) =>
//             `transition hover:text-primary ${
//               isActive ? "text-primary font-semibold underline underline-offset-4" : ""
//             }`
//           }
//         >
//           Home
//         </NavLink>

//         {/* ✅ CATEGORIES DROPDOWN */}
//         <div className="dropdown dropdown-hover">
//           <label tabIndex={0} className="hover:text-primary cursor-pointer">
//             Categories
//           </label>
//           <ul
//             tabIndex={0}
//             className="dropdown-content menu p-3 shadow bg-base-100 rounded-xl w-52 border"
//           >
//             {categoriesList.map((cat) => (
//               <li key={cat}>
//                 <Link to={`/category/${cat}`} className="hover:text-primary">
//                   {cat}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* ✅ FOR PEOPLE DROPDOWN */}
//         <div className="dropdown dropdown-hover">
//           <label tabIndex={0} className="hover:text-primary cursor-pointer">
//             For
//           </label>
//           <ul
//             tabIndex={0}
//             className="dropdown-content menu p-3 shadow bg-base-100 rounded-xl w-52 border"
//           >
//             {forPeopleList.map((fp) => (
//               <li key={fp}>
//                 <Link to={`/for/${fp}`} className="hover:text-primary">
//                   {fp}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* ✅ PROFILE LINK */}
//         {data && (
//           <NavLink
//             to="/profile"
//             className={({ isActive }) =>
//               `transition hover:text-primary ${
//                 isActive ? "text-primary font-semibold underline underline-offset-4" : ""
//               }`
//             }
//           >
//             Profile
//           </NavLink>
//         )}
//       </nav>
// {selectedEmotion && (
//   <span className="text-2xl mr-2" title={selectedEmotion.name}>
//     {selectedEmotion.emoji}
//   </span>
// )}

//       {/* ✅ SEARCH BAR (DUMMY) */}
//       <div className="hidden lg:block flex-grow max-w-xs mx-4">
//         <input
//           type="text"
//           placeholder="Search..."
//           className="input input-bordered input-sm w-full"
//           disabled
//         />
//       </div>

//       {/* ✅ RIGHT ACTIONS */}
//       <div className="flex items-center gap-3">

//         {/* THEME BUTTON */}
//         <button
//           onClick={toggleTheme}
//           className="btn btn-circle btn-ghost border border-base-content/20 hover:border-base-content/40 transition"
//         >
//           {theme === "light" ? (
//             // Moon Icon
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M12 3c.132 0 .263 0 .393.01a9 9 0 108.596 8.596A7 7 0 0112 3z"
//               />
//             </svg>
//           ) : (
//             // Sun Icon
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <circle cx="12" cy="12" r="4" />
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M12 2v2m6.364 1.636l-1.414 1.414M22 12h-2m-1.636 6.364l-1.414-1.414M12 22v-2M4.636 18.364l1.414-1.414M2 12h2m1.636-6.364l1.414 1.414"
//               />
//             </svg>
//           )}
//         </button>

//         {/* ✅ USER DROPDOWN (DESKTOP) */}
//         <div className="dropdown dropdown-end hidden lg:block">
//           <label tabIndex={0} className="btn btn-circle btn-ghost border border-base-content/20">
//             <span className="text-lg font-semibold">
//               {data?.name ? data.name.charAt(0).toUpperCase() : "U"}
//             </span>
//           </label>

//           <ul
//             tabIndex={0}
//             className="menu menu-sm dropdown-content bg-base-100 rounded-xl mt-3 w-48 shadow-md border"
//           >
//             {data && (
//               <li>
//                 <Link to="/profile">Profile</Link>
//               </li>
//             )}

//             {data ? (
//               <li>
//                 <a onClick={logoutHandler}>Logout</a>
//               </li>
//             ) : (
//               <li>
//                 <Link to="/login">Login</Link>
//               </li>
//             )}
//           </ul>
//         </div>

//         {/* ✅ MOBILE MENU */}
//         <div className="dropdown dropdown-end lg:hidden">
//           <label tabIndex={0} className="btn btn-ghost btn-circle">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-7 w-7"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </label>

//           <ul
//             tabIndex={0}
//             className="menu menu-sm dropdown-content bg-base-100 rounded-xl mt-3 w-48 shadow-lg border"
//           >
//             <li><Link to="/">Home</Link></li>

//             {/* Mobile: Categories */}
//             <li>
//               <details>
//                 <summary>Categories</summary>
//                 <ul className="p-1">
//                   {categoriesList.map((cat) => (
//                     <li key={cat}><Link to={`/category/${cat}`}>{cat}</Link></li>
//                   ))}
//                 </ul>
//               </details>
//             </li>

//             {/* Mobile: For People */}
//             <li>
//               <details>
//                 <summary>For</summary>
//                 <ul className="p-1">
//                   {forPeopleList.map((fp) => (
//                     <li key={fp}><Link to={`/for/${fp}`}>{fp}</Link></li>
//                   ))}
//                 </ul>
//               </details>
//             </li>

//             {data ? (
//               <>
//                 <li><Link to="/profile">Profile</Link></li>
//                 <li><a onClick={logoutHandler}>Logout</a></li>
//               </>
//             ) : (
//               <li><Link to="/login">Login</Link></li>
//             )}
//           </ul>
//         </div>
//       </div>
//     </div>
//   </header>
// );

// }
// ////////////////////////////////////////////////////////////////////////
// import { useState } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// // import { SearchIcon } from "@heroicons/react/outline";
// import {
//   useGetUserProfileQuery,
//   useLogoutMutation,
//   userApiSlice,
// } from "../Redux/UserApiSlice";

// // Lists
// const categoriesList = [
//   "Philosophy",
//   "Wisdom",
//   "Mental Health",
//   "Self-Improvement",
//   "Productivity",
//   "Stoicism",
//   "Life",
// ];

// const forPeopleList = [
//   "Entrepreneurs",
//   "Students",
//   "Thinkers",
//   "Leaders",
//   "Fitness People",
// ];

// const emotionList = [
//   { emoji: "😊", name: "happy" },
//   { emoji: "😢", name: "sad" },
//   { emoji: "😡", name: "angry" },
//   { emoji: "😌", name: "calm" },
//   { emoji: "🔥", name: "motivated" },
//   { emoji: "💔", name: "heartbroken" },
//   { emoji: "🤔", name: "thoughtful" },
// ];

// export default function Header() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { data } = useGetUserProfileQuery();
//   const [logout] = useLogoutMutation();
//   const [selectedEmotion, setSelectedEmotion] = useState(null);
//   const [theme, setTheme] = useState("dark");

//   const toggleTheme = () => {
//     const newTheme = theme === "light" ? "dark" : "light";
//     setTheme(newTheme);
//     document.documentElement.setAttribute("data-theme", newTheme);
//   };

//   const logoutHandler = async () => {
//     try {
//       await logout();
//       dispatch(userApiSlice.util.resetApiState());
//       navigate("/login");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Reusable dropdown component
//   const Dropdown = ({ label, items, onClick, gridCols = 1 }) => (
//     <div className="dropdown dropdown-hover">
//       <label tabIndex={0} className="hover:text-primary cursor-pointer">
//         {label}
//       </label>
//       <ul
//         tabIndex={0}
//         className={`dropdown-content menu p-3 shadow bg-base-100 rounded-xl w-52 border ${
//           gridCols > 1 ? `grid grid-cols-${gridCols} gap-2 text-xl` : ""
//         }`}
//       >
//         {items.map((item) => (
//           <li key={item.name || item} className="text-center">
//             <button
//               onClick={() => onClick && onClick(item)}
//               className="hover:scale-105 transition text-base"
//             >
//               {item.emoji || item}
//             </button>
//             {!item.emoji && typeof item === "string" && (
//               <span className="ml-1">{item}</span>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );

//   return (
//     <header className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-xl border-b border-base-300 dark:border-neutral-700 shadow-sm">
//       <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
//         {/* Logo */}
//         <Link to="/" className="flex items-center gap-1 select-none">
//           <span className="text-3xl font-bold text-primary">Wisdom</span>
//           <span className="text-3xl font-light">Well</span>
//         </Link>

//         {/* Desktop Navbar */}
//         <nav className="hidden lg:flex items-center gap-6 text-[16px] font-medium">
//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               `transition hover:text-primary ${
//                 isActive
//                   ? "text-primary font-semibold underline underline-offset-4"
//                   : ""
//               }`
//             }
//           >
//             Home
//           </NavLink>

//           {/* Categories Dropdown */}
//           <Dropdown
//             label="Categories"
//             items={categoriesList}
//             onClick={(cat) => navigate(`/category/${cat}`)}
//           />

//           {/* For People Dropdown */}
//           <Dropdown
//             label="For"
//             items={forPeopleList}
//             onClick={(fp) => navigate(`/for/${fp}`)}
//           />

//           {/* Profile Link */}
//           {data && (
//             <NavLink
//               to="/profile"
//               className={({ isActive }) =>
//                 `transition hover:text-primary ${
//                   isActive
//                     ? "text-primary font-semibold underline underline-offset-4"
//                     : ""
//                 }`
//               }
//             >
//               Profile
//             </NavLink>
//           )}

//           {/* Search Bar */}
//         <div className="hidden lg:flex items-center flex-grow max-w-sm mx-4">
//           <button
//             onClick={() => navigate("/search")}
//             // className="p-2 rounded-md hover:bg-gray-200 transition"
//           >
//             Search
//             {/* <SearchIcon className="h-5 w-5 text-gray-600" /> */}
//           </button>
//         </div>
//           {/* Emotion Dropdown */}
//           <Dropdown
//             label="Emotion"
//             items={emotionList}
//             onClick={(em) => {
//               setSelectedEmotion(em);
//               navigate(`/emotion/${em.name}`);
//             }}
//             gridCols={4}
//           />
//           {/* Selected Emotion near profile */}
//           {selectedEmotion && (
//             <span className="text-2xl ml-2" title={selectedEmotion.name}>
//               {selectedEmotion.emoji}
//             </span>
//           )}
//         </nav>

//         {/* Theme Button */}
//         <button
//           onClick={toggleTheme}
//           className="btn btn-circle btn-ghost border border-base-content/20 hover:border-base-content/40 transition "
//         >
//           {theme === "light" ? (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M12 3c.132 0 .263 0 .393.01a9 9 0 108.596 8.596A7 7 0 0112 3z"
//               />
//             </svg>
//           ) : (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <circle cx="12" cy="12" r="4" />
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M12 2v2m6.364 1.636l-1.414 1.414M22 12h-2m-1.636 6.364l-1.414-1.414M12 22v-2M4.636 18.364l1.414-1.414M2 12h2m1.636-6.364l1.414 1.414"
//               />
//             </svg>
//           )}
//         </button>

//         {/* User Dropdown */}
//         <div className="dropdown dropdown-end hidden lg:block ">
//           <label
//             tabIndex={0}
//             className="btn btn-circle btn-ghost border border-base-content/20"
//           >
//             <span className="text-lg font-semibold">
//               {data?.name ? data.name.charAt(0).toUpperCase() : "U"}
//             </span>
//           </label>
//           <ul
//             tabIndex={0}
//             className="menu menu-sm dropdown-content bg-base-100 rounded-xl mt-3 w-48 shadow-md border"
//           >
//             {data && (
//               <li>
//                 <Link to="/profile">Profile</Link>
//               </li>
//             )}
//             {data ? (
//               <li>
//                 <a onClick={logoutHandler}>Logout</a>
//               </li>
//             ) : (
//               <li>
//                 <Link to="/login">Login</Link>
//               </li>
//             )}
//             <li>
//               <Link to="/resetpassword">Reset Password</Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </header>
//   );
// }

import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  useGetUserProfileQuery,
  useLogoutMutation,
  userApiSlice,
} from "../Redux/UserApiSlice";
import { Search } from "lucide-react";

const categoriesList = [
  "Philosophy",
  "Wisdom",
  "Mental Health",
  "Self-Improvement",
  "Productivity",
  "Stoicism",
  "Life",
];
const forPeopleList = [
  "Entrepreneurs",
  "Students",
  "Thinkers",
  "Leaders",
  "Fitness People",
];
const emotionList = [
  { emoji: "😊", name: "happy" },
  { emoji: "😢", name: "sad" },
  { emoji: "😡", name: "angry" },
  { emoji: "😌", name: "calm" },
  { emoji: "🔥", name: "motivated" },
  { emoji: "💔", name: "heartbroken" },
  { emoji: "🤔", name: "thoughtful" },
];

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useGetUserProfileQuery();
  const [logout] = useLogoutMutation();
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const themeOnLocal = localStorage.getItem("theme") ;
  const [theme, setTheme] = useState(themeOnLocal);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };
  useEffect(()=>{
    const themeOnLocal = localStorage.getItem("theme") || "dark";
    setTheme(themeOnLocal);
    document.documentElement.setAttribute("data-theme", themeOnLocal);
  })
  
  const logoutHandler = async () => {
    try {
      await logout();
      dispatch(userApiSlice.util.resetApiState());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  // Professional dropdown
  const Dropdown = ({ label, items, onClick }) => (
    <div className="dropdown dropdown-hover">
      <label tabIndex={0} className="cursor-pointer hover:text-primary">
        {label}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 border"
      >
        {items.map((item) => (
          <li key={item.name || item}>
            <button
              className="w-full text-left hover:bg-base-200 transition"
              onClick={() => onClick && onClick(item)}
            >
              {item.emoji || item.name || item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <header className="sticky top-0 z-50 bg-base-100/90 backdrop-blur-md border-b border-base-300 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 select-none">
          <span className="text-3xl font-bold text-primary">Wisdom</span>
          <span className="text-3xl font-light">Well</span>
        </Link>

        {/* ================= DESKTOP ================= */}
        <nav className="hidden lg:flex items-center gap-6 text-[16px] font-medium">
          <Dropdown
            label="Categories"
            items={categoriesList}
            onClick={(cat) => navigate(`/category/${cat}`)}
          />

          <Dropdown
            label="For People"
            items={forPeopleList}
            onClick={(fp) => navigate(`/for/${fp}`)}
          />

          <Dropdown
            label="Emotion"
            items={emotionList}
            grid
            onClick={(em) => {
              setSelectedEmotion(em);
              navigate(`/emotion/${em.name}`);
            }}
          />

          {selectedEmotion && (
            <span className="text-xl opacity-80">{selectedEmotion.emoji}</span>
          )}

          {/* Search */}
          <button
            onClick={() => navigate("/search")}
            className="btn btn-ghost btn-circle text-xl"
          >
            <Search />
          </button>

          {/* Theme */}
          <button
            onClick={toggleTheme}
            className="btn btn-circle btn-ghost border border-base-content/20"
          >
            {theme === "light" ? "🌞" : "🌙"}
          </button>

          {/* Profile */}
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-circle btn-ghost border border-base-content/20"
            >
              <span className="text-lg font-semibold">
                {data?.name ? data.name[0].toUpperCase() : "U"}
              </span>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 w-48 bg-base-100 rounded-xl shadow-md border"
            >
              {data && (
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
              )}
              {data ? (
                <li>
                  <button onClick={logoutHandler}>Logout</button>
                </li>
              ) : (
                <li>
                  <Link to="/login">Login</Link>
                </li>
              )}
              <li>
                <Link to="/resetpassword">Reset Password</Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* ================= MOBILE ACTIONS ================= */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="btn btn-circle btn-ghost border border-base-content/20"
          >
            {theme === "light" ? "🌞" : "🌙"}
          </button>
          <button
            onClick={() => navigate("/search")}
            className="btn btn-ghost btn-circle text-xl"
          >
            <Search />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-ghost btn-circle text-xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-5 py-4 border-t border-base-300 bg-base-100 space-y-4">
          {/* Categories → direct navigation */}
          <button
            className="w-full text-left py-2 text-base font-medium hover:text-primary"
            onClick={() => {
              navigate("/categories/Philosophy");
              setMobileMenuOpen(false);
            }}
          >
            Categories
          </button>

          {/* For People → direct navigation */}
          <button
            className="w-full text-left py-2 text-base font-medium hover:text-primary"
            onClick={() => {
              navigate("/for/Entrepreneurs");
              setMobileMenuOpen(false);
            }}
          >
            For People
          </button>

          {/* Emotion → ONLY dropdown on mobile
        <Dropdown
          label="Emotion"
          items={emotionList}
          grid
          onClick={(em) => {
            setSelectedEmotion(em);
            navigate(`/emotion/${em.name}`);
            setMobileMenuOpen(false);
          }}
        /> */}

          <div className="border-t pt-3 space-y-2">
            {data && (
              <NavLink
                to="/profile"
                className="block py-2 text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </NavLink>
            )}

            {data ? (
              <button
                onClick={logoutHandler}
                className="block py-2 w-full text-left text-error"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className="block py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
