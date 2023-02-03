import logo from "./logo.svg";
import "./App.css";

import { Home } from "./Home";
import { Department } from "./Department";
import { Employee } from "./Employee";
import {
  BrowserRouter,
  Router,
  Link,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <h3 className="d-flex justify-content-center m-3">
          Quản lý Gara
        </h3>

        <nav className="navbar navbar-expand-sm bg-light navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/home">
                Trang chủ
              </NavLink>
            </li>
            <li className="nav-item m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/customer">
                Khách hàng
              </NavLink>
            </li>
            <li className="nav-item m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/employee">
                Nhân viên
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="home" element ={<Home />}>abc</Route>
          <Route path="customer" element ={<Department />}></Route>
          <Route path="employee" element ={<Employee />}></Route>
        </Routes>

      </div>
    </BrowserRouter>
  );
}
export default App;
