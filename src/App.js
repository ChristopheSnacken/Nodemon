import React, { Component } from 'react';
import './App.css';
import Sound from 'react-sound';
import Voice from './voice';
import logo from './tenor.gif';
import logo2 from './nodemontitle.png';

let createReactClass = require('create-react-class');
let items = []
let no_of_moves;
const max_no_of_moves = 64;
let mario_jump;
let max_mashroom;

function Welcome(props) {
	return (
		<div>

			<h2> gotta catch them all </h2>

		</div>
		)
}


function ScoreCard(props) {
	let score_achived  = document.getElementById('score_achived')

	let no_of_moves_score = document.getElementById('no_of_moves')
	let steps_remaining = document.getElementById('steps_remaining')
	let mashrooms_remaining = document.getElementById('mashrooms_remaining')
	steps_remaining.innerHTML = max_no_of_moves -  no_of_moves
	no_of_moves_score.innerHTML = no_of_moves
	mashrooms_remaining.innerHTML = document.getElementsByClassName('active').length
	score_achived.innerHTML = max_mashroom - document.getElementsByClassName('active').length
}

let Score = createReactClass({
	getInitialState: function() {
		return {score: 0}

	},
	render: function() {
		return (
		<div id="score">
			<div>
				<p className= "extra" >Nodemon Score</p>
				<p  className= "extra"id="score_achived">0</p>
			</div>
			<div>
				<p className= "extra">Steps Used</p>
				<p  className= "extra"id="no_of_moves">0</p>
			</div>
			<div >
				<p className= "extra">Steps Remaining</p>
				<p  className= "extra"id="steps_remaining">0</p>
			</div>
			<div >
				<p className= "extra">Errors Remaining</p>
				<p  className= "extra"id="mashrooms_remaining">0</p>
			</div>
		</div>
		)
	}
})

let Cell = createReactClass({
	getInitialState: function() {
		return {selected: false}

	},
	render: function() {
		return (
		<div className={this.state.selected?"cell active":"cell"}
			id={this.props.id}>
		</div>
		)
	}
})


function checkFinish() {
	if(no_of_moves === max_no_of_moves){
		let confirm = window.confirm("Game Over. Do you want to restart?");
		if (confirm === true){
			window.location.reload();
		}
	}
	let check = document.getElementsByClassName('active')
	if(check.length === 0){
		let game_complete = window.confirm("hurray!!! You have finished the game in "+ no_of_moves + " moves.");
		if (game_complete === true){
			window.location.reload()
		}
	}
}


let Box = createReactClass({
	getInitialState: function() {
		// build an array to hold all the cells
		//
		let c = []
		for(let i=1; i<=this.props.matrix; i++){
			c.push( <Cell key={i} id={i} cells={c} /> )
			items.push(i)
		}
		return {cells: c}
	},
	render: function() {
		return (
		  <div> { this.state.cells } </div>
		)
	}
})



/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		let temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array

}


