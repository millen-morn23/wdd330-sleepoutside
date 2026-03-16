import{u as i,g as n}from"./utils-MGANcz1u.js";i();function s(){const a=n("so-cart")||[],e=document.querySelector(".product-list");if(a.length===0){e.innerHTML="<p>Your cart is empty.</p>";const t=document.querySelector(".cart-total");t&&(t.textContent="Total: $0");return}const c=a.map(t=>u(t));e.innerHTML=c.join(""),d(a),document.querySelectorAll(".remove-item").forEach(t=>{t.addEventListener("click",r=>{const o=r.target.closest(".cart-card").dataset.id;m(o)})}),document.querySelectorAll(".qty-plus").forEach(t=>{t.addEventListener("click",r=>{const o=r.target.closest(".cart-card").dataset.id;l(o,1)})}),document.querySelectorAll(".qty-minus").forEach(t=>{t.addEventListener("click",r=>{const o=r.target.closest(".cart-card").dataset.id;l(o,-1)})})}function u(a){return`
  <li class="cart-card divider" data-id="${a.Id}">
    <a href="#" class="cart-card__image">
      <img src="${a.Image}" alt="${a.Name}" />
    </a>

    <a href="#">
      <h2 class="card__name">${a.Name}</h2>
    </a>

    <p class="cart-card__color">${a.Colors[0].ColorName}</p>

    <div class="cart-card__quantity">
      <button class="qty-minus">−</button>
      <span class="qty">${a.quantity||1}</span>
      <button class="qty-plus">+</button>
    </div>

    <p class="cart-card__price">$${a.FinalPrice}</p>

    <button class="remove-item">Remove</button>
  </li>
  `}function d(a){const e=document.querySelector(".cart-total"),c=a.reduce((t,r)=>{const o=r.quantity||1;return t+r.FinalPrice*o},0);e&&(e.textContent=`Total: $${c.toFixed(2)}`)}function m(a){let e=n("so-cart")||[];e=e.filter(c=>c.Id!==a),localStorage.setItem("so-cart",JSON.stringify(e)),i(),s()}function l(a,e){let c=n("so-cart")||[];c=c.map(t=>(t.Id===a&&(t.quantity=(t.quantity||1)+e,t.quantity<1&&(t.quantity=1)),t)),localStorage.setItem("so-cart",JSON.stringify(c)),s()}s();
