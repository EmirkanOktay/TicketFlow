import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Index"
import Ticket from '../pages/Dashboard/Tickets'
import Profile from '../pages/Profile/Index'
import EditProfile from '../pages/Profile/EditProfile'
import CreateTicket from '../pages/Ticket/CreatTicket'
import TicketDetail from '../pages/Ticket/TicketDetail'
import Home from '../pages/Home'
import NotFound from '../pages/notFound'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import ChangePassword from '../pages/auth/changePassword'
import PrivateRoute from '../routes/PrivateRouter'
import AuhtLayout from '../layouts/AuthLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import PublicRoute from './PublicRoute'
const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
            //index page
                <Route path="/auth" element={<AuhtLayout />}>
                    <Route
                        path="login"
                        element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="register"
                        element={
                            <PrivateRoute>
                                <Register />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="reset-password"
                        element={
                            <PublicRoute>
                                <ChangePassword />
                            </PublicRoute>
                        }
                    />
                </Route>

          //auth pages

                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <DashboardLayout>
                                <Dashboard />
                            </DashboardLayout>
                        </PrivateRoute>
                    }
                />
            //dashboard page

                <Route
                    path="/dashboard/tickets"
                    element={
                        <PrivateRoute>
                            <DashboardLayout>
                                <Ticket />
                            </DashboardLayout>
                        </PrivateRoute>
                    }
                />

            //dashboard tickets page

                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <DashboardLayout>
                                <Profile />
                            </DashboardLayout>
                        </PrivateRoute>
                    }
                />

            //profile page


                <Route
                    path="/profile/edit"
                    element={
                        <PrivateRoute>
                            <DashboardLayout>
                                <EditProfile />
                            </DashboardLayout>
                        </PrivateRoute>
                    }
                />

            //edit profile page


                <Route
                    path="/ticket/create"
                    element={
                        <PrivateRoute>
                            <DashboardLayout>
                                <CreateTicket />
                            </DashboardLayout>
                        </PrivateRoute>
                    }
                />

            //create ticket page


                <Route
                    path="/ticket/:id"
                    element={
                        <PrivateRoute>
                            <DashboardLayout>
                                <TicketDetail />
                            </DashboardLayout>
                        </PrivateRoute>
                    }
                />

            //ticket detail page


                <Route path="*" element={<NotFound />} />
            //not found page

            </Routes>

        </Router>
    )
}
export default AppRouter;