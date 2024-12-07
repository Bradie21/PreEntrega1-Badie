import CartWidget from "./CartWidget";

function Navbar() {
  return (
    <nav>
        <div><h2>Lentes</h2></div>
        <a href='#'>Inicio</a> 
        <a href='#'>Precio</a>
        <a href='#'>Stock</a>

        <CartWidget/>
    </nav>
  );
}

export default Navbar;