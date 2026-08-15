import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import BookingTable from "../components/booking/BookingTable";

import "../styles/dashboard.css";
import "../styles/booking.css";

import {
  getBookings
} from "../services/bookingService";


export default function BookingManagement(){

  const navigate = useNavigate();

  const [sidebarOpen,setSidebarOpen] = useState(false);

  const [bookings,setBookings] = useState([]);

  const [loading,setLoading] = useState(true);

  const [error,setError] = useState("");



  useEffect(()=>{

    loadBookings();

  },[]);



  async function loadBookings(){

    try{

      setLoading(true);

      const data = await getBookings();

      setBookings(data);


    }catch(error){

      console.error(error);

      setError(
        "Failed loading bookings"
      );


    }finally{

      setLoading(false);

    }

  }



  return (

    <div className="fleet-dashboard">


      <Sidebar
        open={sidebarOpen}
        onClose={()=>setSidebarOpen(false)}
      />



      <main className="dashboard-content">


        <TopNavbar
          onMenuClick={()=>setSidebarOpen(true)}
        />



        <section className="dashboard-intro">


          <div>


            <span className="eyebrow">
              BOOKING CENTER
            </span>



            <h1>
              Booking Management
            </h1>



            <p>
              Manage fleet booking requests and workflow approvals.
            </p>


          </div>



          <button
            className="primary-action"
            onClick={()=>
              navigate("/booking/create")
            }
          >

            + New Booking

          </button>



        </section>





        <section className="stats-grid">


          <article className="stat-card">

            <p>Total Booking</p>

            <strong>
              {bookings.length}
            </strong>

          </article>





          <article className="stat-card">

            <p>Approved</p>

            <strong>

              {
                bookings.filter(
                  b=>b.status==="APPROVED"
                ).length
              }

            </strong>

          </article>





          <article className="stat-card">

            <p>Pending</p>

            <strong>

              {
                bookings.filter(
                  b=>b.status==="PENDING"
                ).length
              }

            </strong>

          </article>





          <article className="stat-card">

            <p>Rejected</p>

            <strong>

              {
                bookings.filter(
                  b=>b.status==="REJECTED"
                ).length
              }

            </strong>

          </article>


        </section>





        {
          loading && (

            <div className="glass-card">
              Loading bookings...
            </div>

          )
        }




        {
          error && (

            <div className="glass-card error-box">

              {error}

            </div>

          )
        }





        {
          !loading && !error && (

            <BookingTable
              bookings={bookings}
            />

          )
        }





      </main>


    </div>

  );

}