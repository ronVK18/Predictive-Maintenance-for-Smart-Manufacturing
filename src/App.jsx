import "./App.css";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from "./components/Layout";
import Home from "./Pages/Home";
import MainDashBoard from "./Pages/MainDashBoard";
import MachineDashboard from "./Pages/MachineDashboard";
import Temp from "./Pages/Temp";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Home /> },
        { path: "maindashboard", element: <MainDashBoard /> },
    
        { path: "machine/:id", element: <MachineDashboard /> },
        { path: "temp", element: <Temp /> },
    

        // {
        //   path: 'admindashboard',
        //   element: (
        //     <PrivateRoute>
        //      <AdiminDashboard/>
        //     </PrivateRoute>
        //   ),
        // },
 
       
      ],
    },
  ]);

  return (
    <>
     
      <RouterProvider router={router} />
    </>
  );
}

export default App;
