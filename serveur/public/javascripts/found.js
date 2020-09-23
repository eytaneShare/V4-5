function getUser(callBack) {
  
    global.dbo.collection("users").find().toArray(function (err, result) {
      if (err) throw err;
      //console.log(result);
     
      
      return callBack(result)
    });
}

  
module.exports = {
  getUser
}