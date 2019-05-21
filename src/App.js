import React from "react";
import zupage from "zupage";
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
      var data = character.split(":");
      if (data[0] && data[1])
        characters.push({
          name: data[0],
          description: data[1]
        });
    });
    this.setState({ characters });
  }

  renderCards = () =>
    this.state.characters.map((character, i) => (
      <div key={character.name} className="magic-card">
        <img
          className="magic-image"
          src={this.state.post.images[i].url}
          alt="character"
        />
        <h3 className="magic-name">{character.name}</h3>
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
