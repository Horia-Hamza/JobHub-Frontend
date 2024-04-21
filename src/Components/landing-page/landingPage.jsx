
import './landing-page.css';
import { Link } from "react-router-dom";
import Footer from '../footer/footer'
export function LandingPage() {
 
  return (
    <>
        <section className="vh-100 bg-hero p-0">
          <div className='layer d-flex justify-content-center align-items-center'>
            <div>
            <h1>Welcome to Your Website</h1>
          <p>Find the perfect job for your skills and interests.</p>
          <div style={{ maxWidth: "400px", margin: "0 auto" }}>
            <Link to="/jobs">
              <button
                className="btn btn-primary mt-2"
                style={{ width: "100%" }}
              >
                Browse Jobs
              </button>
            </Link>
          </div>
            </div>
          </div>
        </section>
        <Footer></Footer>
        {/* <footer className="bg-dark p-2 text-center fixed-bottom">
   <p className="text-white">© 2024 Job Hup. All Rights Reserved.</p>
   </footer> */}
        {/* Add 
      {/* Add more sections or components for your landing page */}
    </>
  );
}
