<template>
  <div class="container home">

    <navigation-menu />

    <div class="select-date mt-5" v-if="step == 1">

      <reservation-fields />

      <div class="alert alert-danger mb-3" v-if="(!stepControl(this.step)) && alertDate">
        <div v-if="parseInt(selectedHotel.id) === -1">Otelinizi seçiniz.</div>
        <div v-if="!checkOutDate">Giriş tarihini seçiniz.</div>
        <div v-if="!checkInDate">Çıkış tarihi seçiniz.</div>
      </div>
    </div>

    <div class="select-room mt-5" v-if="parseInt(step) == 2">
      <rooms />
      <div class="alert alert-danger mb-3" v-if="(!selectedRoomType || !selectedRoomScenic) && alertRoom">
        Lütfen seçim yapın.<br>
        <span v-if="!selectedRoomType">Oda tipi seçmediniz.</span> -
        <span v-if="!selectedRoomScenic">Manzara seçmediniz.</span>
      </div>
    </div>

    <div class="payment mt-5" v-if="parseInt(step) == 3">
      <payment ref="payment"/>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="bottom-buttons">
          <button
            type="button"
            class="btn btn-primary mr-2"
            @click.prevent="prevStep"
            v-if="parseInt(step) !== 1">
            Geri Dön
          </button>
          <button
            type="button"
            class="btn btn-primary ml-auto"
            @click.prevent="nextStep"
            v-if="step != lastStep">
            Kaydet ve Devam Et
          </button>
          <button
            type="button"
            class="btn btn-primary ml-auto"
            @click.prevent="submit"
            v-if="step == lastStep">
            Ödeme Yap ve Bitir
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'; // mapActions

import NavigationMenu from '@/components/NavigationMenu.vue';
import ReservationFields from '@/components/ReservationFields.vue';
import Rooms from '@/components/Rooms.vue';
import Payment from '@/components/Payment.vue';

export default {
  name: 'Home',
  data() {
    return {
      alertDate: false,
      alertRoom: false,
      form: {},
      name: null,
      lastStep: 3,
      dayCount: 0
    };
  },
  components: {
    NavigationMenu,
    ReservationFields,
    Rooms,
    Payment
  },
  computed: {
    ...mapState([
      'step',
      'roomType',
      'roomScenic',
      'checkInDate',
      'checkOutDate',
      'selectedHotel',
      'selectedHotelDetail',
      'personCount',
      'childCount',
      'selectedRoomType',
      'selectedRoomScenic',
      'rate',
      'price',
      'totalPrice',
      'day'
    ]),
  },
  methods: {
    // ...mapActions([
    //   'updateStep'
    // ]),
    nextStep() {
      if (this.stepControl(this.step)) { // validation true
        this.$store.commit('updateStep', parseInt(this.step) + 1);
        if (parseInt(this.step) === 2) {
          this.alertDate = false

          this.dayCount = this.moment.duration(this.moment(this.checkOutDate).diff(this.moment(this.checkInDate))).days()
          
          this.$store.commit('updateDay', this.dayCount)
        }
        if (parseInt(this.step) === 3) {
          this.alertRoom = false

          
          const pr = this.day * (this.price + (parseInt((this.price * this.rate) / 100)))
          const totalPrice = (this.childCount * (parseInt(pr / 2))) + (this.personCount * pr)
          
          
          this.$store.commit('updateTotalPrice', totalPrice)
        }

        // local storage'ye kaydet:
        localStorage.setItem('RsvStep', this.step)
        localStorage.setItem('RsvHotelId', this.selectedHotel.id)
        localStorage.setItem('RsvHotelName', this.selectedHotel.name)
        localStorage.setItem('RsvHotelCity', this.selectedHotel.city)
        localStorage.setItem('RsvInDate', this.checkInDate)
        localStorage.setItem('RsvOutDate', this.checkOutDate)
        localStorage.setItem('RsvPersonCount', this.personCount)
        localStorage.setItem('RsvChildStatus', this.selectedHotelDetail.child_status)
        localStorage.setItem('RsvChildCount', this.childCount)
        localStorage.setItem('RsvRoomType', JSON.stringify(this.selectedHotelDetail.room_type))
        localStorage.setItem('RsvRoomScenic', JSON.stringify(this.selectedHotelDetail.room_scenic))

        localStorage.setItem('RsvSelectedRoomType', this.selectedRoomType)
        localStorage.setItem('RsvSelectedRoomScenic', this.selectedRoomScenic)

        localStorage.setItem('RsvDay', this.dayCount)
        localStorage.setItem('RsvPrice', this.price)
        localStorage.setItem('RsvTotalPrice', this.totalPrice)

        localStorage.setItem('RsvRate', this.rate)


      } else { // validation false
        if (parseInt(this.step) === 1)
          this.alertDate = true
        if (parseInt(this.step) === 2)
          this.alertRoom = true;
      }
    },
    prevStep() {
      const step = parseInt(this.step) - 1;
      this.$store.commit('updateStep', step)
      localStorage.setItem('RsvStep', step)
    },
    stepControl(step) {
      if (step == 1) 
        return this.checkInDate !== null && 
          this.checkOutDate !== null &&
          parseInt(this.selectedHotel.id) !== -1
      if (step == 2)
        return this.selectedRoomType !== null && this.selectedRoomScenic !== null
    },
    submit() {
      this.form.checkInDate = this.checkInDate;
      this.form.checkOutDate = this.checkOutDate;
      this.form.roomType = this.roomType;
      this.form.selectedRoomScenic = this.selectedRoomScenic;
      console.log(this.form);
      this.$refs.payment.handleSubmit();
    }
  }
};
</script>

<style lang="scss">
  .bottom-buttons {
    display: flex;
    justify-content: space-between;
    border: 1px solid #f1f1f1;
    background-color: #f4f4f4;
    border-radius: 6px;
    padding: 20px;
    button {
      border-radius: 6px;
      font-weight: 700;
      font-size: 15px;
      padding: 10px 20px;
    }
  }
</style>