import Head from 'next/head'
import Image from 'next/image'
import Card from '../components/Card'
import Table from '../components/Table'
import TopHeader from '../components/TopHeader'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <TopHeader />
      <Card />
      <Table />
    </div>
  )
}
