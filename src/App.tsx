import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [memorizedWords, setMemorizedWords] = useState<string[]>([]);
  const [unMemorizedWords, setUnMemorizedWords] = useState<string[]>([]);
  const [wordsToPlay, setWordsToPlay] = useState<string[]>([]);
  const [checkedWords, setCheckedWords] = useState<string[]>([]);

  const handleOnWordClicked = (word : string)=>{
    if(checkedWords.includes(word)){
      setCheckedWords(checkedWords.filter((e)=> e!= word))
    } else {
      setCheckedWords([...checkedWords, word])
    }
  }

  const [areaText, setAreaText]  = useState<string>('')
  const handleAddMoreWords = (plainText : string, wordsInPlay : string[])=>{
    let cleanedText = plainText.replace(/[^\w\s]/g, '');
    cleanedText = cleanedText.replace(/\d+/g, '');
    const words = cleanedText.split(/\s+/).filter((e)=> wordsInPlay.findIndex(o=> o == e ) == -1 && e.trim() && !memorizedWords.includes(e))
      setWordsToPlay([...words,...wordsToPlay])

  }

  const handleOnDone  = ()=>{
    const memo = [...memorizedWords, ...checkedWords]
    setMemorizedWords(memo)
    localStorage.setItem('memorized', JSON.stringify(memo))
    const unMemo =[...unMemorizedWords, ...wordsToPlay.filter(e=> !checkedWords.includes(e))]
    setUnMemorizedWords(unMemo)
    localStorage.setItem('unMemorized', JSON.stringify(unMemo))

  }

  useEffect(()=>{
    const storage = localStorage.getItem('memorized') 
    setMemorizedWords(storage != null && Array.isArray(JSON.parse(storage)) ? JSON.parse(storage)  : [])
    const storage2 = localStorage.getItem('unMemorized') 
    setUnMemorizedWords(storage2 != null && Array.isArray(JSON.parse(storage2)) ? JSON.parse(storage2)  : [])
  },[])

  
  return (
    <>
    <h5>Memorized</h5>
    <div>
      {memorizedWords.map((word)=>(<span style={{color : 'white'}}>{word}, </span>))}
    </div>
    <h5>To study</h5>
    <div>
      {unMemorizedWords.map((word)=>(<span style={{color : 'white'}}>{word}, </span>))}
    </div>
      <div>
        {wordsToPlay.map((word) => (
          <button onClick={()=>handleOnWordClicked(word)} style={{backgroundColor: checkedWords.includes(word) ? '#ff652f' : 'gray', margin : '4px'}}  key={word}>{word}</button>
        ))}
      </div>
      <div>
        <button onClick={()=> handleOnDone()}>Done!</button>
      </div>
      <div>
        <textarea value={areaText} onChange={(e)=>setAreaText(e.target.value)}>

        </textarea>
        <button onClick={()=> handleAddMoreWords(areaText, wordsToPlay)}>
          add more words
        </button>
      </div>
    </>
  );
}

export default App;
