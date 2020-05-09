import React, { Component } from 'react'
import './App.css';

class CocktailPosting extends Component {
    constructor(props) {
      super(props);
      this.state = {editing: false, newTitle: ""};
    }

    deletePosting = () => {
      this.props.delete(this.props.id)
    }

    editTitle = () => {
      this.setState({editing: true})
    }

    changeNewTitle = (event) => {
      this.setState({newTitle: event.target.value})
    }

    submit = () => {
      var newName = {
        name:this.state.newTitle
      }
      this.props.save(this.props.id, newName)
      this.setState({editing: false})
    }

    render(){
      var editBoxOrButton = null;
      if(this.state.editing){
        editBoxOrButton = (
          <div className="editbox">
            <input value={this.state.newTitle} onChange={this.changeNewTitle}/>
            text here
            <button onClick={this.submit} className="submitBox"> Submit </button>
          </div>
        )
      }
      else{
        editBoxOrButton = (<button onClick={this.editTitle} className="editButton">Edit Title</button>)
      }
      return (
        <div className="posting">
            <div className="drinkName">
            {this.props.name} 
            </div>
            <div className="drinkRecipe">
            {this.props.recipe} 
            </div>
            <img src={this.props.image} alt="" className="drinkImage"/>
            <button onClick={this.deletePosting} className="deleteButton">Delete</button>
            {editBoxOrButton}
        </div> 
      );
  }
}
  export default CocktailPosting;