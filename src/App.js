import React, { useState, useEffect } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";

const url = "https://randomuser.me/api/";
const defaultImg = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const [value, setValue] = useState("Random Person");
  const [title, setTitle] = useState("name");

  const fetchPerson = async () => {
    setIsLoading(true);
    const res = await fetch(url);
    const data = await res.json();
    const person = data.results[0];

    const { first, last } = person.name;
    const { email } = person;
    const { age } = person.dob;
    const {
      street: { number, name },
    } = person.location;
    const { phone } = person;
    const { password } = person.login;
    const { large } = person.picture;

    const newPerson = {
      name: `${first} ${last}`,
      email,
      age,
      location: `${number} ${name}`,
      phone,
      password,
      img: large,
    };

    setPerson(newPerson);
    setValue(newPerson.name);
    setTitle("name");
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPerson();
  }, []);

  const handleChange = (e) => {
    if (e.target.classList.contains("icon-btn")) {
      const title = e.target.dataset.label;
      setTitle(title);
      setValue(person[title]);
    }
  };

  return (
    <main>
      <div className="bg-black"></div>
      <div className="container">
        <div className="cart">
          <div className="img-conatiner">
            <img src={person ? person.img : defaultImg} alt="img" />
          </div>
          <p className="title">my {title} is</p>
          <h2 className="value">{value}</h2>
          <div className="icons">
            <button
              className="icon-btn"
              data-label="name"
              onMouseOver={handleChange}
            >
              <FaUser />
            </button>
            <button
              className="icon-btn"
              data-label="email"
              onMouseOver={handleChange}
            >
              <FaEnvelopeOpen />
            </button>
            <button
              className="icon-btn"
              data-label="age"
              onMouseOver={handleChange}
            >
              <FaCalendarTimes />
            </button>
            <button
              className="icon-btn"
              data-label="location"
              onMouseOver={handleChange}
            >
              <FaMap />
            </button>
            <button
              className="icon-btn"
              data-label="phone"
              onMouseOver={handleChange}
            >
              <FaPhone />
            </button>
            <button
              className="icon-btn"
              data-label="password"
              onMouseOver={handleChange}
            >
              <FaLock />
            </button>
          </div>
          <button className="random-btn" onClick={fetchPerson}>
            {isLoading ? "Loading..." : "random user"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
