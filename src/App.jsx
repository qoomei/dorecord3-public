import { useEffect, useState } from 'react'

import GoogleLogin from './components/GoogleLogin'
import Content from './components/Content'
import Spinner from './components/Spinner'

function App() {
  const [account, setAccount] = useState(null)
  const [waitLogin, setWaitLogin] = useState(false)

  //////////////////////////////////////////////////
  // ログイン結果待ち
  const doLogin = (b) => {
    setWaitLogin(b)
  }

  //////////////////////////////////////////////////
  // ログアウトならログイン待ちを解除
  useEffect(() => {
    if (account !== null) {
      setWaitLogin(false)
    }
  }, [account])

  return (
    <div>
      {account !== null ? (
        <Content account={account} setAccount={setAccount} />
      ) : (
        <GoogleLogin setAccount={setAccount} doLogin={doLogin} />
      )}
      <Spinner show={waitLogin} />
    </div>
  )
}

export default App
