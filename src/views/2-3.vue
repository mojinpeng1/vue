<template>
  <div class="home">
  </div>
</template>

<script>
  // 并发请求： 同时进行多个请求，并同意处理返回值
import axios from 'axios'

export default {
  name: 'axios-2-3',
  components: {
  },
  created(){
      // axios.all()   axios.spread()
      axios.all([
          axios.get('/data.json'),
          axios.get('/city.json')
          ]
      ).then(
          axios.spread((dataRes,cityRes)=>{
              console.log(dataRes);
              console.log(cityRes);

          })
      )
  }
}
</script>
