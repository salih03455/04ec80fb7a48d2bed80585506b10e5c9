import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    hotels: null,
    selectedHotel: { id: -1, name: null, city: null },
    selectedHotelDetail: null,
    step: 1,
    checkInDate: null,
    checkOutDate: null,
    selectedRoomType: null,
    selectedRoomScenic: null,
    childCount: null,
    personCount: 1,
    day: 0,
    price: 0,
    totalPrice: 0,
    rate: 0
  },

  mutations: {
    updateHotels(state, value) {
      state.hotels = { ...value };
    },

    updateSelectedHotelId(state, value) {
      state.selectedHotel = { ...state.selectedHotel, id: value };
    },

    updateSelectedHotelName(state, value) {
      state.selectedHotel = { ...state.selectedHotel, name: value };
    },

    updateSelectedHotelCity(state, value) {
      state.selectedHotel = { ...state.selectedHotel, city: value };
    },

    updateSelectedHotelDetail(state, value) {
      state.selectedHotelDetail = value;
    },

    updateCheckInDate(state, date) {
      state.checkInDate = date;
    },

    updateCheckOutDate(state, date) {
      state.checkOutDate = date;
    },

    updatePersonCount(state, value) {
      state.personCount = parseInt(value);
    },

    updateChildCount(state, value) {
      state.childCount =
        value === null || value === "null" ? null : parseInt(value);
    },

    updateStep(state, step) {
      state.step = step;
    },

    updateChildStatus(state, value) {
      state.selectedHotelDetail =
        state.selectedHotelDetail === null
          ? { child_status: JSON.parse(value) }
          : { ...state.selectedHotelDetail, child_status: JSON.parse(value) };
    },

    updateRoomType(state, value) {
      state.selectedHotelDetail =
        state.selectedHotelDetail === null
          ? { room_type: value }
          : { ...state.selectedHotelDetail, room_type: value };
    },

    updateRoomScenic(state, value) {
      state.selectedHotelDetail =
        state.selectedHotelDetail === null
          ? { room_scenic: value }
          : { ...state.selectedHotelDetail, room_scenic: value };
    },

    updateSelectedRoomType(state, value) {
      state.selectedRoomType = value === "null" ? null : value;
    },

    updateSelectedRoomScenic(state, value) {
      state.selectedRoomScenic = value === "null" ? null : value;
    },

    updateDay(state, value) {
      state.day = parseInt(value);
    },

    updatePrice(state, value) {
      state.price = value;
    },

    updateTotalPrice(state, value) {
      state.totalPrice = parseInt(value)
    },

    updateRate(state, value) {
      state.rate = parseInt(value)
    }
  },

  actions: {
    fetchHotels({ commit }) {
      this.axios.get("https://5f6d939160cf97001641b049.mockapi.io/tkn/hotels")
        .then((data) => {
          return data.json();
        })
        .then((hotels) => {
          commit("updateHotels", hotels);
        });
    },
  },

  getters: {
    getHotels(state) {
      return state.hotels;
    },
  },
});
