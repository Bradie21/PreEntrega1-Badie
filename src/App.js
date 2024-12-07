import './App.css';
import Navbar from "./Navbar.js";
import ItemListContainer from "./ItemListContainer.js";

function App() {
  return (
    <>
    <Navbar/>

    <ItemListContainer greeting={'Bienvenido'}/>
    </>
  );
}

export default App;