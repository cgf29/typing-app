import axios from 'axios'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import './style.css'

function App() {
  const [text, setText] = useState('the at there some my of be use her than and this an would first a have each make water to from which like been in or she him call is one do into who had how time oil that by their has its it word if look now he but will two find was not up more long for what other write down on all about go day are were out see did more long for what other write down on all about go day are were out see did all about go day are were out see did more long for what other write down on all about go day are were out see did')
  const [inputValue, setInputValue] = useState('')
  const [words, setWords] = useState([])
  const [currentWord, setCurrentWord] = useState(0)
  const [currentWordByLetters, setCurrentWordByLetters] = useState([])
  const [isCurrentCorrect, setIsCurrentCorrect] = useState(true)
  const [timer, seTtimer] = useState(60)
  const [isTimerStarted, setIsTimerStarted] = useState(false)
  const [totalQuantityOfWords, setTotalQuantityOfWords] = useState(0)
  const [isCurrentWordCorrect, setIsCurrentWordCorrect] = useState(true)
  const [wrongWords, setWrongWords] = useState([])
  const [correctWords, setCorrectWords] = useState([])
  const [lineTracker, setLineTracker] = useState(0)


  // useEffect(() => {
  //   setWords(text.split(' '))
  // }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (isTimerStarted && timer > 0) {
        seTtimer(timer - 1)
      }
    }, 1000);
    if (timer == 0) {
      setIsTimerStarted(false)
      seTtimer(60)
      setCurrentWord(0)
      setCorrectWords([])
      setWrongWords([])
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
    // const currentLetter = currentWordLetters[e.target.value.length - 1]
    // setCurrentWordByLetters(prev => [...prev, currentLetter])
    // console.log(currentWordByLetters, currentLetter)
    // console.log(e.target.value, words[currentWord].substr(0, e.target.value.length))
    // console.log(currentWordInInput)
    console.log(currentWordInInput, words[currentWord])
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

      if (isCurrentCorrect && inputValue.replace(' ', '') == words[currentWord]) {
        setTotalQuantityOfWords(totalQuantityOfWords + 1)
        setIsCurrentWordCorrect(true)
        setCorrectWords(prev => [...prev, currentWord])
      }
      if (inputValue.length < 2 || !isCurrentCorrect || inputValue.replace(' ', '') !== words[currentWord]) {
        setIsCurrentWordCorrect(false)
        setWrongWords(prev => [...prev, currentWord])
      }

      if (words.slice(lineTracker, currentWord).join(' ').length > 42 && words.slice(lineTracker, currentWord).join(' ').length < 47) {
        setLineTracker(currentWord)
        console.log(words.slice(lineTracker, currentWord).join(' ').length)
        if (lineTracker > 30) {
          setCorrectWords([])
          setWrongWords([])
          setCurrentWord(0)
          setWords(words.slice(currentWord + 1, words.length))
          console.log(words.slice(currentWord + 1, words.length))
        }
      }
    }
  }

  const onStartClick = () => {
    const randomWords = axios.get('https://expensive-rose-barnacle.cyclic.app/').then(res => console.log(res))
    setWords(text.split(' '))
  }


  return (
    <div className="App">
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
        <input type="text" onChange={onInputChange} value={inputValue} onKeyPress={onSpacePress} />
        <div className="timer">{timer === 60 ? '1:00' : timer > 9 ? `0:${timer}` : `0:0${timer}`}</div>
        <div className="result">Result: {isTimerStarted ? 0 : totalQuantityOfWords}</div>
        <button className="button" onClick={onStartClick}>Get new text</button>
      </div>
      <footer className="footer">
        <span>version 0.2.1</span>
        <div>
          <span>By </span><a href="https://github.com/cgf29" target='blank'>Cgf</a>
        </div>
      </footer>
    </div>
  )
}

export default App;
