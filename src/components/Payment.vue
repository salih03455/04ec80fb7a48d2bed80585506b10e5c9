<template>
  <div class="payment">
    <div class="row">
      <div class="col-md-7">
        <div class="card-form">
          <div class="card-list">
            <div class="card-item" v-bind:class="{ '-active' : isCardFlipped }">
              <div class="card-item__side -front">
                <div class="card-item__focus" v-bind:class="{'-active' : focusElementStyle }" v-bind:style="focusElementStyle" ref="focusElement"></div>
                <div class="card-item__cover">
                  <img
                    :src="'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' + currentCardBackground + '.jpeg'"
                    class="card-item__bg"
                  />
                </div>
                
                <div class="card-item__wrapper">
                  <div class="card-item__top">
                    <img
                      src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png"
                      class="card-item__chip"
                    />
                    <div class="card-item__type">
                      <transition name="slide-fade-up">
                        <img
                          :src="'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' + getCardType + '.png'"
                          v-if="getCardType"
                          :key="getCardType"
                          alt=""
                          class="card-item__typeImg"
                        />
                      </transition>
                    </div>
                  </div>
                  <label for="cardNumber" class="card-item__number" ref="cardNumber">
                    <template v-if="getCardType === 'amex'">
                    <span
                      v-for="(n, $index) in amexCardMask"
                      :key="$index">
                      <transition name="slide-fade-up">
                        <div
                          class="card-item__numberItem"
                          v-if="$index > 4 && $index < 14 && cardNumber.length > $index && n.trim() !== ''"
                        >*</div>
                        <div class="card-item__numberItem"
                          :class="{ '-active' : n.trim() === '' }"
                          :key="$index" v-else-if="cardNumber.length > $index">
                          {{cardNumber[$index]}}
                        </div>
                        <div
                          v-else
                          class="card-item__numberItem"
                          :class="{ '-active' : n.trim() === '' }"
                          :key="$index + 1">
                          {{ n }}
                        </div>
                      </transition>
                    </span>
                    </template>

                    <template v-else>
                      <span v-for="(n, $index) in otherCardMask" :key="$index">
                        <transition name="slide-fade-up">
                          <div
                            class="card-item__numberItem"
                            v-if="$index > 4 && $index < 15 && cardNumber.length > $index && n.trim() !== ''"
                          >*</div>
                          <div class="card-item__numberItem"
                            :class="{ '-active' : n.trim() === '' }"
                            :key="$index" v-else-if="cardNumber.length > $index">
                            {{cardNumber[$index]}}
                          </div>
                          <div
                            class="card-item__numberItem"
                            :class="{ '-active' : n.trim() === '' }"
                            v-else
                            :key="$index + 1"
                          >{{n}}</div>
                        </transition>
                      </span>
                    </template>
                  </label>
                  <div class="card-item__content">
                    <label for="cardName" class="card-item__info" ref="cardName">
                      <div class="card-item__holder">İsim Soyisim</div>
                      <transition name="slide-fade-up">
                        <div class="card-item__name" v-if="cardName.length" key="1">
                          <transition-group name="slide-fade-right">
                            <span
                              class="card-item__nameItem"
                              v-for="(n, $index) in cardName.replace(/\s\s+/g, ' ')"
                              v-if="$index === $index"
                              :key="$index + 1">
                              {{ n }}
                            </span>
                          </transition-group>
                        </div>
                        <div class="card-item__name" v-else key="2">---- ----</div>
                      </transition>
                    </label>
                    <div class="card-item__date" ref="cardDate">
                      <label for="cardMonth" class="card-item__dateTitle">SKT</label>
                      <label for="cardMonth" class="card-item__dateItem">
                        <transition name="slide-fade-up">
                          <span v-if="cardMonth" v-bind:key="cardMonth">{{cardMonth}}</span>
                          <span v-else key="2">--</span>
                        </transition>
                      </label> /
                      <label for="cardYear" class="card-item__dateItem">
                        <transition name="slide-fade-up">
                          <span v-if="cardYear" v-bind:key="cardYear">{{String(cardYear).slice(2,4)}}</span>
                          <span v-else key="2">--</span>
                        </transition>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-item__side -back">
                <div class="card-item__cover">
                  <img
                    :src="'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' + currentCardBackground + '.jpeg'"
                    class="card-item__bg"
                  />
                </div>
                <div class="card-item__band"></div>
                <div class="card-item__cvv">
                  <div class="card-item__cvvTitle">CVV</div>
                  <div class="card-item__cvvBand">
                    <span v-for="(n, $index) in cardCvv" :key="$index">
                      *
                    </span>
                  </div>
                  <div class="card-item__type">
                    <img
                      :src="'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' + getCardType + '.png'"
                      v-if="getCardType"
                      class="card-item__typeImg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form @submit.prevent="handleSubmit">
            <div class="card-form__inner">
              <div class="card-input">
                <label for="cardNumber" class="card-input__label">Kart No</label>
                <input
                  type="text"
                  id="cardNumber"
                  class="card-input__input"
                  v-mask="generateCardNumberMask"
                  v-model="cardNumber"
                  @focus="focusInput"
                  @blur="blurInput"
                  data-ref="cardNumber"
                  autocomplete="off"
                />
                <div
                  v-if="submitted && !$v.cardNumber.required"
                  class="invalid-feedback d-block">
                  Lütfen kart numarası giriniz.
                </div>
                <div
                  v-if="submitted && !$v.cardNumber.minLength"
                  class="invalid-feedback d-block">
                  Lütfen kart numarasını eksiksiz giriniz.
                  </div>
              </div>
              <div class="card-input">
                <label for="cardName" class="card-input__label">İsim Soyisim</label>
                <input
                  type="text"
                  id="cardName"
                  class="card-input__input"
                  v-model="cardName"
                  @focus="focusInput"
                  @blur="blurInput"
                  data-ref="cardName"
                  autocomplete="off"
                />
                <div
                  v-if="submitted && !$v.cardName.required"
                  class="invalid-feedback d-block">
                  Lütfen kart üzerindeki ismi kontrol ediniz.
                </div>
              </div>
              <div class="card-form__row">
                <div class="card-form__col">
                  <div class="card-form__group">
                    <label for="cardMonth" class="card-input__label">Son Kullanma Tarihi</label>
                    <select
                      class="card-input__input -select"
                      id="cardMonth"
                      v-model="cardMonth"
                      @focus="focusInput"
                      @blur="blurInput"
                      data-ref="cardDate">
                      <option value="" disabled selected>Ay</option>
                      <option
                        v-for="n in 12"
                        :value="n < 10 ? '0' + n : n"
                        :disabled="n < minCardMonth"
                        :key="n">
                        {{ n < 10 ? '0' + n : n }}
                      </option>
                    </select>
                    <select
                      class="card-input__input -select"
                      id="cardYear"
                      v-model="cardYear"
                      @focus="focusInput"
                      @blur="blurInput"
                      data-ref="cardDate">
                      <option value="" disabled selected>Yıl</option>
                      <option :value="$index + minCardYear" v-for="(n, $index) in 12" :key="n">
                        {{$index + minCardYear}}
                      </option>
                    </select>
                    <div
                      v-if="submitted && (!$v.cardMonth.required || !$v.cardYear.required)"
                      class="invalid-feedback d-block">
                      Lütfen son kullanma tarihini kontrol ediniz.
                    </div>
                  </div>
                </div>
                <div class="card-form__col -cvv">
                  <div class="card-input">
                    <label for="cardCvv" class="card-input__label">CVV</label>
                    <input
                      type="text"
                      class="card-input__input"
                      id="cardCvv"
                      v-mask="'####'"
                      maxlength="4"
                      v-model="cardCvv"
                      @focus="flipCard(true)"
                      @blur="flipCard(false)"
                      autocomplete="off"
                    />
                    <div
                      v-if="submitted && !$v.cardCvv.required"
                      class="invalid-feedback d-block">
                      Lütfen cvv kodu giriniz.
                    </div>
                    <div
                      v-if="submitted && !$v.cardCvv.minLength"
                      class="invalid-feedback d-block">
                      Lütfen cvv kodunu eksiksiz giriniz.
                    </div>
                    <div
                      v-if="submitted && !$v.cardCvv.maxLength"
                      class="invalid-feedback d-block">
                      Cvv kodu en fazla 4 karakter olabilir.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="col-md-5">
        <div class="payment-info" v-if="checkInDate && checkOutDate">
          <div class="payment-info-title">
            {{ selectedHotel.name }}
            <span>({{ selectedHotel.city }})</span>
          </div>
          <div class="payment-info-boxes">
            <div class="box">
              <div class="title">Giriş Tarihi:</div>
              <span>{{ moment(checkInDate).format('DD.MM.YYYY') }}</span>
            </div>
            <div class="box">
              <div class="title">Çıkış Tarihi:</div>
              <span>{{ moment(checkOutDate).format('DD.MM.YYYY') }}</span>
            </div>
            <div class="box">
              <div class="title">Yetişkin:</div>
              <span>{{ personCount }}</span>
            </div>
            <div class="box">
              <div class="title">Çocuk:</div>
              <span>{{ childCount ? childCount : 0 }}</span>
            </div>
            <div class="box">
              <div class="title">Oda Tipi:</div>
              <span>{{ selectedRoomType }}</span>
            </div>
            <div class="box">
              <div class="title">Manzara:</div>
              <span>{{ selectedRoomScenic }}</span>
            </div>
          </div>
          <div class="payment-info-price">
            <div class="item">
              <span>Oda Fiyatı</span>
              <span>{{ price }}</span>
            </div>
            <div class="item">
              <span>Fiyat Etki Oranı</span>
              <span>%{{ rate }}</span>
            </div>
            <div class="item">
              <span>Konaklama <i>({{ day }} Gün)</i></span>
              <span>
                {{ childCount * (parseInt((day * price) / 2)) + (personCount * day * price) }} TL
                </span>
            </div>
            <hr>
            <div class="total">
              TOPLAM TUTAR
              <div>{{ totalPrice }} TL</div>
            </div>
          </div>

          <hr class="clearfix">

        </div>
      </div>
    </div>
    <div class="alert alert-danger" v-if="paymentError.length">{{ paymentError }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { required, minLength, maxLength } from 'vuelidate/lib/validators';
import router from '@/router';

export default {
  name: 'Payment',
  data() {
    return {
      cardName: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
      cardCvv: "",
      submitted: false,
      currentCardBackground: Math.floor(Math.random()* 25 + 1), // just for fun :D
      minCardYear: new Date().getFullYear(),
      amexCardMask: "#### ###### #####",
      otherCardMask: "#### #### #### ####",
      cardNumberTemp: "",
      isCardFlipped: false,
      focusElementStyle: null,
      isInputFocused: false,
      paymentError: ''
    };
  },
  mounted() {
    this.cardNumberTemp = this.otherCardMask;
    document.getElementById("cardNumber").focus();
  },
  computed: {
    ...mapState([
      'checkInDate',
      'checkOutDate',
      'selectedRoomType',
      'selectedRoomScenic',
      'personCount',
      'childCount',
      'selectedHotel',
      'selectedHotelDetail',
      'price',
      'totalPrice',
      'day',
      'rate'
    ]),
    getCardType () {
      let number = this.cardNumber;
      let re = new RegExp("^4");
      if (number.match(re) != null) return "visa";

      re = new RegExp("^(34|37)");
      if (number.match(re) != null) return "amex";

      re = new RegExp("^5[1-5]");
      if (number.match(re) != null) return "mastercard";

      re = new RegExp("^6011");
      if (number.match(re) != null) return "discover";
      
      re = new RegExp('^9792')
      if (number.match(re) != null) return 'troy'

      return "visa"; // default type
    },
		generateCardNumberMask() {
			return this.getCardType === "amex" ? this.amexCardMask : this.otherCardMask;
    },
    minCardMonth() {
      if (this.cardYear === this.minCardYear) return new Date().getMonth() + 1;
      return 1;
    }
  },
  watch: {
    cardYear() {
      if (this.cardMonth < this.minCardMonth) {
        this.cardMonth = "";
      }
    }
  },
  validations: {
    cardNumber: {
      required,
      minLength: minLength(19)
    },
    cardName: {
      required,
      minLength: minLength(6)
    },
    cardYear: {
      required,
      minLength: minLength(2)
    },
    cardMonth: {
      required,
      minLength: minLength(2)
    },
    cardCvv: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(4)
    }
  },
  methods: {
    handleSubmit() {
      this.submitted = true
      
      if (this.$v.$invalid) { // gecersiz form
        return
      }

      const data = {
        "hotel_id": parseInt(this.selectedHotel.id),
        "start_date": this.moment(this.checkInDate).format('YYYY-MM-DD'),
        "end_date": this.moment(this.checkOutDate).format('YYYY-MM-DD'),
        "adult": this.personCount,
        "child": this.childCount,
        "room_type": this.selectedHotelDetail.room_type.filter(type => type.title == this.selectedRoomType)[0].id,
        "room_scenic": this.selectedHotelDetail.room_scenic.filter(sc => sc.title == this.selectedRoomScenic)[0].id,
        "price": this.totalPrice,
        "coupon_code": null,
        "card_name": this.cardName,
        "card_number": this.cardNumber.split(' ').join(''),
        "card_date_month": this.cardMonth,
        "card_date_year": (typeof this.cardYear) == 'number' ?  JSON.stringify(this.cardYear) : this.cardYear,
        "card_cvv": this.cardCvv
      }

router.push('payment-completed')
      this.axios.post('https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-bookings', data)
      .then(response => {
        console.log(response)
      })
      .catch(_ => {
      this.paymentError = 'Rezervasyon sırasında bir hata oluştu!'
    });
    },
    flipCard (status) { 
      this.isCardFlipped = status;
    },
    focusInput (e) {
      this.isInputFocused = true;
      let targetRef = e.target.dataset.ref;
      let target = this.$refs[targetRef];
      this.focusElementStyle = {
        width: `${target.offsetWidth}px`,
        height: `${target.offsetHeight}px`,
        transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`
      }
    },
    blurInput() {
      let vm = this;
      setTimeout(() => {
        if (!vm.isInputFocused) {
          vm.focusElementStyle = null;
        }
      }, 300);
      vm.isInputFocused = false;
    }
  }
}
</script>
