import { useEffect, useState } from "react";
import { Row, Col, Input, Button, Card, Typography } from "antd";
import "./App.css";
function App() {
  const [memorizedWords, setMemorizedWords] = useState<string[]>([]);
  const [unMemorizedWords, setUnMemorizedWords] = useState<string[]>([]);
  const [wordsToPlay, setWordsToPlay] = useState<string[]>([]);
  const [checkedWords, setCheckedWords] = useState<string[]>([]);

  const handleOnWordClicked = (word: string) => {
    if (checkedWords.includes(word)) {
      setCheckedWords(checkedWords.filter((e) => e != word));
    } else {
      setCheckedWords([...checkedWords, word]);
    }
  };

  const [areaText, setAreaText] = useState<string>("");
  const handleAddMoreWords = (plainText: string, wordsInPlay: string[]) => {
    let cleanedText = plainText.replace(/[^\w\s]/g, "");
    cleanedText = cleanedText.replace(/\d+/g, "");
    const words = cleanedText
      .split(/\s+/)
      .filter(
        (e) =>
          wordsInPlay.findIndex((o) => o == e) == -1 &&
          e.trim() &&
          !memorizedWords.includes(e)
      );
    setWordsToPlay([...words, ...wordsToPlay]);
    setAreaText('')
  };

  const handleOnDone = () => {
    const memo = [...memorizedWords, ...checkedWords];
    setMemorizedWords(memo);
    localStorage.setItem("memorized", JSON.stringify(memo));
    const unMemo = [
      ...unMemorizedWords,
      ...wordsToPlay.filter((e) => !checkedWords.includes(e)),
    ];
    setUnMemorizedWords(unMemo);
    localStorage.setItem("unMemorized", JSON.stringify(unMemo));
    setWordsToPlay([])

  };
  const [wordsLaterText, setWordsLaterText] = useState<string>('')
  
  const handleOnLater = (plainText: string)=>{
    let cleanedText = plainText.replace(/[^\w\s]/g, "");
    cleanedText = cleanedText.replace(/\d+/g, "");
    const words = cleanedText
      .split(/\s+/)
      .filter(
        (e) =>  e.trim() &&
          !memorizedWords.includes(e)
      );
    const unMemo = [
      ...words,
      ...unMemorizedWords,
    ];
    setUnMemorizedWords(unMemo);
    localStorage.setItem("unMemorized", JSON.stringify(unMemo));
    setWordsLaterText('')

  }

  useEffect(() => {
    const storage = localStorage.getItem("memorized");
    setMemorizedWords(
      storage != null && Array.isArray(JSON.parse(storage))
        ? JSON.parse(storage)
        : []
    );
    const storage2 = localStorage.getItem("unMemorized");
    setUnMemorizedWords(
      storage2 != null && Array.isArray(JSON.parse(storage2))
        ? JSON.parse(storage2)
        : []
    );
  }, []);


  const [showMemorized, setShowMemorized] = useState(false)
  const [showUnMemorized, setShowUnMemorized] = useState(false)

  return (
    <>
      <Row gutter={[12, 12]}>
        <Col span={12}>
          <Row gutter={[12, 12]} justify={'center'}>
            <Col span={24}>
              {wordsToPlay.map((word) => (
                <button
                  onClick={() => handleOnWordClicked(word)}
                  style={{
                    backgroundColor: checkedWords.includes(word)
                      ? "#ff652f"
                      : "gray",
                    margin: "4px",
                  }}
                  key={word}
                >
                  {word}
                </button>
              ))}
            </Col>
            <Col span={24}>
              {wordsToPlay.length > 0 && 
              <Button onClick={() => handleOnDone()}>Done!</Button>
              }
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <Typography.Title style={{ color: 'white' }}>Filter Words</Typography.Title>
            </Col>
            <Col span={24}>
              <Input.TextArea
                style={{ width: "100%" }}
                multi-line
                value={areaText}
                onChange={(e) => setAreaText(e.target.value)}
              ></Input.TextArea>
            </Col>
            <Col span={24}>

              <Button onClick={() => handleAddMoreWords(areaText, wordsToPlay)}>
                add more words
              </Button>
            </Col>
          </Row>

        </Col>
        <Col offset={12} span={12}>
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <Typography.Title style={{ color: 'white' }}>Filter Words</Typography.Title>
            </Col>
            <Col span={24}>
              <Input.TextArea
                style={{ width: "100%" }}
                multi-line
                value={wordsLaterText}
                onChange={(e) => setWordsLaterText(e.target.value)}
              ></Input.TextArea>
            </Col>
            <Col span={24}>

              <Button onClick={() => handleOnLater(wordsLaterText)}>
                Add To Learn Later 
              </Button>
            </Col>
          </Row>

        </Col>
      </Row>
      <div style={{ height: '50px' }}>

      </div>
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Card onClick={() => setShowUnMemorized(!showUnMemorized)} title={<span style={{ color: 'white', cursor: 'pointer' }}>Un Memorized </span>} style={{ backgroundColor: 'black' }}>
            {showUnMemorized && <div>
              {unMemorizedWords.map((word) => (
                <span style={{ color: "white" }}>{word}, </span>
              ))}
            </div>}

          </Card>

        </Col>
        <Col span={24}>
          <Card onClick={() => setShowMemorized(!showMemorized)} title={<span style={{ color: 'white', cursor: 'pointer' }}>MemorizedWords</span>} style={{ backgroundColor: 'black' }}>

            {showMemorized && <div>
              {memorizedWords.map((word) => (
                <span style={{ color: "white" }}>{word}, </span>
              ))}
            </div>}
          </Card>

        </Col>
      </Row>


    </>
  );
}

export default App;
