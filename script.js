const cities=["Bangalore","Delhi","Mumbai","Chennai","Hyderabad","Pune","Ahmedabad","Jaipur","Kolkata","Chandigarh","Ludhiana","Bhiwani","Gurugram","Noida","Lucknow","Surat","Indore","Nagpur","Patna","Bhopal","Kochi","Coimbatore","Visakhapatnam","Ranchi","Bhubaneswar"];
const trucks=[["4 Tyre","Light cargo / city transport",25,"https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=900&q=80"],["6 Tyre","Medium cargo transportation",32,"https://images.unsplash.com/photo-1601584115197-04ecc0da31d8?auto=format&fit=crop&w=900&q=80"],["10 Tyre","Heavy cargo / long routes",40,"https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=900&q=80"],["12 Tyre","Heavy commercial cargo",44,"https://images.unsplash.com/photo-1586191582119-0d3c8b6e0e9d?auto=format&fit=crop&w=900&q=80"],["14 Tyre","Large cargo movement",48,"https://images.unsplash.com/photo-1591768793355-74d04bb6608f?auto=format&fit=crop&w=900&q=80"],["16 Tyre","Extra heavy cargo",52,"https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=900&q=80"],["Container","Container cargo",50,"https://images.unsplash.com/photo-1565610222536-ef125c59da2e?auto=format&fit=crop&w=900&q=80"],["Trailer","Oversized / project cargo",60,"https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80"]];
const cityFactors={Bangalore:1,Chennai:.9,Hyderabad:.85,Mumbai:1.1,Pune:1.05,Delhi:1.25,Ahmedabad:1.15,Jaipur:1.15,Kolkata:1.3,Chandigarh:1.3,Ludhiana:1.35,Bhiwani:1.25,Gurugram:1.25,Noida:1.25,Lucknow:1.2,Surat:1.1,Indore:1,Nagpur:.95,Patna:1.35,Bhopal:1,Kochi:1.1,Coimbatore:.95,Visakhapatnam:1.05,Ranchi:1.25,Bhubaneswar:1.25};

function fillSelect(id, first){const s=document.getElementById(id);s.innerHTML=`<option value="">${first}</option>`+cities.map(c=>`<option>${c}</option>`).join("")}
fillSelect("fromCity","Select City");fillSelect("toCity","Select City");
document.getElementById("truckType").innerHTML='<option value="">Select Truck</option>'+trucks.map(t=>`<option value="${t[0]}">${t[0]}</option>`).join("");

document.getElementById("truckGrid").innerHTML=trucks.map(t=>`<article class="truck-card"><img src="${t[3]}" alt="${t[0]} truck" loading="lazy"><div class="truck-info"><h3>${t[0]}</h3><p>${t[1]}</p><div class="truck-rate">From ₹${t[2]}/km*</div></div></article>`).join("");

const routes=[["Bangalore","Delhi"],["Bangalore","Mumbai"],["Bangalore","Hyderabad"],["Bangalore","Chennai"],["Delhi","Mumbai"],["Delhi","Bangalore"],["Delhi","Chennai"],["Delhi","Kolkata"],["Mumbai","Delhi"],["Mumbai","Bangalore"],["Mumbai","Hyderabad"],["Mumbai","Ahmedabad"],["Chandigarh","Delhi"],["Chandigarh","Bangalore"],["Ludhiana","Delhi"],["Bhiwani","Delhi"],["Pune","Bangalore"],["Pune","Delhi"],["Ahmedabad","Delhi"],["Jaipur","Delhi"],["Kolkata","Delhi"],["Hyderabad","Pune"],["Chennai","Hyderabad"],["Noida","Mumbai"]];
document.getElementById("routeGrid").innerHTML=routes.map(r=>`<div class="route">📍 ${r[0]} <span>→</span> ${r[1]}</div>`).join("");

document.getElementById("menuBtn").onclick=()=>document.getElementById("navLinks").classList.toggle("active");
document.querySelectorAll("#navLinks a").forEach(a=>a.onclick=()=>document.getElementById("navLinks").classList.remove("active"));
document.getElementById("year").textContent=new Date().getFullYear();

function calculate(){
 const from=document.getElementById("fromCity").value,to=document.getElementById("toCity").value,type=document.getElementById("truckType").value,weight=Number(document.getElementById("weight").value),out=document.getElementById("rateResult");
 if(!from||!to||!type||!weight){out.textContent="⚠️ Please complete the booking details.";return}
 if(from===to){out.textContent="⚠️ Loading and delivery city should be different.";return}
 const truck=trucks.find(t=>t[0]===type),distance=Math.round(450*Math.abs((cityFactors[from]||1)-(cityFactors[to]||1))+650),estimate=Math.round(distance*truck[2]+Math.max(0,weight-5)*250);
 out.innerHTML=`Approx. distance: <b>${distance} km</b> &nbsp; Estimated freight: <b>₹${estimate.toLocaleString("en-IN")}</b>`;
}
document.getElementById("rateBtn").onclick=calculate;

document.getElementById("bookingForm").onsubmit=e=>{
 e.preventDefault(); calculate();
 const phone=document.getElementById("customerPhone").value.trim();
 if(!/^\d{10}$/.test(phone)){alert("Please enter a valid 10 digit mobile number.");return}
 const from=document.getElementById("fromCity").value,to=document.getElementById("toCity").value;
 if(from===to){alert("Loading and delivery city should be different.");return}
 const msg=`🚛 NISHANT CARGO ROADLINES%0A%0ANEW BOOKING REQUEST%0A%0ACustomer: ${encodeURIComponent(document.getElementById("customerName").value)}%0AMobile: ${phone}%0ALoading: ${encodeURIComponent(from)}%0ADelivery: ${encodeURIComponent(to)}%0ATruck: ${encodeURIComponent(document.getElementById("truckType").value)}%0AWeight: ${document.getElementById("weight").value} Ton%0ALoading Address: ${encodeURIComponent(document.getElementById("pickupAddress").value)}%0ARequirement: ${encodeURIComponent(document.getElementById("requirement").value||"Not specified")}`;
 window.open(`https://wa.me/919087876222?text=${msg}`,"_blank");
};
document.getElementById("contactForm").onsubmit=e=>{
 e.preventDefault();const phone=document.getElementById("contactPhone").value.trim();
 if(!/^\d{10}$/.test(phone)){alert("Please enter a valid 10 digit mobile number.");return}
 const msg=`🚛 NISHANT CARGO ROADLINES%0ANEW ENQUIRY%0A%0AName: ${encodeURIComponent(document.getElementById("contactName").value)}%0AMobile: ${phone}%0ARoute: ${encodeURIComponent(document.getElementById("contactRoute").value)}%0ARequirement: ${encodeURIComponent(document.getElementById("contactMessage").value)}`;
 window.open(`https://wa.me/919087876222?text=${msg}`,"_blank");
};
