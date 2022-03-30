<template>
  <div class="skeleton">
    <div class="skeleton--content">
      <div class="skeleton--content-wrapper">
        <div class="loader skeleton--title"></div>
      </div>
      <div class="skeleton--content-wrapper skeleton--table">
        <div class="skeleton--tr">
          <div class="loader skeleton--th"></div>
          <div class="loader skeleton--th skeleton--td__3"></div>
          <div class="loader skeleton--th skeleton--td__2"></div>
          <div class="loader skeleton--th skeleton--td__5"></div>
          <div class="loader skeleton--th skeleton--td__4"></div>
        </div>
        <div class="skeleton--tr">
          <div class="loader skeleton--td"></div>
          <div class="loader skeleton--td skeleton--td__3"></div>
          <div class="loader skeleton--td skeleton--td__2"></div>
          <div class="loader skeleton--td skeleton--td__5"></div>
          <div class="loader skeleton--td skeleton--td__4"></div>
        </div>
        <div class="skeleton--tr">
          <div class="loader skeleton--td"></div>
          <div class="loader skeleton--td skeleton--td__3"></div>
          <div class="loader skeleton--td skeleton--td__2"></div>
          <div class="loader skeleton--td skeleton--td__5"></div>
          <div class="loader skeleton--td skeleton--td__4"></div>
        </div>
        <div class="skeleton--tr">
          <div class="loader skeleton--td"></div>
          <div class="loader skeleton--td skeleton--td__3"></div>
          <div class="loader skeleton--td skeleton--td__2"></div>
          <div class="loader skeleton--td skeleton--td__5"></div>
          <div class="loader skeleton--td skeleton--td__4"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "TableListLoader",
});
</script>

<style scoped lang="less">
  @import "./table-list-loader.less";
</style>
