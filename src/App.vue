<script>
import HotelDatePicker from 'vue-hotel-datepicker2'
import 'vue-hotel-datepicker2/dist/vueHotelDatepicker2.css'

export default {
  data() {
    return {
      trTR: {
        "check-in": "Giriş",
        "check-out": "Çıkış",
        "day-names": ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pa"],
        "month-names": [
          "Ocak",
          "Şubat",
          "Mart",
          "Nisan",
          "Mayıs",
          "Haziran",
          "Temmuz",
          "Ağustos",
          "Eylül",
          "Ekim",
          "Kasım",
          "Aralık",
        ],
        night: "gece",
        nights: "gece",
        tooltip: {
          halfDayCheckIn: "Rezervasyon müsait",
          halfDayCheckOut: "Rezervasyon müsait",
          saturdayToSaturday: "Sadece cumartesiden<br/> cumartesiye",
          sundayToSunday: "Sadece pazardan<br/> pazara",
          minimumRequiredPeriod: "%{minNightInPeriod} %{night} en az",
        },
        week: "hafta",
        weeks: "hafta",
      }
    }
  },
  components: {
    HotelDatePicker
  }
}
</script>

<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    
    <HotelDatePicker
      format="DD/MM/YYYY"
      :showYear="true"
      :i18n="trTR">
    </HotelDatePicker>
    
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
