import React, { useEffect, useState } from "react";
import { API_URL, API_URL_HEART } from "utils/urls";
import Thoughts from "./Thoughts";
import ThoughtInput from "./ThoughtInput";
import "./form.css";

const Form = () => {
  const [thoughts, setThoughts] = useState([]);
  const [newThought, setNewThought] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setThoughts(data));
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: newThought, author: name }),
    };

    fetch(API_URL, options)
      .then((res) => res.json())
      .then((data) => setThoughts([data.response, ...thoughts]));
    setNewThought("");
    setName("");
  };

  const handleHeartClick = (thoughtId) => {
    const options = {
      method: "POST",
    };

    fetch(API_URL_HEART(thoughtId), options)
      .then((res) => res.json())
      .then((data) => {
        const updatedThoughts = thoughts.map((item) => {
          if (item._id === data.response._id) {
            item.heart += 1;
            return item;
          } else {
            return item;
          }
        });

        setThoughts(updatedThoughts);
      });
  };

  return (
    <div className="main-container">
      <div className="input-container">
        <ThoughtInput
          onFormSubmit={handleFormSubmit}
          newThought={newThought}
          setNewThought={setNewThought}
          name={name}
          setName={setName}
        />
      </div>
      <div className="thougths-container">
        {thoughts.map((thought) => (
          <Thoughts
            key={thought._id}
            thought={thought}
            onHeartClick={handleHeartClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Form;
