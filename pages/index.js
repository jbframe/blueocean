import Head from 'next/head';
import styles from '../styles/Home.module.css';
import SignUp from '../components/signup/signup.js';

export default function Home() {
  return (
    <div>
        <SignUp />
    </div>
  )
}
