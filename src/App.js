import React, { useState } from 'react';
import './App.css';
import {numbers, upperCaseLetters, lowerCaseLetters, specialCharacters} from './Characters';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Copy_Success } from './Message';


function App() {

  const [password, setPassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(20)
  const [IncludeUppercase, setIncludeUppercase] = useState(false)
  const [IncludeLowercase, setIncludeLowercase] = useState(false)
  const [IncludeNumbers, setIncludeNumbers] = useState(false)
  const [IncludeSymbols, setIncludeSymbols] = useState(false)

  const GeneratePassword = (e) => {
    if(!IncludeUppercase && !IncludeLowercase && !IncludeNumbers && !IncludeSymbols) {
      notify('Select an Option',true)
    }
    let characterList = ''

    if(IncludeLowercase) {
      characterList = characterList + lowerCaseLetters
    }

    if(IncludeUppercase) {
      characterList = characterList + upperCaseLetters
    }

    if (IncludeNumbers) {
      characterList = characterList + numbers
    }

    if (IncludeSymbols) {
      characterList = characterList + specialCharacters
    }

    setPassword(createPassword(characterList))
  }

  const createPassword = (characterList) => {
    let password = ''
    const characterListLength = characterList.length

    for(let i=0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
    }
    return password
  }

  const copyToClipboard= () => {
    const newTextArea = document.createElement('textarea')
    newTextArea.innerText = password
    document.body. appendChild(newTextArea)
    newTextArea.select()
    document.execCommand('copy')
    newTextArea.remove()
  }

  const notify = (Message, hasError = false) => {
    if(hasError){
      toast.error(Message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    }else {
      toast(Message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    }
  }

  const handleCopyPassword = (e) => {
    if(password === '') {
      notify('Nothing to Copy', true)
    } else {
    copyToClipboard()
    notify(Copy_Success)
    }
  }

  return (
    <div className="App">
      <div className='container'>
        <div className='generator'>
          <h2 className='generator_header'>
            Password Generator
          </h2>
          <div className='generator_password'>
            <h3>{password}</h3>
            <button onClick={handleCopyPassword} className='copy_btn'>
            <i className='far fa-clipboard'></i>
            </button>
          </div>

          <div className='form-group'>
            <label htmlFor='password-strength'>Password Length></label>
            <input defaultValue={passwordLength} onChange={(e) => setPasswordLength(e.target.value)} type='number' id='password-strength' name='password-strength' max='20' min='10' />
          </div>

          <div className='form-group'>
            <label htmlFor='uppercase-letters'>Include Uppercase Letters></label>
            <input checked={IncludeUppercase} onChange={(e) => setIncludeUppercase (e.target.checked)} type='checkbox' id='uppercase-letter' name='uppercase-letter' />
          </div>

          <div className='form-group'>
            <label htmlFor='lowercase-letters'>Include Lowercase Letters></label>
            <input checked={IncludeLowercase} onChange={(e) => setIncludeLowercase (e.target.checked)} type='checkbox' id='lowercase-letter' name='lowercase-letter' />
          </div>

          <div className='form-group'>
            <label htmlFor='include numbers'>Include Numbers></label>
            <input checked={IncludeNumbers} onChange={(e) => setIncludeNumbers (e.target.checked)} type='checkbox' id='include numbers' name='include numbers' />
          </div>

          <div className='form-group'>
            <label htmlFor='include symbols'>Include Symbols></label>
            <input checked={IncludeSymbols} onChange={(e) => setIncludeSymbols (e.target.checked)} type='checkbox' id='include symbols' name='include symbols' />
          </div>

          <button onClick={GeneratePassword} className='generator_btn'>Generate Password</button>

          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />

        </div>
      </div>
    </div>
  );
}

export default App;
