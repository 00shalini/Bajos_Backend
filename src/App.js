import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/home/Home";
import Login from "./screens/login/Login";
import Manage from "./screens/manage/Manage";
import ManageList from "./screens/manage/ManageList";
import Contractor from "./screens/contractor/Contractor";
import ContractorList from "./screens/contractor/ContractorList";
import ContractorProfile from "./screens/contractor/ContractorProfile";
import ProductList from "./screens/product/ProductList";
import AddProduct from "./screens/product/AddProduct";
import EndProduct from "./screens/product/EndProduct";
import Report from "./screens/product/Report";
import UnavProduct from "./screens/product/UnavProduct";
import ExportExcel from "./screens/product/ExcelExport";
import InFactory from "./screens/product/InFactory";
import { useState, useEffect } from "react";
import Protected from "./components/Protected";
import ContractorEfficiency from "./screens/contractor/ContractorEfficiency";
import axios from "axios";

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(true);
  // const history = useHistory();
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem("authenticated") || false
  );

  return (
    <Router>
      <Routes>
        {/* {console.log(authenticated)} */}
        <Route
          path="/login"
          element={
            <Login
              authenticated={authenticated}
              setauthenticated={setauthenticated}
            />
          }
        />
        <Route
          path="/home"
          exact
          element={
            <Protected isLoggedIn={authenticated}>
              <Home />
            </Protected>
          }
        />
        <Route
          path="/manage"
          element={
            <Protected isLoggedIn={authenticated}>
              <Manage />
            </Protected>
          }
        />
        <Route
          path="/manage/list"
          element={
            <Protected isLoggedIn={authenticated}>
              <ManageList />
            </Protected>
          }
        />
        <Route
          path="/contractor/add"
          element={
            <Protected isLoggedIn={authenticated}>
              <Contractor />
            </Protected>
          }
        />
        <Route
          path="/contractor/List"
          element={
            <Protected isLoggedIn={authenticated}>
              <ContractorList />
            </Protected>
          }
        />
        <Route
          path="/contractor/profile"
          element={
            <Protected isLoggedIn={authenticated}>
              <ContractorProfile />
            </Protected>
          }
        />
        <Route
          path="/contractor/efficiency"
          element={
            <Protected isLoggedIn={authenticated}>
              <ContractorEfficiency />
            </Protected>
          }
        />
        <Route
          path="/product/list"
          element={
            <Protected isLoggedIn={authenticated}>
              <ProductList />
            </Protected>
          }
        />
        <Route
          path="/product/add"
          element={
            <Protected isLoggedIn={authenticated}>
              <AddProduct />
            </Protected>
          }
        />
        <Route
          path="/product/processing"
          element={
            <Protected isLoggedIn={authenticated}>
              <InFactory />
            </Protected>
          }
        />
        <Route
          path="/product/end"
          element={
            <Protected isLoggedIn={authenticated}>
              <EndProduct />
            </Protected>
          }
        />
        <Route
          path="/product/report"
          element={
            <Protected isLoggedIn={authenticated}>
              <Report />
            </Protected>
          }
        />
        <Route
          path="/product/unavailable"
          element={
            <Protected isLoggedIn={authenticated}>
              <UnavProduct />
            </Protected>
          }
        />
        <Route
          path="/product/export"
          element={
            <Protected isLoggedIn={authenticated}>
              <ExportExcel />
            </Protected>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
