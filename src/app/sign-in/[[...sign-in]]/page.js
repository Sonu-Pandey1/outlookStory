import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <div className='d-flex justify-content-center align-items-center p-5'>
    <SignIn  />
  </div>
}
// signInUrl='/dashboard'