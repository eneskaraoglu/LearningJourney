// React Basics - Exercise Solutions

/*
Exercise 1: Hello Component
*/
function Hello() {
  return <h1>Hello, React!</h1>;
}


/*
Exercise 2: Props
*/
function Greeting({ name }) {
  return <p>Hello, {name}</p>;
}


/*
Exercise 3: Render a List
*/
const cities = ["NY", "LA", "SF"];

function CityList() {
  return (
    <ul>
      {cities.map((city) => (
        <li key={city}>{city}</li>
      ))}
    </ul>
  );
}


/*
Exercise 4: Conditional Rendering
*/
const isOnline = false;

function Status() {
  return <div>{isOnline ? "Online" : "Offline"}</div>;
}


/*
Exercise 5: Button Click
*/
function Clicker() {
  const handleClick = () => {
    console.log("Clicked!");
  };

  return <button onClick={handleClick}>Click</button>;
}
