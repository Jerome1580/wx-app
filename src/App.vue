<script>
  import { get } from './util'

export default {
    async created () {
      // const res = await get("/weapp/demo");
      // console.log(123,res);
      console.log('小程序启动了')
  }
  }
</script>

<style>
.text-primary{
	color:#EA5A49;
}
.text-footer{
	margin-bottom: 5px;
	text-align: center;
	font-size: 12px;
}
.btn{
	color: white;
	background: #EA5A49;
	margin-bottom: 10px;
	padding-left: 15px;
	padding-top: 7px;
	border-radius: 2px;
	font-size: 16px;
	height: 40px;
	width: 100%;
}

.btn.active{
	background: #FA5A49;
}
</style>
