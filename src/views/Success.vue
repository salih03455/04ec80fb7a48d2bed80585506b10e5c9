<template>
  <div class="success container">
    <div class="success-top row">
      <div class="col-md-12">
        <div class="success-message">
          <span class="mt-2">
            <i class="fa fa-calendar-check-o" aria-hidden="true"></i>
            Rezervasyon kaydınız alınmıştır.
          </span>
          <span>Rezervasyon özetiniz aşağıdaki gibidir.</span>
        </div>
      </div>
    </div>
    <div class="success-bottom row">
      <div class="hotel-name">{{ selectedHotel.name }} <span> ({{ selectedHotel.city }})</span></div>
        <div class="hotel-info">
          <div>
            <span>Giriş Tarihi:</span>
            <strong>{{moment(checkInDate).format('DD.MM.YYYY')}}</strong>
          </div>
          <div>
            <span>Çıkış Tarihi:</span>
            <strong>{{moment(checkOutDate).format('DD.MM.YYYY')}}</strong>
          </div>
          <div>
            <span>Yetişkin:</span>
            <strong>{{ personCount }}</strong>
          </div>
          <div>
            <span>Çocuk:</span>
            <strong>{{ childCount }}</strong>
          </div>
          <div>
            <span>Oda Tipi:</span>
            <strong>{{ selectedRoomType }}</strong>
          </div>
          <div>
            <span>Manzara:</span>
            <strong>{{ selectedRoomScenic }}</strong>
          </div>
        </div>
        <div class="pay-info">
          <div>
            <span>Oda Fiyatı</span>
            <span>{{ price }} TL</span>
          </div>
          <div>
            <span>Fiyat Etki Oranı</span>
            <span>%{{ rate }}</span>
          </div>
          <div>
            <span>Konaklama <i>({{ day }} Gün)</i></span>
            <span>{{ childCount * (parseInt((day * price) / 2)) + (personCount * day * price) }} TL</span>
          </div>
          <hr>
          <div class="pay-total">
            <span>TOPLAM TUTAR</span>
            <span>{{ totalPrice }} TL</span>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Success',
  computed: {
    ...mapState([
      'checkInDate',
      'checkOutDate',
      'selectedRoomType',
      'selectedRoomScenic',
      'selectedHotel',
      'personCount',
      'childCount',
      'selectedRoomType',
      'selectedRoomScenic',
      'price',
      'totalPrice',
      'day',
      'rate'
    ]),
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/variables';
  .success {
    margin: 40px auto 20px;
    &-top {
      padding: 20px;
      text-align: center;
      border: 1px solid $gray-color;
      border-radius: $radius;
      margin-bottom: 30px;
    }
    &-message {
      span {
        &:first-child {
          font-size: 18px;
          font-weight: 700;
          display: block;
          i {
            display: block;
            font-size: 50px;
            color: green;
            margin-bottom: 15px;
          }
        }
      }
    }
    &-bottom {
      padding: 20px;
      border: 1px solid $gray-color;
      border-radius: $radius;
      background-color: $gray-color;
      .hotel-name {
        width: 100%;
        font-size: 20px;
        font-weight: 700;
        padding: 0 20px;
        span {
          font-size: 14px;
          font-weight: 400;
        }
      }
      .hotel-info {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        div {
          flex: calc(50% - 40px);
          margin: 20px;
          background-color: #fff;
          flex-shrink: 0;
          text-align: center;
          padding: 10px;
          border-radius: 10px;
          span {
            display: block;
          }
        }
      }
      .pay-info {
        background-color: #fff;
        border-radius: 10px;
        padding: 20px;
        width: 100%;
        margin: 20px;
        div {
          display: flex;
          justify-content: space-between;
          span {
            &:first-child {
              font-weight: 700;
              i {
                font-weight: 400;
                font-style: normal;
              }
            }
          }
        }
      }
      .pay-total {
        display: flex;
        flex-direction: column;
        align-items: center;
        span {
          &:last-child {
            font-size: 24px;
            font-weight: 700;
          }
        }
      }
    }
  }
</style>
