import { useContext, useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

export default function Header() {
  let navigate = useNavigate()
  const { userToken, setUserToken } = useContext(UserContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(userToken))
  }, [userToken])

  useEffect(() => {
    if (user != null) {
      console.log(user.role);
    }
  }, [user])

  function logout() {
    localStorage.removeItem('user', null);
    setUserToken(null);
    navigate('/login')
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <ul className="nav">
              <li
                className="nav-item"
                style={{ fontWeight: "bold", fontSize: "1.5rem" }}
              >
                <Link className="nav-link  text-white" to="/">
                  JobHub
                </Link>
              </li>
            </ul>
          </Navbar.Brand>
          <ul className="nav mr-auto">
            <li
              className="nav-item"
              title="Browse Jobs"
              id="basic-nav-dropdown"
            >
              <Link className="nav-link  text-white" to="/jobs">
                Browse Jobs
              </Link>
            </li>

            {userToken !== null && user?.role === 'User' && (
              <li
                className="nav-item"
                title="applications"
                id="basic-nav-dropdown"
              >
                <Link
                  className="nav-link  text-white"
                  to="/user-applications"
                >
                  Applications
                </Link>
              </li>
            )}

            {userToken !== null && user?.role === 'Admin' && (
              <li
                className="nav-item"
                title="Dashboard"
                id="basic-nav-dropdown"
              >
                <Link className="nav-link  text-white" to="/admin-dashboard">
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
          <Nav className="ml-auto">
            {userToken === null ? (
              <>
                <Link to="/signup">
                  <button type="button" className="btn btn-primary me-2">
                    Join Now
                  </button>
                </Link>
                <Link to="/login">
                  <button type="button" className="btn btn-light me-2">
                    Log In
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link>
                  <button type="button" onClick={() => logout()} className="btn btn-outline-light me-2">
                    Log Out
                  </button>
                </Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
