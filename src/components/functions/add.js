const addLoop = (arrayLoop) =>{
    var sum = 0;
    for(var i = 0; i < arrayLoop.length; i++)
    {
            sum += arrayLoop[i];  
    }
    return(sum);          
}
export default addLoop