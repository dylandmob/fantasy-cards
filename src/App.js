import React from "react";
import zupage from "zupage";
import { Container, Image, Card } from "semantic-ui-react";
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

  renderCards = () =>
    this.state.characters.map((character, i) => (
      <Card key={character.name}>
        <img className="fantasy-image" src={this.state.post.images[i].url} />
        <Card.Content>
          <Card.Header className="fanstasy-name">{character.name}</Card.Header>
          <Card.Description>{character.description}</Card.Description>
        </Card.Content>
      </Card>
    ));

  render() {
    return (
      <div className="bg-image">
        <Card.Group centered>{this.renderCards()}</Card.Group>
      </div>
    );
  }
}

export default App;
