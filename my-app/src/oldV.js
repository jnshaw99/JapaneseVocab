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
    constructor(props){
        super(props);
        this.state=({
            day: 0,
            daysContent: Array(100).fill(null),
            definitionGiven: false,
            next: 0
        });
        for(let i=0;i<20;i++){
            this.state.daysContent[i]=this.props.Days[0][i]
        }
        this.updateNext=this.updateNext.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.updateDaysContent=this.updateDaysContent.bind(this);
    }
    toggleDefinitionGiven(){
        this.setState({
            definitionGiven: !this.state.definitionGiven,
        });
    }
    updateDaysContent(){
        var dayContent=Array(100).fill(null);
        if(this.state.day>=7){
            for(let i=0;i<20;i++){
                dayContent[80+i]=this.props.Days[this.state.day-7][i];
            }
        }
        if(this.state.day>=4 && this.state.day<304){
            for(let i=0;i<20;i++){
                dayContent[60+i]=this.props.Days[this.state.day-4][i];
            }
        }
        if(this.state.day>=2 && this.state.day<302){
            for(let i=0;i<20;i++){
                dayContent[40+i]=this.props.Days[this.state.day-2][i];
            }
        }
        if(this.state.day>=1 && this.state.day<301){
            for(let i=0;i<20;i++){
                dayContent[20+i]=this.props.Days[this.state.day-1][i];
            }
        }
        if(this.state.day<300){
            for(let i=0;i<20;i++){
                dayContent[0+i]=this.props.Days[this.state.day][i];
            }
        }
        this.setState({
            daysContent: dayContent,
        });
    }
    handleChange(e){
        e.preventDefault();
        this.setState({day : this.state.next});
        setTimeout({}, 20000);
        this.updateDaysContent();
        this.props.zeroHead();
    }
    updateNext(e) {
        this.setState({
          next: e.target.value
        });
    }
    render(){
        return(
            <div>
                <span class="flash-stack-nav">
                    <img src={arrow} class="l-arrow-nav" alt='LeftArrow' onClick={this.props.onLeftArrowClick}/>
                    <form onSubmit={this.handleChange}>
                        <label>Week Number: {this.state.day}<t /></label>
                        <input type="number"  min="1" max="307" id="newDay" onChange={this.updateNext}></input>
                        <input type="submit" value="Change Day"></input>
                    </form>
                    <img src={arrow} class="r-arrow-nav" alt="RightArrow" onClick={this.props.onRightArrowClick}/>
                </span>
                <FlashCard 
                    vocab={this.state.daysContent[this.props.vocabHead]}
                    vocabHead={this.props.vocabHead}
                    toggleDef={() => this.toggleDefinitionGiven()}
                    definitionGiven={this.state.definitionGiven}
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
               />
            </div>
        );
    }
}

ReactDOM.render(<VocabSys />, document.getElementById("root"));