<template>
    <div id="main">
        <div id="top">
            <section id="list">
                <ul>
                
                </ul>
                <div id="small">
                    
                </div>
            </section>
            <section id="show">
            
            </section>
        </div>
        <div id="bottom"></div>
    </div>
</template>

<style>
    #main{
        background: red;
        height: 93.2%;
        display: flex;
        flex-direction: column;
    }
    #top{
        display: flex;
        flex-grow: 1;
        flex-direction: row;
        background: #000;
    }
    #list{
        width: 20%;
        height: inherit;
        display: flex;
        flex-direction: column;
    }
    #list > ul{
        width: 100%;
        height: 88%;
        background: #ccc;
    }
    #list > #small{
        width: 100%;
        height: 12%;
    }
    #show{
        background: black;
        flex-grow: 1;
        background: green;
    }
    #bottom{
        height: 60px;
        background: blue;
        width: 100%;
    }
</style>

<script>

</script>
