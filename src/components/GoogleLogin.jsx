import logo from '../logo.svg'
import '../App.css'

import { db } from './firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import { getAuth, signInWithRedirect, getRedirectResult, GoogleAuthProvider } from 'firebase/auth'
import { useState, useEffect } from 'react'

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  // 自動ログイン回避のため
  prompt: 'select_account',
})

const auth = getAuth()

function GoogleLogin(props) {
  const [email, setEmail] = useState(null)
  const [account, setAccount] = useState(null)
  const [classSign, setClassSign] = useState('google-login')

  //////////////////////////////////////////////////
  // googleログイン
  const onSignIn = (e) => {
    // サインインボタンフラッシュ
    setClassSign('google-login tap')
    setTimeout(() => {
      setClassSign('google-login')
    }, 50)

    signInWithRedirect(auth, provider)
  }

  //////////////////////////////////////////////////
  // googleログイン情報取得
  useEffect(() => {
    props.doLogin(true)

    getRedirectResult(auth)
      .then((result) => {
        props.doLogin(false)
        setEmail(auth.currentUser.email)
      })
      .catch((error) => {
        props.doLogin(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //////////////////////////////////////////////////
  // googleにログインしたら
  useEffect(() => {
    if (email !== null) {
      // アカウント情報取得
      // getAccount();

      // 公開バージョン
      setAccount('パブリック')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email])

  //////////////////////////////////////////////////
  // アカウント情報取得
  const getAccount = async () => {
    const colRef = collection(db, 'account')
    getDocs(colRef).then((snapshot) => {
      snapshot.forEach((document) => {
        const doc = document.data()

        for (let key of Object.keys(doc)) {
          if (email === doc[key]) {
            setAccount(document.id)
          }
        }
      })
    })
  }

  //////////////////////////////////////////////////
  // アカウントが取得できたら
  useEffect(() => {
    props.setAccount(account)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="container">
        <div className="text-center">
          <button className={classSign} onClick={onSignIn}>
            <svg aria-hidden="true" width="32" height="32" viewBox="0 0 18 18">
              <path
                d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 002.38-5.88c0-.57-.05-.66-.15-1.18z"
                fill="#4285F4"
              ></path>
              <path
                d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 01-7.18-2.54H1.83v2.07A8 8 0 008.98 17z"
                fill="#34A853"
              ></path>
              <path d="M4.5 10.52a4.8 4.8 0 010-3.04V5.41H1.83a8 8 0 000 7.18l2.67-2.07z" fill="#FBBC05"></path>
              <path
                d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 001.83 5.4L4.5 7.49a4.77 4.77 0 014.48-3.3z"
                fill="#EA4335"
              ></path>
            </svg>
            <span>Googleアカウントでサインイン</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default GoogleLogin
