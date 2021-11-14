import { useEffect, useState } from "react"
import { Image, Col } from 'react-bootstrap';

const Company = ({ facade }) => {
  const [cat, setCat] = useState({ url: '' })
  const [voice, setVoice] = useState({ url: '', fact: '' })

  const updateVoice = (data) => {
    let parsedData = JSON.parse(data)
    setVoice({ url: parsedData.url, fact: parsedData.fact })
  }

  const voicePlay = () => {
    let audio = new Audio(voice.url)
    audio.play()
  }

  const updateCatPic = (data) => {
    let parsedData = JSON.parse(data)
    console.log("DATA: " + data)
    setCat({ url: parsedData[0].url })
  };

  useEffect(() => {
    facade.fetchData('cat/user', updateCatPic)
    facade.fetchData('cat/voice', updateVoice)
  }, [facade])

  return (
    <div>
      <Image src={cat.url} alt={cat.url} fluid className="mb-4" />
      <p>{voice.fact}</p>
      <p><button onClick={voicePlay}>PLAY AUDIO</button></p>
    </div>
  )
}

export default Company
