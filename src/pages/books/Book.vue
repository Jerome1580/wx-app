<template>
    <div>
      <TopSwiper :tops="tops"></TopSwiper> 
      <Card :key="book.id" v-for="book in books" :book="book">{{book.title}}</Card>
      <p class="text-footer" v-if="!more">没有更多数据</p>
    </div>
</template>

<script>
import { get } from "@/util";
import Card from "@/components/Card";
import TopSwiper from "@/components/TopSwiper";

export default {
  components: {
    Card,
    TopSwiper
  },
  name: "Me",
  data() {
    return {
      books: [],
      page: 0,
      more: true,
      tops:[]
    };
  },
  mounted() {
    this.getList(true);
    this.getTop();
  },
  onPullDownRefresh() {
    // 下拉刷新
    this.getList(true);
  },
  onReachBottom() {
    // 监听触底上拉触底
    if (!this.more) {
      // 没有更多
      return false;
    } else {
      this.page = this.page + 1;
      this.getList();
    }
  },
  methods: {
    async getList(init) {
      if (init === true) {
        this.page = true;
        this.more = true;
      }
      wx.showNavigationBarLoading();
      const books = await get("/weapp/bookList", { page: this.page });
      if (books.list.length < 10 && this.page > 0) {
        this.more = false;
      }
      if (init) {
        this.books = books.list;
        wx.stopPullDownRefresh();
      } else {
        // 下拉刷新累加
        this.books = this.books.concat(books.list);
      }
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
    },
    async getTop() {
      const tops = await get("/weapp/top");
      this.tops = tops.list;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
