import React from "react";
import { Switch, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import About from "./pages/About";
import Home from "./pages/Home";

const App = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-between">
      <Header />
      <main className="flex-1 flex flex-col bg-gray-100">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
};

export default App;
