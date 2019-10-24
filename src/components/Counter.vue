<template>
    <div>
        <button @click="increment">+</button>
        <button @click="decreament">-</button>
        <p><span>{{num}}</span></p>
    </div>
</template>

<script>
    export default {
        name:"conter",
        props:['num'],
        data(){
            return {
              
            }
        },
        methods:{
            increment(){
                this.$emit("incre");
            },
            decreament(){
               this.$emit("decre");
            }
        }
        
    }
</script>

<style scoped>

</style>