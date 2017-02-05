export function getTlData(callback){
  $.ajax({
    url: '/api/events',
    method: 'GET',
    success(res){
      callback(res);
    }
  })
}
