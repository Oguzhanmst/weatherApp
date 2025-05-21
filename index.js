// //OpenWeather API
const APIkey = "b11fea6d72f626ff7bcd515a70c3d48a"



//HTML etiket seçimi
const searchInput = document.querySelector(".search-input")
const searchBtn = document.querySelector(".search-btn")
const favDiv = document.querySelector(".favorite")

//Favori şehri localStoragen alıp listede göstermek. 
function createElement(name) {
    // Ana kapsayıcı div
    const cityDiv = document.createElement("div");
    cityDiv.classList.add("favorite-city");

    // Şehir adı 
    const cityP = document.createElement("p");
    cityP.classList.add("fav-city-name");
    cityP.textContent = name

    //şehir ismine tıklandığında ismi infoHTML gönderme
    cityP.addEventListener("click", () => {
        window.location.href = `info.html?city=${encodeURIComponent(name)}`
    });

    //Span
    const favSpan = document.createElement("span")
    favSpan.classList.add("fav-span")

    // Yıldız simgesi <img>
    const starImg = document.createElement("img");
    starImg.classList.add("fav-star");
    starImg.src = "images/Interface/Star.png";

    //Silme butonu
    const deleteBtn = document.createElement("button")
    deleteBtn.textContent = "Sil"
    deleteBtn.classList.add("btn-delete")

    //Silme işlemi
    deleteBtn.addEventListener("click", e => {
        e.preventDefault();

        // localStorage'dan sil
        let favCities = JSON.parse(localStorage.getItem("favorites")) || [];
        favCities = favCities.filter(city => city !== name);
        localStorage.setItem("favorites", JSON.stringify(favCities));

        // DOM'dan kaldır
        cityDiv.remove();
    });

     // Elemanları kapsayıcı div'e ekleme
     favSpan.appendChild(starImg)
     favSpan.appendChild(deleteBtn)

     cityDiv.appendChild(cityP);
     cityDiv.appendChild(favSpan);
     favDiv.appendChild(cityDiv)
}

const favCity = JSON.parse(localStorage.getItem("favorites")) || []

favCity.forEach(element => {
    createElement(element)
});


//inputtan gelen veriyi alarak info.html akatarma işlemi
searchBtn.addEventListener("click", e => {

    e.preventDefault()
    const searchValue = searchInput.value.trim()
    //search value var mı yokmu ?
    if (!searchValue) {
        searchInput.classList.add("input-error");
        searchInput.placeholder = "Lütfen bir şehir girin!";
        return;
    }
    //hatalı veri ile sayfa değiştirmemek için ilk önce yazılan şehir var mı kontrol etmek
    const APIurl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${APIkey}&units=metric`
    fetch(APIurl)
        .then(res => {
            if (!res.ok) {
                //hata fırlattığı için direk catch içine düşüyoruz. 
                throw new Error("Şehir Bulunamadı...")
            }
            return res.json()
        }).then(data => {
            //girilen input değeri var ise şehir adını diğer tarafa aktarmak
            window.location.href = `info.html?city=${encodeURIComponent(searchValue)}`
            searchInput.value = "";
        }).catch(err => {
            searchInput.value = "";
            searchInput.classList.add("input-error");
            searchInput.placeholder = "Geçersiz şehir adı!";
            console.log(err.message)
        })
})


