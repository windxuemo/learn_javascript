var jms = null, timeHandle = null;

window.onload = function () {
    var radios = document.getElementsByName("level");

    for(var i=0, j= radios.length; i <j; i++)
    {

        radios[i].onclick = function(){
            if (jms != null)
            {
                if(jms.landMineCount > 0)
                {
                    if(!confirm("确定结束当前游戏？"))
                    {
                        return false;
                    }
                }

            }

        }


    }

    init(10,10);
}


function init(row_count, col_count, min_landmine_count, max_landmine_count){

    jms = JMS("landmine", row_count, col_count, min_landmine_count, max_landmine_count)


    begin_button = document.getElementById("begin");
    begin_button.onclick =  function (){
    jms.play();

    }

}
