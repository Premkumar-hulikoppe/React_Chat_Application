import { useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import Routers from "./Pages/Routers/Router";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Routers />
    </div>
  );
}

export default App;
