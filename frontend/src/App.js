import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UpdateUser from "./components/UpdateUser";
function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/updateUser" element={<UpdateUser></UpdateUser>}></Route>
        <Route path="/" element={<HomePage></HomePage>}></Route>
      </Routes>
    </div>
  );
}

export default App;
