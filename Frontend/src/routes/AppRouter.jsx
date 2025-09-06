import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Index"
import Ticket from '../pages/Dashboard/Tickets'
import Profile from '../pages/Profile/MyProfile'
import EditProfile from '../pages/Profile/EditProfile'
import CreateTicket from '../pages/Ticket/CreatTicket'
import TicketDetail from '../pages/Ticket/TicketDetail'
import NotFound from '../pages/notFound'
import Login from '../pages/auth/Login'
import Register from '../pages/Admin/Register'
import ChangePassword from '../pages/auth/changePassword'
import PrivateRoute from '../routes/PrivateRouter'
import AuhtLayout from '../layouts/AuthLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import PublicRoute from './PublicRoute'
import AdminLayout from "../layouts/AdminLayout"
import Users from "../pages/Admin/Users"
import Tickets from "../pages/Admin/Tickets"
import Analytics from "../pages/Admin/Analytics"
import ItTickets from "../pages/ITPages/ItTickets";
import ITLayout from "../layouts/ITLayout"
import OpenTickets from "../pages/ITPages/OpenTickets"
import ClosedTickets from "../pages/ITPages/ClosedTickets"
import Support from "../pages/Dashboard/Support";
import MyTickets from '../pages/Ticket/MyTickets'
import MyProfile from "../pages/Profile/MyProfile";
import AdminUserEdit from '../pages/Admin/AdminUserEdit'

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
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

                <Route path="/dashboard/support" element={
                    <PrivateRoute>
                        <DashboardLayout>
                            <Support />
                        </DashboardLayout>
                    </PrivateRoute>
                } />
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

                <Route
                    path="/profile/my-profile"
                    element={
                        <PrivateRoute>
                            <DashboardLayout>
                                <MyProfile />
                            </DashboardLayout>
                        </PrivateRoute>
                    }
                />

            //profile page


                <Route
                    path="/profile/edit-profile"
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
                <Route
                    path="/ticket/my-tickets"
                    element={
                        <PrivateRoute>
                            <DashboardLayout>
                                <MyTickets />
                            </DashboardLayout>
                        </PrivateRoute>
                    }
                />

            //ticket  pages

                <Route path="/admin/users"
                    element={
                        <PrivateRoute>
                            <AdminLayout>
                                <Users />
                            </AdminLayout>
                        </PrivateRoute>
                    }
                />
                <Route path="/admin/tickets"
                    element={
                        <PrivateRoute>
                            <AdminLayout>
                                <Tickets />
                            </AdminLayout>
                        </PrivateRoute>
                    }
                />
                <Route path="/admin/analytics"
                    element={
                        <PrivateRoute>
                            <AdminLayout>
                                <Analytics />
                            </AdminLayout>
                        </PrivateRoute>
                    }
                />
                <Route path="/admin/create-user"
                    element={
                        <PrivateRoute>
                            <AdminLayout>
                                <Register />
                            </AdminLayout>
                        </PrivateRoute>
                    }
                />
                <Route path="admin/edit-user/:id"
                    element={
                        <PrivateRoute>
                            <AdminLayout>
                                <  AdminUserEdit />
                            </AdminLayout>
                        </PrivateRoute>
                    }
                />


                //admin pages


                <Route path="/it/tickets"
                    element={
                        <PrivateRoute>
                            <ITLayout>
                                <ItTickets />
                            </ITLayout>
                        </PrivateRoute>
                    }
                />

                <Route path="/it/open-tickets"
                    element={
                        <PrivateRoute>
                            <ITLayout>
                                <OpenTickets />
                            </ITLayout>
                        </PrivateRoute>
                    }
                />

                <Route path="/it/closed-tickets"
                    element={
                        <PrivateRoute>
                            <ITLayout>
                                <ClosedTickets />
                            </ITLayout>
                        </PrivateRoute>
                    }
                />

                <Route path="*" element={<NotFound />} />
            //not found page

            </Routes>
        </Router>
    )
}
export default AppRouter;