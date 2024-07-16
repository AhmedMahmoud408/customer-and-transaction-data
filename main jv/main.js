

let nameInput= document.querySelector("#nameInput");
let searchBtn = document. querySelector("#searchBtn");
// let transDetailsBtn= document.querySelector("#transDetailsBtn");

let customers=[];
let dataTransArray=[];

searchBtn.addEventListener("click", function () {
    nameSearch(nameInput.value);
    console.log(nameInput.value);
  });
nameInput.addEventListener("keyup", function () {
    nameSearch(nameInput.value);
  });

$.ajax({
    type: "GET",
    url: "http://localhost:3000/customers",
    data: "{}",
    dataType: "json",
    success: function (response) {
        customers = response;
        display(customers);
    }
});
$.ajax({
    type: "GET",
    url: "http://localhost:3000/transactions",
    data: "{}",
    dataType: "json",
    success: function (response) {
        dataTransArray = response;
        
    }
});
let x =[]
function display(value){
    
    let cartona = ``;
    for (let i = 0; i < value.length; i++) {
        cartona+=`  <tr>
                <td>${value[i].id}</td>
                <td>${value[i].name}</td>
                <td><button onclick="displayTrans(${value[i].id})" class="btn mada btn-primary btn-sm"><i class="fa-regular fa-eye"></i></button></td>
                <td><button onclick="chartData(${value[i].id})" class="btn btn-warning btn-sm"><i class="fa-regular fa-eye"></i></button></td>
              </tr>`
        
                
            
              
    }
    document.querySelector("#customerList").innerHTML= cartona;    
}
function nameSearch(searchValue){
    let searchItem=[];
    for (let i = 0; i < customers.length; i++) {
        if (customers[i].name.toLowerCase().includes(searchValue.toLowerCase())) {
            searchItem.push(customers[i])
        }
    display(searchItem)
        
    }
}

function displayTrans(data){
  let transArray=[]
        for (let i = 0; i < dataTransArray.length; i++) {
          if (data== dataTransArray[i].customer_id) {
            transArray.push(dataTransArray[i])
          } 
          //  console.log(transArray);
        
        }
        displayData(transArray)   
}

function displayData(data){
  let transCartona = ``;
  for (let i = 0; i < data.length; i++) {
    transCartona+=`  <tr>
     <td>${data[i].date}</td>
       <td>${data[i].amount}</td>
     </tr>`
  }

  document.querySelector("#transList").innerHTML= transCartona;
  document.querySelector("#transDetails").classList.remove("d-none")
  document.querySelector("#myChart").classList.add("d-none")
}

function chartData(data){
  let chartArray=[]
        for (let i = 0; i < dataTransArray.length; i++) {
          if (data== dataTransArray[i].customer_id) {
            chartArray.push(dataTransArray[i])
          } 
          //  console.log(chartArray);
          // // 
        }
        displayChart(chartArray) 
        
document.querySelector("#myChart").classList.remove("d-none")
document.querySelector("#transDetails").classList.add("d-none")
}

function displayChart(data){
  const xValues = [];
  const yValues = [];

  for (let i = 0; i < data.length; i++) {
    xValues.push(data[i].date)
    yValues.push(data[i].amount)
    } 
    let min = Math.min(yValues);
let max = Math.max(yValues);
  new Chart("myChart", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "rgba(13,110,253)",
        data: yValues
      }]
    },
    options: {
      legend: {display: false},
      scales: {
        yAxes: [{ticks: {min: 100, max:10000}}],
      }
    }
  });


}


