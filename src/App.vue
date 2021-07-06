<template>
  <div id="app">
    <Header />
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  data() {
    return {
      
    }
  },
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

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  button {
    cursor: pointer;
  }
  input, select {
    border: 1px solid #424142;
    border-radius: 4px;
    outline: none;
    box-shadow: none;
    width: 100%;
    height: auto;
  }

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: transparent;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAeCAYAAABuUU38AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAUxJREFUeNrM1sEJwkAQBdCsngXPHsQO9O5FS7AAMVYgdqAd2IGCDWgFnryLFQiCZ8EGnJUNimiyM/tnk4HNEAg/8y6ZmMRVqz9eUJvRaSbvutCZ347bXVJy/ZnvTmdJ862Me+hAbZCTs6GHpyUi1tTSvPnqTpoWZPUa7W7ncT3vK4h4zVejy8QzM3WhVUO8ykI6jOxoGA4ig3BLHcNFSCGqGAkig2yqgpEiMsjSfY9LxYQg7L6r0X6wS29YJiYQYecemY+wHrXD1+bklGhpAhBDeu/JfIVGxaAQ9sb8CI+CQSJ+QmJg0Ii/EE2MBiIXooHRQhRCkBhNhBcEhLkwf05ZCG8ICCOpk0MULmvDSY2M8UawIRExLIQIEgHDRoghihgRIgiigBEjgiFATBACAgFgghEwSAAGgoBCBBgYAg5hYKAIFYgHBo6w9RRgAFfy160QuV8NAAAAAElFTkSuQmCC);
    background-size: 12px;
    background-position: calc(100% - 15px) center;
    background-repeat: no-repeat;
    width: 100%;
    font-family: inherit;
    font-size: inherit;
    cursor: inherit;
    line-height: inherit;
    position: relative;
  }

  select::-ms-expand {
    display: none;
  }

  .alert {
    &:empty {
      display: none;
    }
    border-radius: 6px;
  }

  .form-group {
    .fa {
      bottom: 0;
      top: 0;
      height: 15px;
      margin: auto;
    }
  }
}

input {
  &[type=text] {
    padding: 10px 15px;
  }
}

select {
  padding: 10px 15px;
}

</style>
