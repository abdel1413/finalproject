import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm :'',
      data: [],
    };
  }

  onInputChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  getFood = (e) => {
    e.preventDefault();
    const { searchTerm } = this.state;

    fetch(
      `https://api.edamam.com/search?q=${searchTerm}&app_id=755850ce&app_key=b65ad11cb1529cc777336fdabaedde35`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({data: data.hits });
        console.log(data);
      });
  };

  render() {
    return (
      <div>
        <div>
          <h1> Welcome to Our Food site </h1>
          <form className="forms" onSubmit={this.getFood}>
            <input
              onChange={this.onInputChange}
              type="text"
              placeholder="Search Food"
            ></input>
            <button type="submit">Submit</button>
          </form>
        </div>
        <ul class='list'>
          {this.state.data.map((food) => {
            return (
              <li>
                <p>{food.recipe.label}</p>
                <img src={food.recipe.image} alt='' />
              </li>

            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
