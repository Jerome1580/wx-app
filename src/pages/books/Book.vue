<template>
    <div>
      <Card :key="book.id" v-for="book in books" :book="book">{{book.title}}</Card>
    </div>
</template>

<script>
import {get}  from '@/util';
import Card from '@/components/Card'
 
export default {
  components:{
    Card
  },
  name: "Me",
  data(){
    return {
      books:[]
    }
  },
  mounted(){
    this.getList()
  },
  methods:{
    async getList(){
      const books = await get('/weapp/bookList')
      this.books = books.list
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
