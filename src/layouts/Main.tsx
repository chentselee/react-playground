import Nav from "./Nav";

const Main: React.FC = ({ children }) => {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <Nav />
      {children}
    </main>
  );
};

export default Main;
