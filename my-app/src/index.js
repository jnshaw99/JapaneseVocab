import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import arrow from './arrow.png';

class FlashCard extends React.Component{
    render(){
        return(
            <div class="flashcard" onClick={this.props.toggleDef}>
                <div title={this.props.vocab[1]}>
                    {this.props.definitionGiven ? this.props.vocab[2] : this.props.vocab[0]}
                </div>
            </div>
        );
    }
}

class FlashCardStack extends React.Component{
    render(){
        return(
            <div>
                <span class="flash-stack-nav">
                    <img src={arrow} class="l-arrow-nav" alt='LeftArrow' onClick={this.props.onLeftArrowClick}/>
                    <form>
                        <label>Day Number: {this.props.day}<t /></label>
                        <input type="number"  min="1" max="307" id="newDay"></input>
                        <input type="submit" value="Change Day"></input>
                    </form>
                    <img src={arrow} class="r-arrow-nav" alt="RightArrow" onClick={this.props.onRightArrowClick}/>
                </span>
                <FlashCard 
                    vocab={this.props.daysContent[this.props.vocabHead]}
                    toggleDef={() => this.props.toggleDef()}
                    definitionGiven={this.props.definitionGiven}
                />
            </div>
        );
    }
}

class VocabSys extends React.Component{
    constructor(props){
        super(props);
        var reader= new FileReader();
        reader.onload = function(){
            var dataURL = reader.result;
            var output = document.getElementById('output');
            output.src = dataURL;
        };
        var obj = require('./vocablistBACKUP.json');
        this.state={
            Days: Array(300).fill(null),
            vocabHeader: 0,
            definitionSide: false,
            day: 1,
        };
        for(let i=0;i<300;i++){
            var VocabWords=Array(20).fill(null);
            for(let j=0;j<20;j++){
                var VocabWord=Array(3).fill(null);
                VocabWord[0]=obj['1k.1'][(i*20+j).toString()].word;
                VocabWord[1]=obj['1k.1'][(i*20+j).toString()].hiragana;
                VocabWord[2]=obj['1k.1'][(i*20+j).toString()].definition;
                VocabWords[j]=VocabWord;
            }
            this.state.Days[i]=VocabWords;
        }
    }
    zeroHead(){
        this.setState({
            vocabHeader: 0,
        });
    }
    nextVocabItem(){
        if(this.state.vocabHeader<19){
            this.setState({
                vocabHeader: this.state.vocabHeader+1,
            });
        }
    }
    lastVocabItem(){
        if(this.state.vocabHeader>0){
            this.setState({
                vocabHeader: this.state.vocabHeader-1,
            });
        }
    }
    toggleDef(){
        this.setState({
            definitionSide: !this.state.definitionSide,
        });
    }
    daysContent(){
        let daysContent=Array(0);
        if(this.state.day>=7){
            for(let i=0;i<20;i++){
                daysContent.push(this.state.Days[this.state.day-7][i]);
            }
        }
        if(this.state.day>=4 && this.state.day<304){
            for(let i=0;i<20;i++){
                daysContent.push(this.state.Days[this.state.day-4][i]);
            }
        }
        if(this.state.day>=2 && this.state.day<302){
            for(let i=0;i<20;i++){
                daysContent.push(this.state.Days[this.state.day-2][i]);
            }
        }
        if(this.state.day>=1 && this.state.day<301){
            for(let i=0;i<20;i++){
                console.log(this.state.Days);
                daysContent.push(this.state.Days[this.state.day-1][i]);
            }
        }
        if(this.state.day<300){
            for(let i=0;i<20;i++){
                daysContent.push(this.state.Days[this.state.day][i]);
            }
        }
        return daysContent;
    }
    render(){
        return(
            <div class="flashcard-container">
               <FlashCardStack 
                onLeftArrowClick={() => this.lastVocabItem()}
                onRightArrowClick={() => this.nextVocabItem()}
                Days={this.state.Days}
                vocablist={this.state.Days}
                vocabHead={this.state.vocabHeader}
                zeroHead={()=>this.zeroHead()}
                definitionGiven={this.state.definitionSide}
                toggleDef={() => this.toggleDef()}
                daysContent={this.daysContent()}
                day={this.state.day}
               />
            </div>
        );
    }
}

ReactDOM.render(<VocabSys />, document.getElementById("root"));