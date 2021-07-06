<template>
  <div class="navigation-menu">
    <ul class="nav nav-fill mt-5 mb-3">
      <li class="nav-item" :class="{ active: step == 1 }">
        <div class="nav-icon">
          <i class="fa fa-calendar"></i>
        </div>
        <span
          class="nav-link">
          Otel ve Tarih<br>Seçimi
        </span>
      </li>
      <li class="nav-item" :class="{ active: step == 2 }">
        <div class="nav-icon">
          <i class="fa fa-bed"></i>
        </div>
        <span class="nav-link">
          Oda Tipi ve Manzara<br>Seçimi
        </span>
      </li>
      <li class="nav-item" :class="{ active: step == 3 }">
        <div class="nav-icon">
          <i class="fa fa-credit-card"></i>
        </div>
        <span class="nav-link">
          Önizleme ve Ödeme<br>İşlemleri
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'NavigationMenu',
  props: {},
  computed: {
    ...mapState([
      'step',
    ]),
  },
  methods: {
    ...mapActions([
      'updateStep'
    ])
  }
};
</script>


<style lang="scss">
.navigation-menu {
  .nav-item {
    opacity: .3;
    &.active {
      opacity: 1;
    }
    .nav-icon {
      width: 55px;
      height: 55px;
      border: 1px solid #000;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: auto;
      i {
        font-size: 25px;
        color: #000;
      }
    }
    span {
      font-weight: 700;
    }
  }
}
</style>
