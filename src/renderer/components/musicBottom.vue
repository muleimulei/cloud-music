<template>
	<div id="bottom">
        <div id="ctrl">
            <span><i class="fa fa-step-backward" aria-hidden="true"></i></span>
            <span><i class="fa fa-stop" aria-hidden="true"></i></span> 
            <span><i class="fa fa-step-forward" aria-hidden="true"></i></span> 
        </div>
        <div id="bar">
            <span>00.48</span>
            <div>
                <div class="progress"></div>
                <i id="point"></i>
            </div>
            <span>03.59</span>
        </div>
        <div id="voice">
            <div id="vbar">
                <div class="v_progress"></div>
            </div>
        </div>
        <div id="lyric">
            <span>
                <i class="fa fa-circle-o-notch" aria-hidden="true"></i>
            </span>
            <span>词</span>
            <span><i class="fa fa-list-alt" aria-hidden="true"></i></span>
        </div>
    </div>
</template>

<script>
	export default{

	}
</script>

<style>
@import './fontawesome/css/font-awesome.css';
#bottom,#ctrl{
    display: flex;
    flex-direction: row;
}

#ctrl{
    align-items: center;
    padding-left: 30px;
}

#ctrl > span{
    display: block;
    width: 30px;
    height: 30px;
    background: orange;
    opacity: .7;
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
}
#ctrl > span:hover{
    opacity: 1;
}
#ctrl > span:not(:first-child){
    margin-left: 10px;
}

#ctrl > span > i{
    text-align: center;
    margin-top: 7px;
    color: white;
    font-size: 1em;
}

#bar{
    display: flex;
    flex-direction: row;
    width: 50%;
    margin-left: 30px;
    align-items: center;
}
#bar > span{
    font-size: .8em;
    margin: 0 10px;
}
#bar > div{
    width: 100%;
    height: 5px;
    background: gray;
    position: relative;
    border-radius: 2px;
}
#bar > div > i#point{
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    display: block;
    top: 0;
    left: 0;
    background: white;
    transform: translate(0, -5px);
}
i#point::after{
    content: "";
    display: block;
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 100%;
    background: orange;
    top: 50%;
    left: 50%;
    transform: translate(-3.5px, -3.5px);
}
#voice{
    display: flex;
    align-items: center;

}
#voice > #vbar{
    width: 100px;
    height: 5px;
    border-radius: 2px;
    background: gray;
    margin-left: 40px;
    position: relative;
    cursor: pointer;
}
#vbar::before{
    content: "\f028";
    position: absolute;
    font: normal normal normal 14px/1 FontAwesome;
    left: -20px;
    top: -4px;
}
#lyric{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 20px;
}
#lyric > span{
    margin: 0 20px;
    cursor: pointer;
}

#lyric > span:nth-child(2){
    border: 1px solid rgba(0, 0, 0, .5);
    font-size: .8em;
}
</style>
