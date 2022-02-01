import { BrowserRouter, Switch, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import NotFound from "./components/NotFound/NotFound";
import AuthProvider from "./Contexts/AuthProvider";
// import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import Blogs from "./pages/Blogs/Blogs";
import BlogDetails from "./pages/BlogDetails/BlogDetails";
import Reviews from "./pages/Reviews/Reviews";
import UserProfile from "./pages/UserProfile/UserProfile";
const App = () => {
  const FullContainer = ({ children }) => {
    return (
      <>
        <Navbar></Navbar>
        {children}
        <Footer></Footer>
      </>
    );
  };
  return (
    <>
      <div className="min-h-screen flex flex-col justify-between">
        <AuthProvider>
          <BrowserRouter>
            <Switch>
              <Route exact path="/">
                <FullContainer>
                  <Home></Home>
                </FullContainer>
              </Route>
              <Route exact path="/login">
                <FullContainer>
                  <Login></Login>
                </FullContainer>
              </Route>
              <Route exact path="/signup">
                <FullContainer>
                  <Signup></Signup>
                </FullContainer>
              </Route>
              <Route exact path="/blogs">
                <FullContainer>
                  <Blogs isTwoColumn={true}></Blogs>
                </FullContainer>
              </Route>
              <Route exact path="/blogs/:blogId">
                <FullContainer>
                  <BlogDetails></BlogDetails>
                </FullContainer>
              </Route>
              <PrivateRoute path="/dashboard">
                <Dashboard></Dashboard>
              </PrivateRoute>
              <Route exact path="/user/:userId">
                <FullContainer>
                  <UserProfile></UserProfile>
                </FullContainer>
              </Route>
              <Route exact path="/reviews">
                <FullContainer>
                  <Reviews></Reviews>
                </FullContainer>
              </Route>
              <Route path="*">
                <FullContainer>
                  <NotFound></NotFound>
                </FullContainer>
              </Route>
            </Switch>
          </BrowserRouter>
        </AuthProvider>
      </div>
    </>
  );
};

export default App;
