<template>
  <div id="app">
    <Header />
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  components: {
    Header
  },
  created() {
    const step = localStorage.getItem('RsvStep')

    if (step == null)
      this.$store.commit('updateStep', 1)
    else
      this.$store.commit('updateStep', step)

    if (step == 1 || step == 2 || step == 3) {
      // store'yi doldur:
      this.$store.commit('updateSelectedHotelId', localStorage.getItem('RsvHotelId'))
      this.$store.commit('updateSelectedHotelName', localStorage.getItem('RsvHotelName'))
      this.$store.commit('updateSelectedHotelCity', localStorage.getItem('RsvHotelCity'))
      this.$store.commit('updateCheckInDate', localStorage.getItem('RsvInDate'))
      this.$store.commit('updateCheckOutDate', localStorage.getItem('RsvOutDate'))
      this.$store.commit('updatePersonCount', localStorage.getItem('RsvPersonCount'))
      this.$store.commit('updateChildStatus', localStorage.getItem('RsvChildStatus'))
      this.$store.commit('updateChildCount', localStorage.getItem('RsvChildCount'))
      this.$store.commit('updateRoomType', JSON.parse(localStorage.getItem('RsvRoomType')))
      this.$store.commit('updateRoomScenic', JSON.parse(localStorage.getItem('RsvRoomScenic')))

      this.$store.commit('updateSelectedRoomType', localStorage.getItem('RsvSelectedRoomType'))
      this.$store.commit('updateSelectedRoomScenic', localStorage.getItem('RsvSelectedRoomScenic'))

      this.$store.commit('updateDay', localStorage.getItem('RsvDay'))
      this.$store.commit('updatePrice', localStorage.getItem('RsvPrice'))
      this.$store.commit('updateTotalPrice', localStorage.getItem('RsvTotalPrice'))

      this.$store.commit('updateRate', localStorage.getItem('RsvRate'))
    }

    if (parseInt(step) === 3) {
      //alert(3)
    }
  }
}
</script>
