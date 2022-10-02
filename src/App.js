import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import './style.css'

function App() {
  const [text, setText] = useState('the at there some my of be use her than and this an would first a have each make water to from which like been in or she him call is one do into who  had how time oil that by their has its it word if look now he but will two find was not up more long for what other write down on all about go day are were out see did')
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


  useEffect(() => {
    setWords(text.split(' '))
  }, [])

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
    setInputValue(e.target.value)
    const currentWordLetters = words[currentWord].split('')
    const currentWordInInput = e.target.value.replace(' ', '')
    // const currentLetter = currentWordLetters[e.target.value.length - 1]
    // setCurrentWordByLetters(prev => [...prev, currentLetter])
    // console.log(currentWordByLetters, currentLetter)
    // console.log(e.target.value, words[currentWord].substr(0, e.target.value.length))
    // console.log(currentWordInInput)
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
      if (isCurrentCorrect) {
        setIsCurrentWordCorrect(true)
      }
      setCurrentWordByLetters([])
      if (isTimerStarted && isCurrentWordCorrect) {
        setTotalQuantityOfWords(totalQuantityOfWords + 1)
        setIsCurrentWordCorrect(true)
        setCorrectWords(prev => [...prev, currentWord])
      }
      if (inputValue.length < 2 || !isCurrentCorrect) {
        setIsCurrentWordCorrect(false)
        setWrongWords(prev => [...prev, currentWord])
      }
    }
  }


  return (
    <div className="App">
      <div className='text'>
        {words.map((word, i) => (<span key={i} className={classNames(
          { word },
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
        <button className="button" onClick={() => setIsTimerStarted(!isTimerStarted)}>Start</button>
      </div>
      <footer className="footer">
        <span>version 0.1.0</span>
        <div>
          <span>By </span><a href="https://github.com/cgf29" target='blank'>Cgf</a>
        </div>
      </footer>
    </div>
  )
}

export default App;
