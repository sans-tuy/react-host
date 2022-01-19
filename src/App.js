import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import List from './List';

import {BrowserRouter, Link, useParams, Route, Routes} from 'react-router-dom'
import reactDom from 'react-dom';

function  Identity(props){
  return <span>Gelar nya {props.gelar}</span>
}

function Age(props){
  return <b>Umurnya {props.umur} </b>
}

// membuat komponen fungsi dengan nilai properti
function Greet(props){
  return (
    <div>
        <h2>Halo {props.name} - <Identity gelar={props.gelar} /></h2>
        <h3><Age umur={props.umur} /> </h3>
    </div>
    );
}

class Time extends Component{
  constructor(props){
    super(props)
    this.state = {
      time : props.start
    }
  }

  // menjalankan program ketika komponen selesai disetup
  componentDidMount(){
    this.addInterval = setInterval( () => this.increase(), 1000);
  }

  increase(){
    // update state time tiap detik
    this.setState((state, props) => ({
      time: parseInt(state.time) + 1
    }))
  }

  // dijalankan ketika program tidak dipakai lagi 
  componentWillUnmount(){
    clearInterval(this.addInterval);
  }

  render(){
    return (
      <div>{this.state.time} Detik</div>
    );
  }
}

// membuat komponen event klik dengan function 
function Clicker(){
  // event click
  function Click(e){
    // menampilkan alert message
    alert('Tombol ditekan');
    // mencegah proses reload
    e.preventDefault();
  }

  return (
    <a href="#" onClick={Click} >Click me</a>
  )
}

// membuat komponen event toggle dengan class
class Toggle extends Component{
  constructor(props){
    super(props);
    this.state = {
      toggleStatus : true
    }

    // menggunakan arrow function untuk menghindari penggunaan .bind(this)
    //  cara pertama : this.Click = this.Click.bind(this)
  }

  // cara pertama : 
  // Click(){
  //   this.setState((state) => ({
  //     toggleStatus: !state.toggleStatus
  //   }))
  // }

  // cara kedua :
  Click = () => {
    this.setState((state) => ({
      toggleStatus: !state.toggleStatus
    }))
  }

  render(){
    return(
      <button type="button" onClick={this.Click} >
        {this.state.toggleStatus? "ON": "OFF"}
      </button>
    )
  }
}

// membuat todo list
class Todo extends Component{
  constructor(props){
    super(props);
    // mendeklarasikan state
    this.state = {
      items     : [],
      tempItems : ''
    }
  }

  // membuat fungsi handle submit ketika nilai disubmit oleh user
  handleSubmit = (event) => {
    // mencegah perilaku bawaan form seperti reload
    event.preventDefault();
    // menambahkan items baru kedalam state items sekaligus menghapus tempItems
    this.setState(({
      items     : [...this.state.items, this.state.tempItems],
      tempItems : ''
    }))
  }

  // membuat fungsi handle change yang diolah ketika ada perubahan nilai pada input
  handleChange = (event) => {
    // menguodate nilai tempItems dengan nilai yang ada di input form
    this.setState(({
      tempItems: event.target.value
    }))
    console.log(this.state.tempItems);
  }

  render(){
    return (
      <div>
        {/* membuat form counter */}
        <form onSubmit={this.handleSubmit} >
          <input value={this.state.tempItems} onChange={this.handleChange} />
          <button>Add</button>
        </form>
        {/* memanggil fungsi List di file List.js untuk menampilkan hasil data todolist dalam <li> */}
        <List items={this.state.items} />
        <Api />
      </div>
    )
  }
}

class Api extends Component{
  constructor(props){
      super(props)
      this.state = {
          items: [],
          isLoading: true
      };
  }

  componentDidMount(){
      // mengambil data api
      const url = 'https://jsonplaceholder.typicode.com/users';
      fetch(url)
        .then(response => response.json())  //mengubah response menjadi json
        .then(data => this.setState({items: data, isLoading: false})) //mengubah state dengan data api
  };

  render(){
    // membuat shortcut penulisan agar tidak perlu diawali dengan this.state
    const {items, isLoading} = this.state;
    // menampilkan teks loading
    if(isLoading === true){
      return (
        <p>Loading ....</p>
      )
    }

    return (
      <div>
        {/* mencetak isi api nama */}
        <ul>
          { 
            items.map((item, index) => { return <li key={index} >{item.name} </li>})
          }
        </ul>
      </div>
    );
  }
}

// membuat routing dynamic dengan react
// fungsi untuk handle path home
function Home() {
  return (
    <h2>Ini Halaman Home</h2>
  )
}   

// fungsi untuk handle path Users
function Users() {
  return (
    <div>
      <h2>Ini halaman Users</h2>
      <Link to='/users/anwar' >Anwar</Link> <br/>
      <Link to='/users/sanusi' >Sanusi</Link>
    </div>
  )
}

// fungsi untuk handle path yang tidak terdaftar
function NotMatch() {
  return (
    <div>
      <p>404 , Halaman not found</p>
    </div>
  )
}

// fungsi untuk handle path sub users
function DetailUsers() {
  // menggunakan hook useParams() untuk oper props kedalam variabel name
  let name = useParams()
  return (
    // mengambil nilai props match
    <h2>Ini Halaman {name.match} </h2>
  )
} 
// membuat class single page application 
class Spa extends Component{
  
  render(){
    return (
      // membuat routing
      <BrowserRouter>
        <div>
          {/* membuat navbar dengan hook Link pengganti tag <a> di html */}
          <nav>
            <li><Link to='/' >Home</Link></li>
            <li><Link to='/users' >User</Link></li>
          </nav>

          <main>
            {/* mengolah routing dari navbar */}
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/users' element={<Users/>} />
              <Route path='/users/:match' element={<DetailUsers />} />
              <Route path='*' element={<NotMatch/>} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    )
  }
}

function Table(){
  return(
    // sebagai pengganti parent jsx selain <div> dan <span>
    // <React.Fragment> </React.Fragment> bisa diganti dengan <> </>
    // <React.Fragment key=> </React.Fragment> perbedaanya ini bisa diberi key untuk looping
    <React.Fragment> 
      <td>baris pertama</td>
      <td>baris kedua</td>
    </React.Fragment>
  )
}

class Test extends Component{

  render(){
    return(
      <table>
        <tr>
          <Table />
        </tr>
      </table>
    )
  }
}

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Greet name='anwar sanusi' gelar='S.KOM' umur='20' />
        <Time start="0" />
      </header> */}
      <Clicker />
      <Toggle />
      <Todo />
      <Api />
      <Spa />
      <Test />
    </div>
  );
}

export default App;
