import { NavLink } from "react-router-dom";


const menuItems = [

  {
    label: "Dashboard",
    icon: "▦",
    to: "/dashboard",
    roles: ["Admin", "Approver"]
  },


  {
    label: "Fleet",
    icon: "◇",
    to: "/fleet",
    roles: ["Admin"]
  },


  {
    label: "Booking Operations",
    icon: "▣",
    to: "/booking",
    roles: ["Admin", "Approver"]
  },


  {
    label: "Manage Booking",
    icon: "▤",
    to: "/booking/manage",
    roles: ["Admin", "Approver"]
  },


  {
    label: "Create Booking",
    icon: "+",
    to: "/booking/create",
    roles: ["Admin"]
  },


  {
    label: "Driver Management",
    icon: "♙",
    to: "/drivers",
    roles: ["Admin"]
  },


  {
    label: "Approval",
    icon: "✓",
    to: "/approval",
    badge: "12",
    roles: ["Approver"]
  },


  {
    label: "Analytics",
    icon: "◔",
    to: "/analytics",
    roles: ["Admin", "Approver"]
  },


  {
    label: "System",
    icon: "⊞",
    to: "/system/activity-log",
    roles: ["Admin"]
  },


];



export default function Sidebar({ open, onClose }) {


  const user = JSON.parse(
    localStorage.getItem("user")
  );


  const role = user?.role?.name;



  const filteredMenu = menuItems.filter(
    item =>
      item.roles.includes(role)
  );



  return (

    <>


      <button
        className={`sidebar-overlay ${open ? "is-visible" : ""}`}
        onClick={onClose}
        aria-label="Close navigation"
      />



      <aside
        className={`sidebar ${open ? "is-open" : ""}`}
      >



        <div className="sidebar-brand">


          <span className="brand-mark">
            F
          </span>



          <div>

            <strong>
              FleetDesk
            </strong>


            <small>
              Enterprise Control
            </small>

          </div>



          <button
            className="sidebar-close"
            onClick={onClose}
            aria-label="Close navigation"
          >

            ×

          </button>


        </div>





        <nav
          className="sidebar-nav"
          aria-label="Main navigation"
        >


          <p>
            Workspace
          </p>



          {
            filteredMenu.map(
              ({
                label,
                icon,
                to,
                badge
              }) => (


                <NavLink

                  key={label}

                  to={to}

                  className={({isActive}) =>
                    `nav-item ${isActive ? "active" : ""}`
                  }

                  onClick={onClose}

                >


                  <span>
                    {icon}
                  </span>


                  {label}



                  {
                    badge &&
                    <b>
                      {badge}
                    </b>
                  }


                </NavLink>


              )
            )
          }



        </nav>





        <nav
          className="sidebar-nav sidebar-bottom"
          aria-label="Account navigation"
        >



          <button
            className="nav-item"
            type="button"
          >

            <span>
              ◉
            </span>

            Profile

          </button>




          <button
            className="nav-item"
            type="button"
          >

            <span>
              ⚙
            </span>

            Settings

          </button>



        </nav>





        <div className="sidebar-footer">


          <span className="live-dot" />


          All systems operational


        </div>




      </aside>


    </>

  );


}