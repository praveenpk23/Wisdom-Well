// import { useState } from "react";

// export default function WisdomHeader() {
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

//   const toggleTheme = () => {
//     const newTheme = theme === "light" ? "dark" : "light";
//     localStorage.setItem("theme", newTheme);
//     setTheme(newTheme);
//     document.documentElement.setAttribute("data-theme", newTheme);
//   };

//   return (
//     <header className="sticky top-0 z-50 border-b bg-base-100/80 backdrop-blur-xl">
//       <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

//         {/* Logo */}
//         <div className="flex items-center gap-1">
//           <span className="text-3xl font-bold text-primary">Wisdom</span>
//           <span className="text-3xl font-light">Well</span>
//         </div>

//         {/* Desktop Menu */}
//         <nav className="hidden lg:flex">
//           <ul className="flex items-center gap-8 text-[17px] font-medium">
//             <li><a className="hover:text-primary transition">Home</a></li>
//             <li><a className="hover:text-primary transition">Articles</a></li>
//             <li><a className="hover:text-primary transition">Books</a></li>
//             <li><a className="hover:text-primary transition">About</a></li>
//           </ul>
//         </nav>

//         {/* Right side buttons */}
//         <div className="flex items-center gap-3">

//           {/* Theme Toggle */}
//           {/* <button
//             onClick={toggleTheme}
//             className="btn btn-ghost btn-circle"
//           >
//             {theme === "light" ? (
//               <svg xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 viewBox="0 0 24 24" fill="currentColor">
//                 <path d="M5.64 17l-.71.71a1 1 0 101.41 1.41l.71-.7A1 1 0 105.64 17zM12 6a1 1 0 100-2 1 1 0 000 2zm6.36 1.64l.71-.71a1 1 0 10-1.41-1.41l-.71.71a1 1 0 101.41 1.41zM18 12a1 1 0 102 0 1 1 0 00-2 0z" />
//               </svg>
//             ) : (
//               <svg xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 viewBox="0 0 24 24" fill="currentColor">
//                 <path d="M21.64 13a1 1 0 00-1.05-.14A8 8 0 1111.1 3.41a1 1 0 00-.14-1A1 1 0 009.68 2 10 10 0 1022 14.32z" />
//               </svg>
//             )}
//           </button> */}

//         <button
//             onClick={toggleTheme}
//             className="btn btn-circle btn-ghost border border-base-content/20 hover:border-base-content/40 transition"
//             >
//             {theme === "light" ? (
//                 // Moon Icon (for dark mode)
//                 <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 >
//                 <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M12 3c.132 0 .263 0 .393.01a9 9 0 108.596 8.596A7 7 0 0112 3z"
//                 />
//                 </svg>
//             ) : (
//                 // Sun Icon (for light mode)
//                 <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 >
//                 <circle cx="12" cy="12" r="4" />
//                 <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M12 2v2m6.364 1.636l-1.414 1.414M22 12h-2m-1.636 6.364l-1.414-1.414M12 22v-2M4.636 18.364l1.414-1.414M2 12h2m1.636-6.364l1.414 1.414"
//                 />
//                 </svg>
//             )}
//             </button>


//           {/* Mobile Menu Toggle */}
//           <div className="dropdown dropdown-end lg:hidden">
//             <label tabIndex={0} className="btn btn-ghost btn-circle">
//               <svg xmlns="http://www.w3.org/2000/svg"
//                 className="h-7 w-7"
//                 fill="none" viewBox="0 0 24 24"
//                 stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//                   d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </label>

//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content bg-base-100/95 backdrop-blur-xl rounded-lg shadow-lg mt-3 w-48 p-2"
//             >
//               <li><a className="text-lg">Home</a></li>
//               <li><a className="text-lg">Articles</a></li>
//               <li><a className="text-lg">Books</a></li>
//               <li><a className="text-lg">About</a></li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }



import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetUserProfileQuery, useLogoutMutation, userApiSlice } from "../Redux/UserApiSlice";
import { contentApiSlice } from "../Redux/contentApiSlice";
export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isLoading } = useGetUserProfileQuery();
  const [logout] = useLogoutMutation();

  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const logoutHandler = async () => {
    try {
      await logout();
      dispatch(userApiSlice.util.resetApiState());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-xl border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-1">
          <span className="text-3xl font-bold text-primary">Wisdom</span>
          <span className="text-3xl font-light">Well</span>
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden lg:flex items-center gap-6 text-lg font-medium">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <Link to="/profile" className="hover:text-primary transition">Profile</Link>
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3">

          {/* THEME BUTTON */}
          <button
            onClick={toggleTheme}
            className="btn btn-circle btn-ghost border border-base-content/20 hover:border-base-content/40 transition"
          >
            {theme === "light" ? (
              // Moon Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3c.132 0 .263 0 .393.01a9 9 0 108.596 8.596A7 7 0 0112 3z"
                />
              </svg>
            ) : (
              // Sun Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="4" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 2v2m6.364 1.636l-1.414 1.414M22 12h-2m-1.636 6.364l-1.414-1.414M12 22v-2M4.636 18.364l1.414-1.414M2 12h2m1.636-6.364l1.414 1.414"
                />
              </svg>
            )}
          </button>

          {/* USER DROPDOWN */}
          <div className="dropdown dropdown-end hidden lg:block">
            <label tabIndex={0} className="btn btn-circle btn-ghost border border-base-content/20">
              <span className="text-lg font-semibold">
                {data?.name ? data.name.slice(0, 1).toUpperCase() : "U"}
              </span>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100/95 backdrop-blur-xl rounded-box mt-3 w-48 shadow-md"
            >
              {data && (
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
              )}

              {data ? (
                <li>
                  <a onClick={logoutHandler}>Logout</a>
                </li>
              ) : (
                <li>
                  <Link to="/login">Login</Link>
                </li>
              )}
            </ul>
          </div>

          {/* MOBILE MENU */}
          <div className="dropdown dropdown-end lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100/95 backdrop-blur-xl rounded-lg mt-3 w-48 shadow-lg"
            >
              <li><Link to="/">Home</Link></li>

              {data && (
                <>
                  <li><Link to="/profile">Profile</Link></li>
                  <li><a onClick={logoutHandler}>Logout</a></li>
                </>
              )}

              {!data && (
                <li><Link to="/login">Login</Link></li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
