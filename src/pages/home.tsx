import type { FunctionComponent } from "react";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <main className="p-4">
      <h1>Home page</h1>
    </main>
  );
};

export default Home;
