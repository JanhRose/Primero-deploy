//import Contador from "./components/Contador";
import { useState } from "react";
import FormList from "./components/FormList";
import List from "./components/List";

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <>
      <FormList onAdd={() => setRefresh(!refresh)} />
      <List refresh={refresh} />
    </>
  );
}

export default App;
