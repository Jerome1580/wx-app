<template>
  <div>
    <BookInfo :info="info"></BookInfo>
  </div>
    
</template>

<script>
import { get } from "@/util";
import BookInfo from "@/components/BookInfo";

export default {
  name: "Detail",
  components: {
    BookInfo
  },
  data() {
    return {
      bookid: "",
      info: {}
    };
  },
  mounted() {
    this.bookid = this.$root.$mp.query.id;
    this.getDetail();
  },
  methods: {
    async getDetail() {
      const info = await get("/weapp/bookdetail", { id: this.bookid });
     
      wx.setNavigationBarTitle({
        title: info.title
      });
      this.info = info;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
