const BASE_URL = "https://api.frankfurter.app/latest"; 

const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr =  document.querySelector(".from select");
const toCurr =  document.querySelector(".to select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");


for(let select of dropdowns){   //converting all the elements of the countryList into individual options and adding those options individually to the dropdown(select)
for(let currCode in countryList){
   let newOption = document.createElement("option");
   newOption.innerText = currCode;
   newOption.value = currCode;
   if(select.name === "from" && currCode === "USD" )
   {
    newOption.selected ="selected";
   }
   else if(select.name === "to" && currCode === "INR" )
    {
     newOption.selected ="selected";
    }
   select.append(newOption);
}


select.addEventListener("change", (evt) => {
     updateFlag(evt.target);  //whenever a change is made it is made at which target that is passed to the updateFlag function
})
}


const updateFlag = (element) => {
     let currCode = element.value;
     let countryCode = countryList[currCode];
     let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
     let img = element.parentElement.querySelector("img");
     img.src = newSrc;
};


const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    console.log(amtVal);
    if(amtVal ==="" || amtVal < 1 ){
        amtVal = 1;  /*does not update the actual input field's value. It only updates the amtVal variable (which is in memory).
        It does NOT change the value inside the <input> field itself.*/
        amount.value = "1"; //1 is passed as a string as input field values  are always stored as strings  regardless of the type="text" or type="number".
    }
    //console.log(fromCurr.value, toCurr.value);
    const URL = `${BASE_URL}?from=${fromCurr.value.toUpperCase()}&to=${toCurr.value.toUpperCase()}`; //as BASE_URL is a variable
    //when we would request this url, we will get exchange rate
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.rates[toCurr.value.toUpperCase()];

    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};


btn.addEventListener("click", async (evt) =>{
    evt.preventDefault(); //stops the default behaviour of the form to refresh the page after submission
   updateExchangeRate();  
});


window.addEventListener("load", () => {
    updateExchangeRate();  
});