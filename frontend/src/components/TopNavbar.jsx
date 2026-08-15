import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth";


export default function TopNavbar({ 
  onMenuClick, 
  searchPlaceholder = "Search fleet, booking...", 
  onSearchChange 
}) {


  const navigate = useNavigate();


  const user = JSON.parse(
    localStorage.getItem("user")
  );


  const handleLogout = async () => {

    try {

      await logout();

    } catch (error) {

      console.log(
        "Logout API error:",
        error
      );

    }


    // hapus data lokal
    localStorage.removeItem("token");
    localStorage.removeItem("user");


    // kembali ke login
    navigate("/login");

  };


  const getInitials = () => {

    if(!user?.name) return "U";


    return user.name
      .split(" ")
      .map(word => word[0])
      .join("")
      .substring(0,2)
      .toUpperCase();

  };


  return (

    <header className="top-navbar">


      <button 
        className="menu-button" 
        onClick={onMenuClick} 
        aria-label="Open navigation"
      >
        ☰
      </button>



      <div className="top-title">
        Fleet Overview 
        <span>/ Dashboard</span>
      </div>



      <div className="top-actions">


        <label className="search-box">

          <span>
            ⌕
          </span>


          <input 
            type="search" 
            placeholder={searchPlaceholder}
            onChange={
              (event) => 
              onSearchChange?.(
                event.target.value
              )
            }
          />

        </label>



        <button 
          className="circle-button" 
          aria-label="Notifications"
        >
          ♧
          <i />
        </button>



        <button 
          className="circle-button" 
          aria-label="Help"
        >
          ?
        </button>




        <div className="user-profile">


          <span>
            {getInitials()}
          </span>



          <div>

            <strong>
              {user?.name ?? "Guest User"}
            </strong>


            <small>
              {user?.role?.name ?? "Unknown Role"}
            </small>


          </div>



          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>


        </div>



      </div>


    </header>

  );

}