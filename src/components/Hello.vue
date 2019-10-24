<template>
    <div class="hello">
        <h1>{{msg}}</h1>
        <counter v-bind:num="num" v-on:incre="increment" v-on:decre="decrement"></counter>
        <span>parent : {{num}}</span>
    </div>
</template>

<script>
    import Counter from './Counter'
    export default {
        name:"hello",
        data(){
            return{
                num:10,
                msg:"Welcome to Vue,"
            }
        },
        components:{
            Counter
        }, 
        methods:{
            increment(){
this.num++;
            },
            decrement(){
                this.num--;
            }
        }
    }
</script>

<style scoped>
 h1{
     font-weight: normal;
 }

</style>