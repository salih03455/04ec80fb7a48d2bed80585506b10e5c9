<template>
  <div class="header">
    <div class="header__left">
      <span>Otel</span>
      <span>Rezervasyon Sistemi</span>
    </div>
    <div class="header__right">
      <button>Yeni Rezervasyon Yap</button>
    </div>
  </div>
</template>

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