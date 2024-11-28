const Navbar = () => {
  return (
    <nav
      style={{
        backgroundColor: "#007BFF",
        color: "white",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1
        style={{margin: 0}}
        onClick={() => alert("hello there ;)")}
      >
        Graph Theorist Sketch Pad
      </h1>
  </nav>
  );
}

export default Navbar;