function movement(event){
	if (event === "left" || event.keyCode === 37){
		let mario = document.getElementsByClassName('mario')
		let marioid = mario[0].id
		let move = document.getElementById(marioid-1)
		if(move != null){
			if(move.classList.contains('active')){
				move.classList.toggle('active')
			}
			move.innerHTML = document.getElementById(marioid).innerHTML
			document.getElementById(marioid).innerHTML = ""
			document.getElementById(marioid).classList.toggle('mario')
			move.classList.toggle('mario')
			marioid = marioid-1
		}
		else{
			no_of_moves = no_of_moves-1
		}

	}
	if (event === "up" || event.keyCode === 38){
		let mario = document.getElementsByClassName('mario')
		let marioid = mario[0].id
		let move_up = parseInt(marioid,10) - parseInt(mario_jump,10);
		let move = document.getElementById(move_up)
		if(move != null){
			if(move.classList.contains('active')){
				move.classList.toggle('active')
			}
			move.innerHTML = document.getElementById(marioid).innerHTML
			document.getElementById(marioid).innerHTML = ""
			document.getElementById(marioid).classList.toggle('mario')
			move.classList.toggle('mario')
			marioid = marioid-mario_jump
		}
		else{
			no_of_moves = no_of_moves-1
		}
	}

	if (event === "right" || event.keyCode === 39){
		let mario = document.getElementsByClassName('mario')
		let marioid = mario[0].id
		let move_right = parseInt(marioid,10) + 1
		let move = document.getElementById(move_right)
		if(move != null){
			if(move.classList.contains('active')){
				move.classList.toggle('active')
			}
			move.innerHTML = document.getElementById(marioid).innerHTML

			document.getElementById(marioid).innerHTML = ""
			document.getElementById(marioid).classList.toggle('mario')
			move.classList.toggle('mario')
			marioid = marioid+1
		}
		else{
			no_of_moves = no_of_moves-1
		}
	}

	if (event === "down" || event.keyCode === 40){
		let mario = document.getElementsByClassName('mario')
		let marioid = mario[0].id
		let move_up = parseInt(marioid,10) + parseInt(mario_jump,10)
		let move = document.getElementById(move_up)
		if(move != null){
			if(move.classList.contains('active')){
				move.classList.toggle('active')
			}
			move.innerHTML = document.getElementById(marioid).innerHTML
			document.getElementById(marioid).innerHTML = ""
			document.getElementById(marioid).classList.toggle('mario')
			move.classList.toggle('mario')
			marioid = marioid+mario_jump
		}
		else{
			no_of_moves = no_of_moves-1
		}
	}

}


class App extends Component {
 	constructor(props){
		super(props);
		let width = prompt("Enter width of game: ");
		let height = width;
		if(height == null || width == null || isNaN(width) === true || isNaN(height) === true){
			height = 10
			width = 10
		}
		let matrix_size = height * width
		mario_jump = width
		this.state = {
			matrix_size:matrix_size,
			width:width,
			height:height,
			inputText: ''
		}
	}
	componentDidMount() {
		window.addEventListener('load', this.handleLoad(this.state.width,this.state.height));
	}

	handleLoad(width,height){
		let matrix = document.getElementById('root')
		matrix.style.height = 40 * height + "px"
		matrix.style.width = 40 * width + "px"
		let shuffled_data = shuffleArray(items)
		let truncated_data = shuffled_data.slice(0,parseInt(this.state.matrix_size/3,10))

		for (let i = 0; i < truncated_data.length; i++) {
			let elem_position = document.getElementById(truncated_data[i])
			elem_position.innerHTML="<img src='error.jpg' alt='mario' class='maze-image'/>";
			elem_position.classList.toggle('active')
		}

		let unique_data = shuffled_data.filter(function(obj) { return truncated_data.indexOf(obj) === -1; });
		let item = unique_data[Math.floor(Math.random()*unique_data.length)];
		let marioposition=document.getElementById(item)
		marioposition.classList.toggle('mario')
		marioposition.innerHTML="<img src='cod.jpg' alt='mario' class='maze-image'/>";
		max_mashroom = document.getElementsByClassName('active').length
	}

	// onKeyPress = (event) => {
	//
	//
	// 	}
	// 	movement(event)
	// 	checkFinish()
	// 	ScoreCard()
	// }

	newInput(value) {
		console.log(value)

		if(value === "left" || value === "up" || value=== "right" || value === "down" || value.keyCode === 37 || value.keyCode === 38 || value.keyCode === 39 || value.keyCode === 40){
			if (no_of_moves === undefined){
			  	no_of_moves = 0
			}
			no_of_moves = no_of_moves + 1;
	}
	movement(value)
		checkFinish()
		ScoreCard()
}

	componentWillMount() {
		document.addEventListener("keydown", this.newInput);
	}
	render() {
		return (
			<div className="App">
				<div><img src={logo2} width="200" height="100" /></div>
				<Welcome/>
				<div><img className="logo" src={logo} width="100" height="100" /></div>

				<Voice onInputChange = {this.newInput}/>
				<Sound
							url="http://66.90.93.122/ost/pokemon-original-game-soundtrack/qkwjrhep/101%20-%20opening.mp3"
							playStatus={Sound.status.PLAYING}
							autoLoad = 'true'
						/>

				<Box matrix={this.state.matrix_size}>

				</Box>
				<Score/>
			</div>
		);
	}
}

export default App;
