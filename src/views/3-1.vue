<template>
  <div class="home">
  </div>
</template>

<script>
// axios 实列
import axios from 'axios'
export default {
  name: 'axios3-1',
  components: {
  },
  created(){
      // 创建实列
      let instance = axios.create({
          baseURL:'http://lcalhost:8080',
          timeout:1000
      })

      instance.get('/data.json').then(res => {
          console.log(res);
      })

      let $ = axios.create({
          baseURL:'http://localhost:9090',
          timeout:5000
      })
      $.get('/city.json').then(res => {
          console.log(res);
      })

  }
}
</script>
