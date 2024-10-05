import { useCallback, useEffect, useRef, useState } from "react"


function App() {
  const [length, setLength] = useState(8)  
  const [numTrue, NumFalse] = useState(false)
  const [charTrue, charFalse] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numTrue) str += "0123456789"
    if(charTrue) str += "!@#$%^&"

    for(let i=1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numTrue, charTrue, setPassword])

  const copyPassToClipBoard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,8)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,numTrue,charTrue])

  return (
    <>
      
      <div className="max-w-md mx-auto rounded-lg px-8 py-2 text-orange-500 bg-gray-800">
      <h1 className="text-white text-4xl text-center mb-6">Password Generator</h1>
        <div className="flex mb-6 overflow-hidden rounded-lg">
        <input 
        type="text"
        value={password}
        className="outline-none w-full py-2 px-4"
        placeholder="Password"
        ref={passwordRef}
        readOnly
        />
        <button className="ml-2 bg-orange-500 text-white px-2 
        font-normal"
        onClick={copyPassToClipBoard}
        >Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input 
            type="range" 
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            defaultChecked={numTrue}
            id="numIn"
            onChange={()=>{
              NumFalse((prev)=>!prev);
            }} 
            />
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            defaultChecked={charTrue}
            id="charIn"
            onChange={()=>{
              charFalse((prev)=>!prev);
            }} 
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
