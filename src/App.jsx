/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";

import Routes from "./Routes";
import AuthProvider from "./context/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
