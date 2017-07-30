<template>
    <div id="downloadshow">
        <h5>
            <span class="bg" ><router-link to="/main/downloadManage/singleMusic">已下载单曲</router-link></span>
            <span><router-link to="/main/downloadManage/download/MV">已下载电台节目</router-link></span>
            <span><router-link to="/main/downloadManage/downloadMV">已下载MV</router-link></span>
            <span><router-link to="/main/downloadManage/downloadNow">正在下载</router-link></span>
        </h5>
        <router-view></router-view>
    </div>
</template>

<script>
export default{

}
</script>
<style>
    #downloadshow{
        flex-grow: 1;
        background: #fafafa;
    }
    #downloadshow h5{
        padding: 15px;
        text-align: center;
        border-bottom: 1px solid rgba(0, 0, 0, .6);
    }
    h5 > span{
        display: inline-block;
        padding: 5px 10px;
        border: 1px solid black;
        border-radius: 5px;
    }
    h5 > span > a{
        text-decoration: none;
        color: black;
        font-weight: 100;
    }
    .bg{
        background: #7c7d85;
        color: white !important;
    }
</style>
