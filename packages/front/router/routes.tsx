import { About } from 'front/views/screens/about'
import { SignIn } from 'front/views/screens/account/sign-in'
import { SignUp } from 'front/views/screens/account/sign-up'
import { Home } from 'front/views/screens/home'

import { Route, Router, Routes } from '.'

export default function () {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </Router>
  )
}
