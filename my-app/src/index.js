import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import arrow from './arrow.png';

class FlashCardFront extends React.Component{
    render(){
        return(
            <div title={this.props.title}>
                {this.props.definition}
            </div>
        );
    }
}

class FlashCardBack extends React.Component{
    render(){
        return(
            <div title={this.props.title}>
                {this.props.definition}
            </div>
        );
    }
}

class FlashCard extends React.Component{
    render(){
        let cardside;
        if(this.props.definitionGiven){
            cardside=<FlashCardFront title={this.props.vocab[1]} definition={this.props.vocab[2]}/>
        }else{
            cardside=<FlashCardBack title={this.props.vocab[1]} definition={this.props.vocab[0]}/>
        }
        return(
            <div class="flashcard" onClick={this.props.toggleDef}>
                {cardside}
            </div>
        );
    }
}

class FlashCardStack extends React.Component{
    handleChange(event){
        this.props.onChange(event);
    }
    handleSubmit(event){
        this.props.onSubmit(event);
    }
    render(){
        return(
            <div>
                <span class="flash-stack-nav">
                    <img src={arrow} class="l-arrow-nav" alt='LeftArrow' onClick={this.props.onLeftArrowClick}/>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <span class="day-number">Day Number: {this.props.day}</span>
                        <input type="number"  min="1" max="300" id="newDay" onChange={this.handleChange.bind(this)}></input>
                        <input class="submit-button" type="submit" value="Change Day"></input>
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
            next: 0,
            length: 20,
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
    nextVocabItem(){
        if(this.state.vocabHeader<this.state.length-1){
            this.setState({
                vocabHeader: this.state.vocabHeader+1,
                definitionSide: false,
            });
        }
    }
    lastVocabItem(){
        if(this.state.vocabHeader>0){
            this.setState({
                vocabHeader: this.state.vocabHeader-1,
                definitionSide: false,
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
        if(this.state.day<=300){
            for(let i=0;i<20;i++){
                daysContent.push(this.state.Days[this.state.day-1][i]);
            }
        }
        return daysContent;
    }
    onSubmit(e){
        e.preventDefault();
        this.setState({
            day : this.state.next,
            daysContent: this.daysContent(),
            vocabHeader: 0,
            definitionSide: false,
        });
    }
    onChange(e){
        this.setState({
            next: e.target.value,
        });
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
                onSubmit={this.onSubmit.bind(this)}
                onChange={this.onChange.bind(this)}
               />
            </div>
        );
    }
}

ReactDOM.render(<VocabSys />, document.getElementById("root"));