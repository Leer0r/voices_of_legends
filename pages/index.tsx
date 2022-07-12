import { ChangeEvent, Component, ReactNode } from 'react';
import Router, { NextRouter, useRouter } from 'next/router'
import Link from 'next/link';
import gameStart from '../interfaces/gameStart.interface';

class mainpage extends Component{
  
  levelParameter:Array<string>
  levelTitle:Array<string>
  state:{
    levelParameter: string
    currentLevel:string
  }

  constructor(props:any){
    super(props)
    this.levelTitle = [
      "Facile",
      "Moyen"
    ]
    this.levelParameter = [
      "Avec les son de pick des champions",
      "Avec les son de ban des champions"
    ]
    this.state = {
      levelParameter: this.levelParameter[0],
      currentLevel:this.levelTitle[0]
    }
  }

  useUser = () => ({ test:"bloalo" })

  test = () => {
    const query:gameStart = {
      difficulty: this.state.currentLevel
    }
    Router.push({
      pathname: "/quiz",
      query:query,
    })
  }

  difficultyChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    const currentValue:number = +ev.target.value
    console.log(currentValue)
    console.log(this.levelTitle[currentValue])
    
    this.setState({currentLevel:this.levelTitle[currentValue],levelParameter:this.levelParameter[currentValue]})
  }

  render(): ReactNode {
    const {currentLevel, levelParameter} = this.state
      return(
        <div className="mainContainer">
          <div className="header">
            <div className="header">
                <div className="leftContainer">
                    <div className="classicGame gameSelect hoverable selected">Classique</div>
                    <div className="pixelGuess gameSelect hoverable">Pixel guess</div>
                    <div className="championInteraction gameSelect hoverable">Interractions</div>
                </div>
                <div className="centerContainer">
                    <div className="title">
                        <div className="upTitle">VOICES OF</div>
                        <div className="botTitle">LEGENDS</div>
                    </div>
                </div>
                <div className="rightContainer"></div>
            </div>
          </div>
          <div className="middle">
                <div className="help">
                    <div className="helpIcon hoverable">?</div>
                </div>
                <div className="title">Classique</div>
                <div className="levelParameter">
                    <p>Difficultée</p>
                    <select className="difficulty" onChange={(e:ChangeEvent<HTMLSelectElement>) => this.difficultyChange(e)}>
                    <option value="0">Facile</option>
                    <option value="1">Moyen</option>
                    </select>
                    <p className="levelDesc">{levelParameter}</p>
                </div>
                <div className="userBanner">
                    <div className="userBackBanner"></div>
                    <div className="userLevelRing"></div>
                    <div className="userProfileIcon"></div>
                    <div className="userLevel">110</div>
                </div>
                <div className="lauchContainer hoverable">
                    <div className="lauchGame" onClick={this.test}>Jouer</div>
                </div>
            </div>
            <div className="bottom"></div>
        </div>
      )
  }
}

export default mainpage