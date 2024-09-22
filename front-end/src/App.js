 import logo from './logo.svg';
 import { jwtDecode } from "jwt-decode";
import './App.css';
import { useEffect, useState } from 'react';
import { useLocalState } from './util/useLocalStorage';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Homepage from './Homepage';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import AssignmentView from './AssignmentView';
import 'bootstrap/dist/css/bootstrap.min.css';
import CodeReviewerDashboard from './CodeReviewerDashboard';
import CodeReviewerAssignmentView from './CodeReviewerAssignmentView';

function App() {
  const [jwt, setJwt] = useLocalState( "", "jwt" );
  const [roles, setRoles] = useState( getRolesFromJwt() );

  function getRolesFromJwt() {
    return jwt
      ? jwtDecode( jwt ).authorities
      : [];
  }

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          roles.find( role => role === "ROLE_CODE_REVIEWER" ) ? (
            <PrivateRoute>
              <CodeReviewerDashboard />
            </PrivateRoute>
          ) : (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          )
        }
      />
      <Route
        path="/assignments/:id"
        element={
          roles.find( role => role === "ROLE_CODE_REVIEWER" ) ? (
            <PrivateRoute>
              <CodeReviewerAssignmentView />
            </PrivateRoute>
          ) : (
            <PrivateRoute>
              <AssignmentView />
            </PrivateRoute>
          )
        }
      />
      <Route path="/login" element={<Login/>} />
      <Route path="/" element={<Homepage />} />
    </Routes>
  )
}

export default App;
