import ReactVoiceInput from 'react-voice-input'
import React, { PureComponent } from 'react'
import './voice.css'

export default class Voice extends PureComponent{
  constructor (props) {
    super(props)
    this.state = {
      inputText: ''
    }

    this.onResult = this.onResult.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
  }



  onInputChange (event) {
    console.log(event.target.value)
  this.props.onInputChange(event.target.value)

  }

  onResult (result) {
    console.log(result)
    this.props.onInputChange(result)
    this.setState({
      inputText: result
    })
  }

  render () {
    const onEnd = () => {
      console.log('on end')
    }
    const onSpeechStart = () => {
      console.log('start')
    }

    return (
      <main>
        <ReactVoiceInput
          onSpeechStart={this.onSpeechStart}
          onResult={this.onResult}
          onEnd={onEnd}
        >
          <input className= "input" type='text' value={this.state.inputText} onChange={()=>console.log('test')} />
        </ReactVoiceInput>
      </main>
    )
  }
}
