import { useEffect, useState } from 'react';
import { 
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaLock,
  FaPhone
 } from 'react-icons/fa';

 
 function App() {
   const url = 'https://randomuser.me/api/?results=10';
   const defaultImage = 'https://randomuser.me/api/portraits/men/23.jpg';

   //setting up state
   const [isLoading, setIsLoading] = useState(true);
   const [userProfiles, setUserProfiles] = useState([]);
   const [title, setTitle] = useState('name');
   const [indexValue,setIndexValue]=useState(0);
  

   //fetching data from the API

   const fetchUserProfile = async () => {
     setIsLoading(true);
     const response = await fetch(url);
     const data = await response.json();
     const persons = data.results;
    

    //fetching a new random profile

     setUserProfiles(persons);
     setIsLoading(false);
    
   };

   useEffect(() => {
     fetchUserProfile();
   }, []);




  const handleButtonIcon=e=>{
    if(e.target.classList.contains('icon')) {
        const newValue = e.target.dataset.id;
        setTitle(newValue);
    }
}
   const handleValue = () => {
    const person=  userProfiles[indexValue];
    const {
        phone,
        email,
        name: { first, last },
        dob: { age },
        location: {
          street: { number, name }
        },
        login: {password}
      } = person;
     if(title) {
         switch(title){
             case 'name':
                 return <p className='user-value'>{ first + ' ' + last}</p>
                 case 'email':
                    return <p className='user-value'>{email}</p>
                    case 'age':
                 return <p className='user-value'>{age}</p>
                 case 'phone':
                 return <p className='user-value'>{phone}</p>
                 case 'password':
                 return <p className='user-value'>{password}</p>
                 case 'street':
                 return <p className='user-value'>{name+', '+number}</p>
                 default: return ''
         }
     }
   }

// Implementing functionality for next and previous buttons

    function onNextButton(){
    if(indexValue + 1 === userProfiles.length ) {
        setIndexValue(0)
    }
    else {
        setIndexValue(indexValue + 1)
    };
    }
    function onPreviousButton(){
        if(indexValue - 1 === -1) {setIndexValue(userProfiles.length - 1)}
        else setIndexValue(indexValue-1)
    }


function getPersonaData(index){
    

    const person=  userProfiles[index];
    if (!person) return <></>;
    
    const {
        
        picture: { large: image },
        
      } = person;
    return <div className='container'>
    <img
      src={(person && image) || defaultImage}
      alt='random user'
      className='user-img'
    />
    <p className='user-title'>my {title} is</p>
    {handleValue()}
    <div className='values-list'>
      <button className='icon' data-id='name' onMouseOver={handleButtonIcon}>
        <FaUser />
      </button>
      <button className='icon' data-id='email' onMouseOver={handleButtonIcon}>
        <FaEnvelopeOpen />
      </button>
      <button className='icon' data-id='age' onMouseOver={handleButtonIcon}>
        <FaCalendarTimes />
      </button>
      <button className='icon' data-id='street' onMouseOver={handleButtonIcon}>
        <FaMap />
      </button>
      <button className='icon' data-id='phone' onMouseOver={handleButtonIcon}>
        <FaPhone />
      </button>
      <button
        className='icon'
        data-id='password'
        onMouseOver={handleButtonIcon}
      >
        <FaLock />
      </button>
    </div>
    
  </div>
}


//paasing data to be viewed on the browser
   return(
       
    <main>
    <div className='block bcg-black'></div>
    <div className='block'>
      {getPersonaData(indexValue)}
      <button className='btn float-right' type='button' onClick={onNextButton}>
          NEXT
        </button>
        <button className='btn float-left' type='button' onClick={onPreviousButton}>
          PREVIOUS
        </button>
      <button className='btn' type='button' onClick={fetchUserProfile}>
          {isLoading ? 'loading...' : 'Generate users'}
        </button>
    </div>
  </main>
   )
 }

 export default App;