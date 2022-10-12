let imgs=[];




const imageSlider=document.getElementById('img-con');

let count=0;


//api_key=live_f3nb4aoarHr4fXGONfAt9dpu4w7Do4MZvvRAqfqb39aBj4TvxaOlTU0033KikhCw
fetch("https://api.thedogapi.com/v1/images/search?limit=11",{mode:"cors"}
  )
  .then((res)=>{
     return res.json()
  })
 
  .then((response)=>{
     
      response.forEach(el => {
          imgs.push(el.url)
         
      })
     
       //events

        
       CHANGESLIDE.displayImg(count);
       document.getElementById('right').addEventListener('click',CHANGESLIDE.forward);
       document.getElementById('left').addEventListener('click',CHANGESLIDE.backward);
       document.querySelector(".navigation").addEventListener('click',navigation.clickCircle);

      navigation.createNav();
      navigation.circles();

       // every five second image should change

       
           setInterval(function() {
               CHANGESLIDE.forward()
           }, 7000);
    
  })

  .catch((err)=>{
   console.log(err)
 })

  


 
const CHANGESLIDE=(function(){
    
    //display img on load
     const displayImg=(counts)=>{
        imageSlider.innerHTML=""
        const imgsx=document.createElement('img');
        imgsx.src=imgs[counts];
        navigation.circles()
        imageSize(imgsx);
        imageSlider.appendChild(imgsx);
        
     };
     
     //on click move slide forwad
      const forward=()=>{
        
        count++
        restart()
         imageSlider.innerHTML=""
        const imgsx=document.createElement('img');
        imgsx.src=imgs[count];
        navigation.circles(count)
        imageSize(imgsx);
        imageSlider.appendChild(imgsx);
     
   
        
      }
            //on click move slide backword
      const backward=()=>{
        
          count<=0? count=imgs.length-1:count--;
         imageSlider.innerHTML=""
         const imgsx=document.createElement('img');
           imgsx.src=imgs[count];
           navigation.circles(count)
           imageSize(imgsx)
           imageSlider.appendChild(imgsx)
            
        
      }
      //adjust image to fit frame
      const imageSize=(prop)=>{

            prop.style.width='100%';
            prop.style.height='100%';

      }
       //when images are done sliding start again
      const restart=()=>{

         if(count>=imgs.length){
             count=0;
         };
         
      };

      return{forward,backward,displayImg,imageSize};
})();

    // navigations
const navigation=(function(){
      const navigation=document.querySelector('.navigation');
        //dynamically display the nav 
  const createNav=()=>{
        navigation.innerHTML=""

                imgs.filter((el,index)=>{
                    const div=document.createElement('div');
                    div.id=index
                        div.classList.add("circles")
                    navigation.appendChild(div)
                });
        
        

  };
         //turn background color to white when image moves
     const circles=()=>{
         document.querySelectorAll('.circles').forEach(el=>{
               if(el.id==count){
                el.style.backgroundColor='white'
               }else{
                el.style.backgroundColor='transparent'
               }
           
         });

     }
         //when click display the respective image

     const clickCircle=(e)=>{

          const ID=e.target.id
          if(e.target.id){
            count=ID
            CHANGESLIDE.displayImg(ID)
          };

    };

  return{
     createNav,
     circles,
     clickCircle
  }
})()

// onclick backward image shech change




