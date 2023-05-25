import '@/components/Counter'
import { count } from 'console'
'use server'
const Hello=(props)=>{
  console.log(props)
  const {name,age}=props
 
  return(
  <>
   {/* <p1>Hello {props.name},you're {props.age}years old.</p1> */}
   <p1>Hello {name},you're {age}years old.</p1>

</>
  )
}



export default function Home() {
  const now = new Date();
  const friends=[
    {name:'Nabin',age:20},
    {name:'Vishwamitra',age:250000},
    {name:'Saurav',age:25}

  ]
  // const name='Nirajan'
 return (
< div>
  <h1>  Welocme to React</h1>
  <p> It is {now.toString()}.</p>

  {/* <Hello name={friends} age={20}/> */}


  {
  friends.map(friends =>
  <Hello name={friends.name} age={friends.age}/>
  )
}
{count}
  {/* <Hello/> */}
  </div>

  )
}
