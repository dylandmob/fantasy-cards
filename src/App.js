import React from "react";
import zupage from "zupage";
import { ColorExtractor } from "react-color-extractor";
import "./App.css";

class App extends React.Component {
  state = { characters: [] };

  async componentDidMount() {
    const post = await zupage.getCurrentPost();
    this.setState({ post });

    // Map the data using string inter
    let charactersString = post.body.split("\n");
    let characters = [];
    charactersString.forEach((character, index) => {
      var tup = character.split(":");
      characters.push({
        name: tup[0],
        description: tup[1]
      });
    });
    this.setState({ characters });
  }

  getColors = colors => {
    console.log("Colors", colors);
  };

  renderCards = () =>
    this.state.characters.map((character, i) => (
      <div key={character.name} className="magic-card">
        <h3 className="magic-name">{character.name}</h3>
        <ColorExtractor getColors={this.getColors}>
          <img
            className="magic-image"
            src={this.state.post.images[i].url}
            alt="character"
          />
        </ColorExtractor>
        <div className="magic-description-container">
          <p className="magic-description">{character.description}</p>
        </div>
      </div>
    ));

  render() {
    return <div className="bg-image">{this.renderCards()}</div>;
  }
}

export default App;
