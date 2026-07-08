import { useState } from "react";

import "./App.css";
import Auth from "./components/Auth.jsx";
import Calendar from "./components/Calendar.jsx";

function App() {
    const [showAuth, setShowAuth] = useState(true);

    if (showAuth) {
        return <Auth onDone={() => setShowAuth(false)} />;
    }
    return <Calendar />;
}

export default App;
