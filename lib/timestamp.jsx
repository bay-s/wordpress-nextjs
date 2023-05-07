function formatDate(timez) {

    const times = timez
    const previous = new Date(times)
    const current = new Date()
  
      let msPerMinute = 60 * 1000;
      let msPerHour = msPerMinute * 60;
      let msPerDay = msPerHour * 24;
      let  msPerMonth = msPerDay * 30;
      let msPerYear = msPerDay * 365;
  
     let elapsed = current - previous;
  
      if (elapsed < msPerMinute) {
           return Math.round(elapsed/1000) + ' seconds ago';   
      }
      else if (elapsed < msPerHour) {
           return Math.round(elapsed/msPerMinute) + ' minutes ago';   
      }
      else if (elapsed < msPerDay ) {
           return Math.round(elapsed/msPerHour ) + ' hours ago';   
      }
      else if (elapsed < msPerMonth) {
          return `${Math.round(elapsed/msPerDay)} days ago`;   
      }
  
      else if (elapsed < msPerYear) {
          return `${Math.round(elapsed/msPerMonth)}  months ago`;   
      }else {
          return  `${Math.round(elapsed/msPerYear )} years ago`;   
      }
    }
    
    export default formatDate 
    
  
    