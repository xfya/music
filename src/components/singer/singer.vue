<template>

    <div class=''>
        {{parentid[0].slice(0,5)}}
        <p>{{datas | filters(0,5)}}</p>
    </div>

 </template>

<script>

    export default {

        data() {
            return {
            parentid:['123456789']

            }
        },
        created(){
            this.datas = 'xfa123456'
        }
    }
</script>

<style>

</style>