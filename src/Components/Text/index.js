import React from 'react'

const Text = () => {
    return (
        <div className='text'>
            {/* {words && words.map((word, i) => (<span key={i} className={classNames(
                { word },
                { 'test': i + 1 == correctWords.includes(i) },
                { 'test': i + 1 == currentWord && isCurrentWordCorrect || correctWords.includes(i) },
                { 'current-word': i == currentWord },
                { 'wrong': i == currentWord && !isCurrentCorrect },
                { 'wrong-word': wrongWords.includes(i) }
            )}>{word}&nbsp;</span>))} */}
        </div>
    )
}

export default Text