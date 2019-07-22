import React, { useState, useEffect } from "react";
import zupage from "zupage";
import "./App.css";

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [post, setPost] = useState({});

  useEffect(() => {
    async function loadPost() {
      const post = await zupage.getCurrentPost();
      setPost(post);

      // Map the data using string inter
      let charactersString = post.body.split("\n");
      let characters = [];
      charactersString.forEach((character, index) => {
        var data = character.split(":");
        if (data[0] && data[1])
          characters.push({
            name: data[0],
            description: data[1]
          });
      });
      setCharacters(characters);
    }
    loadPost();
  }, []);

  return (
    <div className="bg-image">
      {!characters.length ? (
        <h3 className="magic-name" style={{ marginTop: 200 }}>
          Couldn't find any characters! Make sure your text is in the format
          NAME: DESCRIPTION then a new line for each character!
        </h3>
      ) : (
        characters.map((character, i) => (
          <div key={character.name} className="magic-card">
            {post.images[i] ? (
              <img
                className="magic-image"
                src={post.images[i].url || ""}
                alt="character"
              />
            ) : (
              <h4 className="no-image">No Image was found. Please add one!</h4>
            )}

            <h3 className="magic-name">{character.name}</h3>
            <div className="magic-description-container">
              <p className="magic-description">{character.description}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
