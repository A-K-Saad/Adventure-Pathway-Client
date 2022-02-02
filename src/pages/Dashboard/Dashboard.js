import React, { useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import AdminRoute from "../../components/AdminRoute/AdminRoute";
import NotFound from "../../components/NotFound/NotFound";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import useAuth from "../../hooks/useAuth";
import AddBlog from "./AddBlog/AddBlog";
import "./Dashboard.css";
import ManageUsers from "./ManageUsers/ManageUsers";
import AddReview from "./AddReview/AddReview";
import Overview from "./Overview/Overview";
import ManageBlogs from "./ManageBlogs/ManageBlogs";
import ManageBlogCategory from "./ManageBlogs/ManageBlogCategory/ManageBlogCategory";

const Dashboard = () => {
  let { path } = useRouteMatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <div className="flex flex-no-wrap">
        <Sidebar
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        ></Sidebar>
        <div className="container mx-auto md:w-4/5 w-full">
          <div className="w-full h-screen overflow-hidden">
            <Topbar
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
            ></Topbar>
            <div className="h-full flex justify-center dashboard-contents">
              <Switch>
                <Route exact path={`${path}`}>
                  <div className="w-full h-full">
                    <div className="h-32 w-full object-cover lg:h-48 bg-gradient-to-r from-indigo-500 to-green-200 via-blue-300"></div>
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="-mt-12 md:-mt-16 md:flex md:items-center flex-col justify-center">
                        <div className="rounded-full ring-4 ring-white h-32 w-32 m-auto bg-gray-50 flex overflow-hidden items-center justify-center">
                          <img
                            className="max-w-none h-full w-auto"
                            src={
                              user?.photoURL ||
                              "https://i.ibb.co/qgbdqZ3/male.png"
                            }
                            alt="Avatar"
                          />
                        </div>
                        <div className="mx-4">
                          <div className="sm:hidden md:block flex-1 text-center">
                            <h1 className="text-2xl font-bold text-gray-900 truncate mt-5">
                              {user?.displayName}
                            </h1>
                            <p className="text-gray-500">{user?.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="hidden mt-6 sm:block md:hidden min-w-0 flex-1">
                        <h1 className="text-2xl font-bold text-gray-900 truncate">
                          {user?.displayName}
                        </h1>
                        <p className="text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                  </div>
                </Route>
                <Route exact path={`${path}/add-blog`}>
                  <AddBlog></AddBlog>
                </Route>
                <AdminRoute exact path={`${path}/manage-blogs`}>
                  <ManageBlogs></ManageBlogs>
                </AdminRoute>
                <AdminRoute exact path={`${path}/manage-users`}>
                  <ManageUsers></ManageUsers>
                </AdminRoute>
                <AdminRoute exact path={`${path}/manage-blogs/:category`}>
                  <ManageBlogCategory></ManageBlogCategory>
                </AdminRoute>
                <Route exact path={`${path}/add-review`}>
                  <AddReview></AddReview>
                </Route>
                <Route exact path={`${path}/overview`}>
                  <Overview></Overview>
                </Route>
                <Route exact path={`${path}/*`}>
                  <NotFound></NotFound>
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
