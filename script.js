var datArray = [
 {
   "State": "Andhra Pradesh",
   "InternetSubscriptions": 37.61,
   "LiteracyRate": 67,
   "Population": "84,580,777",
   "Schools" : 45013
 },
 {
   "State": "Assam",
   "InternetSubscriptions": 9.81,
   "LiteracyRate": 72.2,
   "Population": "31,205,576",
   "Schools" : 47223
 },
 {
   "State": "Bihar",
   "InternetSubscriptions": 28.4,
   "LiteracyRate": 61.8,
   "Population": "104,099,452",
   "Schools": 72590
 },
 {
   "State": "Delhi",
   "InternetSubscriptions": 31.14,
   "LiteracyRate": 86.2,
   "Population": "16,787,941",
      "Schools": 2784
 },
 {
   "State": "Gujarat",
   "InternetSubscriptions": 31.43,
   "LiteracyRate": 78,
   "Population": "640,439,692",
      "Schools": 35202
 },
 {
   "State": "Haryana",
   "InternetSubscriptions": 9.05,
   "LiteracyRate": 75.6,
   "Population": "25,351,462",
      "Schools": 14516
 },
 {
   "State": "Himachal Pradesh",
   "InternetSubscriptions": 6.94,
   "LiteracyRate": 82.8,
   "Population": "6,864,602",
      "Schools": 15433
 },
 {
   "State": "Jammu and Kashmir",
   "InternetSubscriptions": 5.81,
   "LiteracyRate": 67.2,
   "Population": "12,541,302",
      "Schools": 24080
 },
 {
   "State": "Karnataka",
   "InternetSubscriptions": 32.14,
   "LiteracyRate": 75.4,
   "Population": "61,095,297",
      "Schools": 50184
 },
 {
   "State": "Kerala",
   "InternetSubscriptions": 19.8,
   "LiteracyRate": 94,
   "Population": "33,406,061",
      "Schools": 5011
 },
 {
   "State": "Madhya Pradesh",
   "InternetSubscriptions": 25.88,
   "LiteracyRate": 69.3,
   "Population": "72,626,809",
      "Schools": 122056
 },
 {
   "State": "Maharashtra",
   "InternetSubscriptions": 39.45,
   "LiteracyRate": 82.3,
   "Population": "112,374,333",
      "Schools": 66033
 },
 {
   "State": "Orissa",
   "InternetSubscriptions": 12.2,
   "LiteracyRate": 72.9,
   "Population": "41,974,218",
      "Schools": 55483
 },
 {
   "State": "Punjab",
   "InternetSubscriptions": 18.63,
   "LiteracyRate": 75.8,
   "Population": "27,743,338",
      "Schools": 19404
 },
 {
   "State": "Rajasthan",
   "InternetSubscriptions": 26.46,
   "LiteracyRate": 66.1,
   "Population": "68,548,437",
      "Schools": 67578
 },
 {
   "State": "Tamil Nadu",
   "InternetSubscriptions": 39.57,
   "LiteracyRate": 80.1,
   "Population": "72,147,030",
      "Schools": 37728
 },
 {
   "State": "West Bengal",
   "InternetSubscriptions": 19.31,
   "LiteracyRate": 76.3,
   "Population": "91,276,115",
      "Schools": 82876
 }
]

$('th').on('click', function(){
  var column = $(this).data('column')
  var order = $(this).data('order')
  var text = $(this).html()
  text = text.substring(0,text.length - 1)


  if(order == 'desc'){
    $(this).data('order',"asc")
    datArray = datArray.sort((a,b) => a[column] > b[column] ? 1 : -1)
    text += '&#9660'
  }
  else{
     $(this).data('order',"desc")
       datArray = datArray.sort((a,b) => a[column] < b[column] ? 1 : -1)
       text += '&#9660'
  }
  $(this).html(text)
  buildTable(datArray)
})


buildTable(datArray)

function buildTable(data){
  var table = document.getElementById('dattable')
  table.innerHTML = ''
  for(var i = 0; i < data.length; i++){
    var row = `<tr>
            <td>${data[i].State}</td>
            <td>${data[i].InternetSubscriptions}</td>
            <td>${data[i].LiteracyRate}</td>
            <td>${data[i].Population}</td>
            <td>${data[i].Schools}</td>
</tr>`
    table.innerHTML += row
  }
}
