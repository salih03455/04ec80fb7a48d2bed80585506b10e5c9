<template>
  <div class="select-room">
    <div class="row">
      <div class="col-12">
        <div class="select-room-info" v-if="checkInDate && checkOutDate">
          <div class="name">{{ selectedHotel.name }} <span class="city">({{ selectedHotel.city }})</span></div>
          <span>Giriş Tarihi: </span>
          <strong>{{moment(checkInDate).format('DD.MM.YYYY')}}</strong> -
          <span>Çıkış Tarihi: </span>
          <strong>{{moment(checkOutDate).format('DD.MM.YYYY')}}</strong> -
          <span>Yetişkin: </span>
          <strong>{{ personCount }}</strong> -
          <span>Çocuk: </span>
          <strong>{{ childCount != null ? childCount : 0 }}</strong>
        </div>
      </div>
    </div>

    <div class="row select-room-type">
      <div class="col-md-12 title">Oda Tipi Seçimi</div>
      <div
        class="col-md-4"
        v-for="type in selectedHotelDetail.room_type"
        :key="type.id">
        <div class="form-group">
          <input
            type="radio"
            :id="`${type.title}_${type.id}`"
            :value="type.id"
            :checked="type.title == selectedRoomType"
            @change="onSelectType(type)">
          <label class="radio-label" :for="`${type.title}_${type.id}`">
            <span>{{ type.title }}</span>
            <img :src="type.photo" :alt="type.title" class="img-fluid">
            <div>
              <span>{{ moment.duration(moment(checkOutDate).diff(moment(checkInDate))).days() }} Gün,</span>
              <span>{{ personCount }} Yetişkin {{ childCount > 0 ? `, ${childCount} Çocuk` : '' }}</span>
              <span class="price">
                {{calculatePrice(type.price)}} TL
              </span>
            </div>
          </label>
        </div>
      </div>
    </div>

    <div class="row select-room-type">
      <div class="col-md-12 title">Manzara Seçimi</div>
      <div
        class="col-md-4"
        v-for="scenic in selectedHotelDetail.room_scenic"
        :key="scenic.id">
        <div class="form-group">
          <input
            type="radio"
            :id="`${scenic.title}_${scenic.id}`"
            :value="scenic.id"
            :checked="scenic.title == selectedRoomScenic"
            @change="onSelectScenic(scenic)">
          <label class="radio-label" :for="`${scenic.title}_${scenic.id}`">
            <span>{{ scenic.title }}</span>
            <img :src="scenic.photo" :alt="scenic.title" class="img-fluid">
            <div>
              <span>Fiyat Etki Oranı</span>
              <span class="price">
                +{{ scenic.price_rate }}%
              </span>
            </div>
          </label>
        </div>
      </div>

      <hr class="clearfix">

      <div class="col-12" v-if="false">
        <div class="alert alert-light" role="alert" v-if="roomType">
          {{roomType}} oda <span v-if="roomScenic">ve {{roomScenic}} manzarası </span>seçtiniz
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'SelectRoom',
  data() {
    return {

    }
  },
  computed: {
    ...mapState([
      'checkInDate',
      'checkOutDate',
      'roomType',
      'roomScenic',
      'selectedHotel',
      'selectedHotelDetail',
      'childCount',
      'personCount',
      'selectedRoomScenic',
      'selectedRoomType'
    ]),
  },
  methods: {
    calculatePrice(price) {
      // cocuklardan %50 aliyoruz :)
      const priceOfChild = this.childCount == null ? 0 : parseInt(price/2) * this.childCount
      const priceOfPerson = this.personCount * price
      const days = this.moment.duration(this.moment(this.checkOutDate).diff(this.moment(this.checkInDate))).days()
      return (priceOfChild + priceOfPerson) * days
    },
    onSelectType(type) {
      this.$store.commit('updateSelectedRoomType', type.title)
      this.$store.commit('updatePrice', type.price)
    },
    onSelectScenic(scenic) {
      this.$store.commit('updateSelectedRoomScenic', scenic.title)
      this.$store.commit('updateRate', scenic.price_rate)
    }
  }
}

</script>

<style lang="scss">
.select-room {
  &-info {
    border: 1px solid #f1f1f1;
    background-color: #f4f4f4;
    border-radius: 6px;
    padding: 20px;
    margin-bottom: 30px;
    .name {
      font-size: 20px;
      font-weight: 700;
      .city {
        font-weight: 400;
        font-size: 17px;
      }
    }
  }
  &-type {
    .title {
      font-weight: 700;
      border-bottom: 1px solid #f1f1f1;
      margin: 15px;
      padding: 10px 0;
    }
    label {
      display: block;
      border: 1px solid #f1f1f1 !important;
      border-radius: 6px;
      padding: 20px !important;
      img {
        width: 100%;
        max-width: 100% !important;
        display: block;
      }
      & > span {
        font-weight: 700;
        display: block;
        padding-bottom: 5px;
        text-transform: initial;
        font-size: 14px;
      }
      & > div {
        margin-top: 15px;
        display: flex;
        span {
          text-transform: initial;
          &.price {
            margin-left: auto;
            font-size: 16px;
            font-weight: 700;
          }
        }
      }
    }
  }
}
</style>
