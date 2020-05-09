import React, { Component } from 'react'
import CocktailPosting from './cocktailPosting';
import gif from './giphy-1.gif';
import * as db from './datastore';
import './App.css';


class CocktailBoard extends Component{
    constructor(props){
        super(props);
        this.state = {cocktails: null, newCocktailName: "", newCocktailRecipe: "", newCocktailImage: ""};
    }

    componentDidMount(){
        db.fetchCocktails(this.getCocktails);
    }

    getCocktails = (allCocktails) => {
        this.setState({cocktails: allCocktails});
    }

    newCocktailNameFunction = (event) => {
        this.setState({newCocktailName: event.target.value});
    }

    newCocktailRecipeFunction = (event) => {
        this.setState({newCocktailRecipe: event.target.value});
    }
    
    newCocktailImageFunction = (event) => {
        this.setState({newCocktailImage: event.target.value});
    }

    delete = (id) => {
        db.removeCocktail(id);
        db.fetchCocktails(this.getCocktails);
    }

    saveInfo = () => {
        db.addCocktail(this.state.newCocktailName, this.state.newCocktailRecipe, this.state.newCocktailImage)
        this.setState({
              showAddCocktail: false,
              newCocktailName:'',
              newCocktailRecipe: '',
              newCocktailImage: '',
        })
        db.fetchCocktails(this.getCocktails);
    }

    save = (id, name) => {
        db.updateName(id, name);
        db.fetchCocktails(this.getCocktails);
    }

    render() {
        let allCocktails = null;
        // if(this.state.dogs!=null){
        //   allDogs = Object.keys(this.state.dogs).map((id) => {
        //   const info = this.state.dogs[id];
        //   return <DogPosting
        //     save={this.save}
        //     delete={this.delete}
        //     name={info.dogName}
        //     breed={info.dogBreed}
        //     dogURL={info.link}
        //     id={id}/>
        //   }
        // )
        // }
        if(allCocktails!=null){
            for (let i = 0; i < Object.keys(allCocktails).length; i += 1){
            const currentKey = Object.keys(allCocktails)[i];
            const info = allCocktails[currentKey];
            console.log(info)
            allCocktails.push( <CocktailPosting save={this.save} 
                                    delete={this.delete} 
                                    name={info.cocktailName} 
                                    recipe={info.cocktailRecipe} 
                                    image={info.cocktailImage} 
                                    id={i}/>)
        
            }
        }
        return (
            <div>
            <div className="header">
                <img src={gif} className="logo" id='img1' alt="" width='80px'/>
                <img src={gif} className="logo" id='img2' alt="" width='80px'/>
                <div className="top-title"> 
                    COCKTAILS by Lily
                    <div style={{'font-size':'50px'}}>Enter your cocktail!</div>
                </div>
            </div>
            <div className="inputBar">
                Enter Name:   
                <input placeholder="name" type="text" value={this.state.newCocktailName} onChange={this.newCocktailNameFunction}/>
                Enter Recipe:   
                <input placeholder="recipe" type="text" value={this.state.newCocktailRecipe} onChange={this.newCocktailRecipeFunction}/>
                Enter Image URl:   
                <input placeholder="url" type="text" value={this.state.newCocktailImage} onChange={this.newCocktailImageFunction}/>
                <button onClick={this.saveInfo}>SAVE</button>
            </div>
                {allCocktails}
            </div>
        )
    }
}
export default CocktailBoard;