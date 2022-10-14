import axios from 'axios'
import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import Header from './Components/Header'
import Text from './Components/Text'
import './style.css'


function App() {
  // const [text, setText] = useState('the at there some my of be use her than and this an would first a have each make water to from which like been in or she him call is one do into who had how time oil that by their has its it word if look now he but will two find was not up more long for what other write down on all about go day are were out see did')
  const [text, setText] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [words, setWords] = useState([])
  const [currentWord, setCurrentWord] = useState(0)
  const [currentWordByLetters, setCurrentWordByLetters] = useState([])
  const [isCurrentCorrect, setIsCurrentCorrect] = useState(true)
  const [timer, seTtimer] = useState(10)
  const [isTimerStarted, setIsTimerStarted] = useState(false)
  const [totalQuantityOfWords, setTotalQuantityOfWords] = useState(0)
  const [isCurrentWordCorrect, setIsCurrentWordCorrect] = useState(true)
  const [wrongWords, setWrongWords] = useState([])
  const [correctWords, setCorrectWords] = useState([])
  const [lineTracker, setLineTracker] = useState(0)
  const [lineEnds, setLineEnds] = useState([])
  const [currentTextBlock, setCurrentTextBlock] = useState(0)
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const inputRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      if (isTimerStarted && timer > 0) {
        seTtimer(timer - 1)
      }
    }, 1000);
    if (timer == 0) {
      setIsTimerStarted(false)
      seTtimer(10)
      setCorrectWords([])
      setWrongWords([])
      setText()
      setWords()
      setButtonDisabled(false)
    }

    return () => clearInterval(interval)
  }, [isTimerStarted, timer])


  const onInputChange = (e) => {
    if (!isTimerStarted && words.length > 0) {
      setIsTimerStarted(true)
    } else if (words.length == 0) {
      alert('You must get text first')
    }

    setInputValue(e.target.value)
    const currentWordLetters = words[currentWord].split('')
    const currentWordInInput = e.target.value.replace(' ', '')
    if (currentWordInInput === words[currentWord].substr(0, currentWordInInput.length)) {
      setIsCurrentCorrect(true)
    } else if (currentWordInInput !== words[currentWord].substr(0, currentWordInInput.length || currentWordInInput == ' ')) {
      setIsCurrentCorrect(false)
    }
  }

  const onSpacePress = e => {
    if (e.nativeEvent.code == 'Space') {
      setCurrentWord(currentWord + 1)
      setInputValue('')
      if (inputValue.replace(' ', '') == words[currentWord]) {
        setTotalQuantityOfWords(totalQuantityOfWords + 1)
        // setIsCurrentWordCorrect(true)
        setCorrectWords(prev => [...prev, currentWord])
      }
      if (!isCurrentCorrect || inputValue.replace(' ', '') !== words[currentWord]) {
        // setIsCurrentWordCorrect(false)
        setWrongWords(prev => [...prev, currentWord])
      }
      if (currentWord > 0 && currentWord % 19 == 0) {
        setWords(text[currentTextBlock])
        setCurrentTextBlock(currentTextBlock + 1)
        setCorrectWords([])
        setWrongWords([])
        setCurrentWord(0)
      }
    }
  }

  const onStartClick = async () => {
    try {
      // await axios.get('https://expensive-rose-barnacle.cyclic.app/').then(res => res.data.data)
      await axios.get('https://expensive-rose-barnacle.cyclic.app/').then(res => {
        setText(res.data.data)
        setWords(res.data.data[0])
      })
      // await axios.get('http://localhost:8000/').then(res => {
      //   setText(res.data.data)
      //   setWords(res.data.data[0])
      // })
      setCurrentTextBlock(1)
      setCurrentWord(0)
      setTotalQuantityOfWords(0)
      inputRef.current.focus()
      setButtonDisabled(true)
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div className="App">
      <Header />
      {/* <Text /> */}
      <div className='text'>
        {words && words.map((word, i) => (<span key={i} className={classNames(
          { word },
          { 'test': i + 1 == correctWords.includes(i) },
          { 'test': i + 1 == currentWord && isCurrentWordCorrect || correctWords.includes(i) },
          { 'current-word': i == currentWord },
          { 'wrong': i == currentWord && !isCurrentCorrect },
          { 'wrong-word': wrongWords.includes(i) }
        )}>{word}&nbsp;</span>))}
      </div>

      <div className="bottom-part">
        <input ref={inputRef} type="text" onChange={onInputChange} value={inputValue} onKeyPress={onSpacePress} />
        <div className="timer">{timer === 60 ? '1:00' : timer > 9 ? `0:${timer}` : `0:0${timer}`}</div>
        <div className="result">Result: {isTimerStarted ? 0 : totalQuantityOfWords}</div>
        <button disabled={buttonDisabled} className="button" onClick={onStartClick}>Get new text</button>
      </div>
      <footer className="footer">
        <span>version 0.3.5</span>
        <div>
          <span>By </span><a href="https://github.com/cgf29" target='blank'>Cgf</a>
        </div>
      </footer>
    </div>
  )
}

export default App;
