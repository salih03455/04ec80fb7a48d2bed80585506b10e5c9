<template>
  <div class="reservation-fields">
    <div class="row">
      <div class="col-md-12 select-hotel">
        <i class="fa fa-search"></i>
        <select
          name="hotels"
          id="hotels"
          @change="onHotelChange($event)">
          <option value="-1">Rezervasyon yapmak istediğiniz oteli seçiniz.</option>
          <option
            v-for="hotel in hotelList"
            :value="hotel.id"
            :selected="hotel.id == $store.state.selectedHotel.id"
            :key="hotel.id">
            {{ hotel.hotel_name }}
          </option>
        </select>
      </div>
      <div class="col-md-3">
        <div class="form-group">
          <label>Giriş Tarihi</label>
          <datepicker
            :bootstrap-styling="true"
            v-model="checkInDate"
            :language="tr"
            :format="dateFormatter">
            <div slot="beforeCalendarHeader" class="calender-header">
              Giriş Tarihi
            </div>
            <span slot="afterDateInput">
              <i class="fa fa-calendar"></i>
            </span>
          </datepicker>
        </div>
      </div>

      <div class="col-md-3">
        <div class="form-group">
          <label>Çıkış Tarihi</label>
          <datepicker
            v-model="checkOutDate"
            :bootstrap-styling="true"
            :language="tr"
            :format="dateFormatter">
            <div slot="beforeCalendarHeader" class="calender-header">
              Çıkış Tarihi
            </div>
            <span slot="afterDateInput">
              <i class="fa fa-calendar"></i>
            </span>
          </datepicker>
        </div>
      </div>

      <div class="col-md-3">
        <div class="form-group">
          <label for="">Yetişkin Sayısı</label>
          <select
            v-if="$store.state.selectedHotelDetail && $store.state.selectedHotelDetail.max_adult_size"
            name="person"
            id="person"
            @change="onPersonChange($event)">
            <option
              v-for="index in $store.state.selectedHotelDetail.max_adult_size"
              :key="index"
              :selected="index == $store.state.personCount"
              :value="index">
              {{ index }}
            </option>
          </select>
          <select
            v-else
            name="person"
            id="person"
            @change="onPersonChange($event)">
            <option
              v-for="index in 5"
              :key="index"
              :selected="index == $store.state.personCount"
              :value="index">
              {{ index }}  
            </option>
          </select>
        </div>
      </div>

      <div class="col-md-3">
        <div class="form-group">
          <label for="">Çocuk Sayısı</label>
          <select
            name="child"
            id="child"
            :disabled="$store.state.selectedHotelDetail && $store.state.selectedHotelDetail.child_status != true"
            @change="onChildChange($event)">
            <option
              v-for="index in 6"
              :key="index"
              :selected="(index - 1) == $store.state.childCount"
              :value="index - 1">
              {{ index - 1 }}
            </option>
          </select>
          <span
            v-if="$store.state.selectedHotelDetail && $store.state.selectedHotelDetail.child_status != true">
            Bu otel çocuk kabul etmemektedir.
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import { tr } from 'vuejs-datepicker/dist/locale';
import moment from 'moment';
import { mapState } from 'vuex';

export default {
  name: 'ReservationFields',
  components: {
    Datepicker
  },
  data() {
    return {
      tr,
      hotelList: [],
      hotelKey: '',
    };
  },
  created() {
    // Otelleri getir:
    fetch('https://5f6d939160cf97001641b049.mockapi.io/tkn/hotels')
    .then(data => {
      return data.json()
    })
    .then(hotels => {
      this.hotelList = [...hotels]
    })
  },
  computed: {
    ...mapState([
      'checkInDate',
      'checkOutDate'
    ]),

    checkInDate: {
      get() {
        return this.$store.state.checkInDate
      },
      set(value) {
        this.$store.commit('updateCheckInDate', value)
      }
    },
    checkOutDate: {
      get() {
        return this.$store.state.checkOutDate
      },
      set(value) {
        this.$store.commit('updateCheckOutDate', value)
      }
    },
  },
  methods: {

    dateFormatter(date) {
      return moment(date).format('DD/MM/YYYY');
    },

    onHotelChange(event) {
      const hotelId = event.target.value

      if (hotelId !== '-1') {
        const hotelName = this.hotelList.filter(hotel => hotel.id == hotelId)[0].hotel_name
        this.$store.commit('updateSelectedHotelId', hotelId)
        this.$store.commit('updateSelectedHotelName', hotelName)
        
        fetch('https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-details')
        .then(data => data.json())
        .then(hotelDetail => {
          const selectedHotelDetail = hotelDetail.filter(hotel => hotel.id === hotelId)[0]
          // Store'ye kaydet:
          this.$store.commit('updateSelectedHotelDetail', selectedHotelDetail)
          this.$store.commit('updateSelectedHotelCity', selectedHotelDetail.city)
          if (selectedHotelDetail.child_status) {
            this.$store.commit('updateChildCount', 0)
          } else {
            this.$store.commit('updateChildCount', null)
          }
        })
      } else {
        this.$store.commit('updateSelectedHotelId', '-1')
        this.$store.commit('updateSelectedHotelName', null)
      }
    },

    onChildChange(event) {
      this.$store.commit('updateChildCount', event.target.value)
    },

    onPersonChange(event) {
      this.$store.commit('updatePersonCount', event.target.value)
    }
  }
};
</script>

<style lang="scss">
.reservation-fields {
  border: 1px solid #f1f1f1;
  border-radius: 6px;
  margin-bottom: 20px;
  padding: 20px;
  .select-hotel {
    position: relative;
    margin-bottom: 30px;
    i {
      position: absolute;
      left: 25px;
      top: 0;
      bottom: 0;
      margin: auto;
      height: 24px;
      font-size: 24px;
    }
    select {
      padding-left: 35px;
    }
  }
  .form-group {
    label {
      text-transform: unset;
      font-weight: 700;
      font-size: 14px;
      letter-spacing: 0;
    }
  }
}
</style>
