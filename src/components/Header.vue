<template>
  <div class="header">
    <div class="header__left">
      <span>Otel</span>
      <span>Rezervasyon Sistemi</span>
    </div>
    <div class="header__right">
      <button @click="newReservation()">Yeni Rezervasyon Yap</button>
    </div>
  </div>
</template>

<script>
import router from '@/router';
export default {
  name: 'Header',
  methods: {
    newReservation() {
      localStorage.removeItem('RsvHotelId');
      localStorage.removeItem('RsvHotelName');
      localStorage.removeItem('RsvHotelCity');
      localStorage.removeItem('RsvInDate');
      localStorage.removeItem('RsvOutDate');
      localStorage.removeItem('RsvPersonCount');
      localStorage.removeItem('RsvChildStatus');
      localStorage.removeItem('RsvChildCount');
      localStorage.removeItem('RsvRoomType');
      localStorage.removeItem('RsvRoomScenic');
      localStorage.removeItem('RsvSelectedRoomType');
      localStorage.removeItem('RsvSelectedRoomScenic');
      localStorage.removeItem('RsvDay');
      localStorage.removeItem('RsvPrice');
      localStorage.removeItem('RsvTotalPrice');
      localStorage.removeItem('RsvRate');
      localStorage.removeItem('RsvStep');

      this.$store.commit('updateSelectedHotelId', -1)
      this.$store.commit('updateSelectedHotelName', null)
      this.$store.commit('updateSelectedHotelCity', null)
      this.$store.commit('updateCheckInDate', null)
      this.$store.commit('updateCheckOutDate', null)
      this.$store.commit('updatePersonCount', 1)
      this.$store.commit('updateChildCount', null)
      this.$store.commit('updateSelectedRoomType', null)
      this.$store.commit('updateSelectedRoomScenic', null)
      this.$store.commit('updateDay', 0)
      this.$store.commit('updatePrice', 0)
      this.$store.commit('updateTotalPrice', 0)
      this.$store.commit('updateRate', 0)
      this.$store.commit('updateStep', 1)
      
      if (this.$router.history.current.path === '/success') {
        router.push('/')
      }
    }

  }
}
</script>

<style lang="scss">
@import '../assets/scss/variables.scss';

.header {
  background-color: $base-color;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  &__left {
    color: #fff;
    span {
      display: block;
      &:first-child {
        font-size: 20px;
        font-weight: 700;
      }
      &:last-child {
        font-size: 15px;
      }
    }
  }
  &__right {
    button {
      background-color: #f1f0f1;
      padding: 5px 8px;
      border: none;
      border-radius: 3px;
    }
  }
}
</style>