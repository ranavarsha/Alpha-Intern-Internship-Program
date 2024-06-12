function maskPassword(pass){
  let str=""
  for(let index=0; index<pass.length; index++){
    str+="*"
  }
  return str
}
//logic to copy the password to clipboard
function copyText(txt){
  navigator.clipboard.writeText(txt).then(
  ()=>{
    //alert("Copied the text: "+txt);
    document.querySelector(".alert").style.display="inline-block"
    setTimeout(()=>{
      document.querySelector(".alert").style.display="none"
    },2000)
  },
  ()=>{
    alert("Clipboard copying failed")
  },
  );
}
//logic to delete the password
const deletepasswords=(website)=>{
    let data = localStorage.getItem("passwords");
    let arr=JSON.parse(data);
    arrUpdated=arr.filter((e)=>{
        return e.website!=website
    })
    localStorage.setItem("passwords", JSON.stringify(arrUpdated))
    alert(`Successfully Deleted ${website}'s password`)
    showpasswords()
}
//logic to add password in the table
const showpasswords = () => {
  let tb = document.querySelector("table");
  let data = localStorage.getItem("passwords");
  if (data == null || JSON.parse(data).length==0) {
    tb.innerHTML = "No data to show";
  } else {
    
    tb.innerHTML = `<tr>
    
    <th scope="col">Website </th>
    <th scope="col">Username </th>
    <th scope="col">Password </th>
    <th scope="col">Actions </th>
  </tr>`;
    let arr = JSON.parse(data);
    let str = "";
    for (let index = 0; index <arr.length; index++) {
      const element = arr[index];

      str += `<tr>
    
    <td>${element.website} <img onclick="copyText('${element.website}')" src="copy.svg" alt="Copy Icon" width="12" height="12"></td>
    <td>${element.username} <img onclick="copyText('${element.username}')" src="copy.svg" alt="Copy Icon" width="12" height="12"></td>
    <td>${maskPassword(element.password)} <img onclick="copyText('${element.password}')" src="copy.svg" alt="Copy Icon" width="12" height="12">
    </td>
    <td><button class="btnsm" onclick="deletepasswords('${element.website}')">Delete</button></td>
</tr>`;
    }
    tb.innerHTML = tb.innerHTML + str;
  }
  document.getElementById("exampleInputEmail1").value=""
  document.getElementById("exampleInputUsername1").value=""
  document.getElementById("exampleInputPassword1").value=""
  
};

//logic to fill the table
console.log("Working");
showpasswords();
document.querySelector(".btn-primary").addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Clicked...");
  
  let Website = document.getElementById("exampleInputEmail1").value;
  let Username = document.getElementById("exampleInputUsername1").value;
  let Password = document.getElementById("exampleInputPassword1").value;
  console.log(Website, Username, Password);
  let passwords = localStorage.getItem("passwords");
  console.log(passwords);
  if (passwords == null) {
    let json = [];
    json.push({website: Website, username: Username, password: Password });
    alert("Password Saved");
    localStorage.setItem("passwords", JSON.stringify(json));
  } else {
    let json = JSON.parse(localStorage.getItem("passwords"));
    json.push({website: Website, username: Username, password: Password });
    alert("Password Saved");
    localStorage.setItem("passwords", JSON.stringify(json));
  }
  showpasswords()
});