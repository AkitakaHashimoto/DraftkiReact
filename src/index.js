import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './style.css'


class Timer extends React.Component {
    render() {
       return (
        
        <div className="container-fluid no-padding">
            <div className="row justify-content-md-center" style={{background: 'skyblue'}}>
                <div className="col-md-6" style={{background: 'green', alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
                    <span id="timer">Time Left: {this.props.seconds}  </span>
                 </div>
            </div>
        </div>
      );
    }
  }

  class StartButton extends React.Component {
      render() {
          return (
            <div style={{ marginLeft: 130 }}>
                <button onClick={this.props.startCountDown}>Start</button>
            </div>
          );
      }
  }

  class LockButton extends React.Component {
    render() {
        return (
          <div>
              <button onClick={this.props.onClick}>LockIn</button>
          </div>
        );
     }
    }

    class ChampIcon extends React.Component {

        render() {
            const name = this.props.value;
            const imgSrc="https://ddragon.leagueoflegends.com/cdn/10.11.1/img/champion/" + name + ".png";
            console.log({name});
            console.log(this.props.chosenCheck());

            var opac = 1;

            if (this.props.chosenCheck())
            {
                opac = 0.4;
                console.log('Changing opacity of '+ {name} + 'to 0.5');
            }
            else
            {
                opac = 1;
            }
            return (
                    <img onClick={this.props.onClick} src={imgSrc} style={{height:'80px', width: '80px', opacity: opac}}></img>
            );
        }
    }

    class Board extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                currentChamp: null,
                picks: [],
                turnCount: 0,
                chosenChamps: new Set()
            }
        }

        renderChamp(name) {
            return (
                <ChampIcon 
                value={name} 
                onClick={() => this.chooseChamp(name)}
                chosenCheck={() => this.chosenCheck(name)}
                />
            ); 
        }

        chooseChamp(name) {
            this.setState({currentChamp: name});
            console.log({name});
        }

        chosenCheck(name) {
            return this.state.chosenChamps.has(name);
        }

        lockinChamp() {
            if (this.props.lockEnable == true && !this.chosenCheck(this.state.currentChamp))
            {
                var newPicks = this.state.picks.slice();
                var champName = this.state.currentChamp;
                var count = this.state.turnCount;
                if (count < 6 || (count > 11 && count < 16))
                    var champImage = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + champName + "_0.jpg";
                else
                    var champImage = "https://ddragon.leagueoflegends.com/cdn/10.11.1/img/champion/" + champName + ".png";
                newPicks.push(champImage);
                this.setState({picks: newPicks});
                count++;
                this.setState({turnCount: count});

                this.setState(({chosenChamps}) => ({
                    chosenChamps: new Set(chosenChamps).add(champName)
                }));

                console.log('Added' + {champName} + 'to the set.');
            }
        }
       
  
    

        render() {
            return (
            <div>

                <div className="container-fluid no-padding" style={{background: 'rgb(77, 75, 75)',height: '900px'}}>

                    <div className="row justify-content-md-center" style={{ height: '100px', marginTop: '1rem'}}>
                        <div class="col-md-6 my-auto" style ={{height:'100px', backgroundColor: 'black'}}>
                            <div className="row" style={{ height: '100px'}}>
                                <div class="col-md-3 my-auto" style ={{justifyContent: 'center', display: 'flex', alignItems:'center', height:'100px', backgroundColor: 'blue'}}>
                                </div>
                                <div class="col-md-6 my-auto" style ={{justifyContent: 'center', display: 'flex', alignItems:'center', height:'100px'}}>          
                                    <LockButton onClick={() => {
                                        this.props.reset();
                                        this.lockinChamp();
                                        }} />
                                </div>
                                <div class="col-md-3 my-auto" style ={{justifyContent: 'center', display: 'flex', alignItems:'center', height:'100px', backgroundColor: 'red'}}>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-md-center" style={{ height: '500px', marginTop: '1rem'}}>
                    {/* <!-- Blue Picks --> */}
                        <div class="col-md-3 my-auto" style ={{justifyContent: 'center', display: 'flex', alignItems:'center', height:'500px'}}>
                            <div class="col-md-12" style ={{justifyContent:'center', display:'flex', alignItems:'center', flexWrap: 'wrap', height:'500px'}}>
                                <figure class="col-md-12" style={{justifyContent:'flex-end', display:'flex', alignItems:'center', flexWrap:'wrap', marginBottom:'0px'}}>
                                    <img src={this.state.picks[6]} style={{height:'90px', width:'90px', backgroundColor: 'lightgrey'}}></img>
                                </figure>
                                <figure class="col-md-12" style={{justifyContent:'flex-end', display:'flex', alignItems:'center', flexWrap:'wrap', marginBottom:'0px'}}>
                                    <img src={this.state.picks[9]} style={{height:'90px', width:'90px', backgroundColor: 'lightgrey'}}></img>
                                </figure>
                                <figure class="col-md-12" style={{justifyContent:'flex-end', display:'flex', alignItems:'center', flexWrap:'wrap', marginBottom:'0px'}}>
                                    <img src={this.state.picks[10]} style={{height:'90px', width:'90px', backgroundColor: 'lightgrey'}}></img>
                                </figure>
                                    <figure class="col-md-12" style={{justifyContent:'flex-end', display:'flex', alignItems:'center', flexWrap:'wrap', marginBottom:'0px'}}>
                                    <img src={this.state.picks[17]} style={{height:'90px', width:'90px', backgroundColor: 'lightgrey'}}></img>
                                    </figure>
                                <figure class="col-md-12" style={{justifyContent:'flex-end', display:'flex', alignItems:'center', flexWrap:'wrap', marginBottom:'0px'}}>
                                    <img src={this.state.picks[18]} style={{height:'90px', width:'90px', backgroundColor: 'lightgrey'}}></img>
                                </figure>
                            </div>
                        </div>

                        {/* Champion Picks */}


                        <div className="col-md-6" style ={{justifyContent:'center', display:'flex', alignItems:'center', height:'500px'}}>
                            <div className="col-md-12 anyClass grid-container" style={{justifyContent:'center', alignItems:'center', backgroundColor:'white', height:'500px'}}>

                            <div className="item1">
                                {this.renderChamp("Aatrox")}
                                <span>Aatrox</span>
                            </div>
                            <div className="item1">
                                {this.renderChamp("Ahri")}
                                <span>Ahri</span>
                            </div>
                            <div className="item2">
                                {this.renderChamp("Akali")}
                                <span>Akali</span>
                            </div>
                            <div className="item3">
                                {this.renderChamp("Alistar")}
                                <span>Alistar</span>
                            </div>
                            <div className="item3">
                                {this.renderChamp("Amumu")}
                                <span>Amumu</span>
                            </div>
                            <div className="item3">
                                {this.renderChamp("Anivia")}
                                <span>Anivia</span>
                            </div>
                            <div className="item3">
                                {this.renderChamp("Annie")}
                                <span>Annie</span>
                            </div>
                            <div className="item3">
                                {this.renderChamp("Aphelios")}
                                <span>Aphelios</span>
                            </div>
                            <div className="item3">
                                {this.renderChamp("Ashe")}
                                <span>Ashe</span>
                            </div>
                            <div className="item3">
                                {this.renderChamp("AurelionSol")}
                            </div>
                            <div className="item3">
                                {this.renderChamp("Azir")}
                            </div>
                            <div className="item3">
                                {this.renderChamp("Bard")}
                            </div>
                            <div className="item3">
                                {this.renderChamp("Blitzcrank")}
                            </div>
                            <div className="item3">
                                {this.renderChamp("Brand")}
                            </div>
                            
                            <div className="item3">
                                {this.renderChamp("Braum")}
                            </div>
                            
                            <div className="item3">
                                {this.renderChamp("Caitlyn")}
                            </div>
                            
                            <div className="item3">
                                {this.renderChamp("Camille")}
                            </div>
                            
                            <div className="item3">
                                {this.renderChamp("Cassiopeia")}
                            </div>
                            
                            <div className="item3">
                                {this.renderChamp("Chogath")}
                            </div>
                            
                            <div className="item3">
                                {this.renderChamp("Corki")}
                            </div>
                            
                            <div className="item3">
                                {this.renderChamp("Darius")}
                            </div>
                            <div className="item3">
                                {this.renderChamp("Diana")}
                            </div>
                            
                            <div className="item3">
                                {this.renderChamp("DrMundo")}
                            </div>
                            
                            <div className="item3">
                                {this.renderChamp("Draven")}
                            </div>
                            
                            <div className="item3">
                                {this.renderChamp("Ekko")}
                            </div>
                            <div className="item3">
                                {this.renderChamp("Elise")}
                            </div>
                            
                            <div className="item3">
                                {this.renderChamp("Evelynn")}
                            </div>
                            
                            <div className="item3">
                                {this.renderChamp("Ezreal")}
                            </div>
                            
                            <div className="item3">
                                {this.renderChamp("Fiddlesticks")}
                            </div>
                            <div className="item3">
                                {this.renderChamp("Fiora")}
                            </div>
                            
                            <div className="item3">
                                {this.renderChamp("Fizz")}
                            </div>
                            
                            <div className="item3">
                                {this.renderChamp("Galio")}
                            </div>
                            
                            <div className="item3">
                                {this.renderChamp("Gangplank")}
                            </div>
                            <div className="item3">
                                {this.renderChamp("Garen")}
                            </div>
                            
                            <div className="item3">
                                {this.renderChamp("Gnar")}
                            </div>
                            
                            <div className="item3">
                                {this.renderChamp("Gragas")}
                            </div>
                            
                            <div className="item3">
                                {this.renderChamp("Graves")}
                            </div>
                            
                            
                            </div>
                        </div>

                        {/* Red Picks */}
                        <div class="col-md-3 my-auto" style ={{justifyContent: 'center', display: 'flex', alignItems:'center', height:'500px'}}>
                            <div class="col-md-12" style ={{justifyContent:'center', display:'flex', alignItems:'center', flexWrap: 'wrap', height:'500px'}}>
                                <figure class="col-md-12" style={{justifyContent:'start', display:'flex', alignItems:'center', flexWrap:'wrap', marginBottom:'0px'}}>
                                    <img src={this.state.picks[7]} style={{height:'90px', width:'90px', backgroundColor: 'lightgrey'}}></img>
                                </figure>
                                <figure class="col-md-12" style={{justifyContent:'start', display:'flex', alignItems:'center', flexWrap:'wrap', marginBottom:'0px'}}>
                                    <img src={this.state.picks[8]} style={{height:'90px', width:'90px', backgroundColor: 'lightgrey'}}></img>
                                </figure>
                                <figure class="col-md-12" style={{justifyContent:'start', display:'flex', alignItems:'center', flexWrap:'wrap', marginBottom:'0px'}}>
                                    <img src={this.state.picks[11]} style={{height:'90px', width:'90px', backgroundColor: 'lightgrey'}}></img>
                                </figure>
                                    <figure class="col-md-12" style={{justifyContent:'start', display:'flex', alignItems:'center', flexWrap:'wrap', marginBottom:'0px'}}>
                                    <img src={this.state.picks[16]} style={{height:'90px', width:'90px', backgroundColor: 'lightgrey'}}></img>
                                    </figure>
                                <figure class="col-md-12" style={{justifyContent:'start', display:'flex', alignItems:'center', flexWrap:'wrap', marginBottom:'0px'}}>
                                    <img src={this.state.picks[19]} style={{height:'90px', width:'90px', backgroundColor: 'lightgrey'}}></img>
                                </figure>
                            </div>
                        </div>                 
                    </div>

                    {/* <!-- 3rd Row: Blue Bans, Chat, Red Bans--> */}
                    <div className="row no-padding" style={{height: '180px', marginTop:'1rem', justifyContent: 'center'}}>
      
                    
                        {/* <!-- Row: Blue Bans --> */}
                        <div className="col-md-4" style ={{display:'flex', alignItems:'center', height: '175px'}}>
                            <div className="col-md-12 no-padding" style={{justifyContent:'flex-end', display:'flex', alignItems:'center', height:'175px'}}>
                                {/* <!-- First Ban --> */}
                                <div className="col-md-2 my-auto no-padding" style ={{justifyContent:'center', display:'flex', alignItems:'center', height: '175px',backgroundColor:'blue', marginLeft: '3px', marginRight: '3px'}}>
                                    <img className="img-fluid w-100 champion-ban" src={this.state.picks[0]} style={{backgroundColor: 'lightgrey'}}></img>
                                </div>

                                {/* <!-- Second Ban --> */}
                                <div className="col-md-2 my-auto no-padding" style ={{justifyContent:'center', display:'flex', alignItems:'center', height: '175px',backgroundColor:'blue', marginRight: '3px'}}>
                                    <img className = "img-fluid w-100 champion-ban" src={this.state.picks[2]} style={{backgroundColor: 'lightgrey'}}></img>
                                </div>

                                {/* <!-- Third Ban --> */}
                                <div className="col-md-2 my-auto no-padding" style ={{justifyContent:'center', display:'flex', alignItems:'center', height: '175px',backgroundColor:'blue', marginRight: '3px'}}>
                                    <img className = "img-fluid w-100 champion-ban" src={this.state.picks[4]} style={{backgroundColor: 'lightgrey'}}></img>
                                </div>

                                {/* <!-- Fourth Ban --> */}
                                <div className="col-md-2 my-auto no-padding" style ={{justifyContent:'center', display:'flex', alignItems:'center', height: '175px',backgroundColor:'blue', marginRight: '3px'}}>
                                    <img className = "img-fluid w-100 champion-ban" src={this.state.picks[13]} style={{backgroundColor: 'lightgrey'}}></img>
                                </div>

                                {/* <!-- Fifth Ban --> */}
                                <div className="col-md-2 my-auto no-padding" style ={{justifyContent:'center', display:'flex', alignItems:'center', height: '175px',backgroundColor:'blue', marginRight: '3px'}}>
                                    <img className = "img-fluid w-100 champion-ban" src={this.state.picks[15]} style={{backgroundColor: 'lightgrey'}}></img>
                                </div>

                            </div>
                        </div>

                        {/* <!-- Row: Red Bans --> */}
                        <div className="col-md-4" style ={{display:'flex', alignItems:'center', height: '175px'}}>
                            <div className="col-md-12 no-padding" style={{justifyContent:'flex-start', display:'flex', alignItems:'center', height:'175px'}}>
                                {/* <!-- First Ban --> */}
                                <div className="col-md-2 my-auto no-padding" style ={{justifyContent:'center', display:'flex', alignItems:'center', height: '175px',backgroundColor:'blue', marginLeft: '3px', marginRight: '3px'}}>
                                    <img className= "img-fluid w-100 champion-ban" src={this.state.picks[1]} style={{backgroundColor: 'lightgrey'}}></img>
                                </div>

                                {/* <!-- Second Ban --> */}
                                <div className="col-md-2 my-auto no-padding" style ={{justifyContent:'center', display:'flex', alignItems:'center', height: '175px',backgroundColor:'blue', marginRight: '3px'}}>
                                    <img className = "img-fluid w-100 champion-ban" src={this.state.picks[3]} style={{backgroundColor: 'lightgrey'}}></img>
                                </div>

                                {/* <!-- Third Ban --> */}
                                <div className="col-md-2 my-auto no-padding" style ={{justifyContent:'center', display:'flex', alignItems:'center', height: '175px',backgroundColor:'blue',marginRight: '3px'}}>
                                    <img className = "img-fluid w-100 champion-ban" src={this.state.picks[5]} style={{backgroundColor: 'lightgrey'}}></img>
                                </div>

                                {/* <!-- Fourth Ban --> */}
                                <div className="col-md-2 my-auto no-padding" style ={{justifyContent:'center', display:'flex', alignItems:'center', height: '175px',backgroundColor:'blue',marginRight: '3px'}}>
                                    <img className = "img-fluid w-100 champion-ban" src={this.state.picks[12]} style={{backgroundColor: 'lightgrey'}}></img>
                                </div>

                                {/* <!-- Fifth Ban --> */}
                                <div className="col-md-2 my-auto no-padding" style ={{justifyContent:'center', display:'flex', alignItems:'center', height: '175px',backgroundColor:'blue',marginRight: '3px'}}>
                                    <img className = "img-fluid w-100 champion-ban" src={this.state.picks[14]} style={{backgroundColor: 'lightgrey'}}></img>
                                </div>

                            </div>
                        </div>
                </div>
            </div> 
            </div>
            );
        
        }
    }

  class Draft extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            seconds: 30,
            isClicked: false,
            currentChamp: null,
        }
        this.startCountDown = this.startCountDown.bind(this);
        this.tick = this.tick.bind(this);

    }

    tick() {
        var sec = this.state.seconds;
        if (sec > 0) {
            sec--;
            this.setState({seconds: sec});
        }
        else {
            this.setState({seconds: 30});
        }
    }

    startCountDown() {
        this.intervalHandle = setInterval(this.tick, 1000);
        this.setState({isClicked: true});
    }

  
    resetTimer() {
        this.setState({seconds: 30});
    }
 
    render() {
        return (
            <div className="draft">
                <div className="startbutton">
                    <StartButton startCountDown={this.startCountDown} />
                </div>

                <div className="timer">
                    <Timer seconds={this.state.seconds}/>
                </div>
                <div className="board">
                    <Board lockEnable={this.state.isClicked} reset={() => this.resetTimer()}/>
                </div>
            </div>
        );
    }
}

//================================================================
ReactDOM.render(<Draft />, document.getElementById('root'));