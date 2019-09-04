(function () {


    function random(lower, upper) {
        return Math.floor(Math.random() * (upper - lower+1)) + lower;
    };
    var JMS = function (id,rowCount,colCount, minLandMineCount, maxLandMineCount) {
        if (!(this instanceof JMS))
            return new JMS(id, rowCount, colCount, minLandMineCount, maxLandMineCount);
        this.doc = document;
        this.table = this.doc.getElementById(id);//画格子的表格
        this.cells = this.table.getElementsByTagName("td");//小格子
        this.rowCount = rowCount || 10;//格子行数
        this.colCount = colCount || 10;//格子列数
        this.landMineCount = 0;//地雷个数
        this.markLandMineCount = 0;//标记的地雷个数
        this.minLandMineCount = minLandMineCount || 10;//地雷最少个数
        this.maxLandMineCount = maxLandMineCount || 20;//地雷最多个数
        this.arrs = [];//格子对应的数组
        this.beginTime = null;//游戏开始时间
        this.endTime = null;//游戏结束时间
        this.currentSetpCount = 0;//当前走的步数
        this.endCallBack = null;//游戏结束时的回调函数
        this.landMineCallBack = null;//标记为地雷时更新剩余地雷个数的回调函数
        this.first_mine = 0;
        this.doc.oncontextmenu = function () {//禁用右键菜单
            return false;
        };
        this.play = function ()
        {
            this.landMineCount = 9;
            landMineCount_handle = document.getElementById("landmine_count");
            landMineCount_handle.innerHTML = this.landMineCount;
            this.beginTime =  new Date();

            var time_show = document.getElementById("cost_time");
            timeHandle = setInterval(function () {
                time_show.innerHTML = parseInt((new Date() - jms.beginTime) / 1000);
            }, 1000);

            this.bindCells();

        };

        this.drawMap();
    };

    JMS.prototype = {
        //画格子
        drawMap: function () {
            var tds = [];
            for (var i = 0; i < this.rowCount; i++) {
                tds.push("<tr>");
                for (var j = 0; j < this.colCount; j++) {
                    tds.push("<td id='m_" + i + "_" + j + "'></td>");
                }
                tds.push("</tr>");
            }
            this.setTableInnerHTML(this.table, tds.join(""));
        },
        //添加HTML到Table
        setTableInnerHTML: function (table, html) {
            if (navigator && navigator.userAgent.match(/msie/i)) {
            } else {
                table.innerHTML = html;
            }
        },

        bindCells: function() {
            var self = this;
            for (var i = 0; i < this.rowCount; i++) {
                for (var j = 0; j < this.colCount; j++) {
                    (function (row, col) {
                        self.doc.getElementById("m_" + i + "_" + j).onmousedown = function(e)
                        {
                            var current_id = e.target.id;
                            var current_id_list = current_id.split("_")
                            var num_location = parseInt(current_id_list[1])*10 + parseInt(current_id_list[2])
                            // console.log(num_location)
                            console.log(self.rowCount)
                            self.init(num_location);

                            // alert(current_id);

                        }
                    })(i,j);
                }
            }

        },


        init: function(num_location) {

            if(!(this.first_mine))
            {

                var mine_arrs = [];
                mine_arrs.push(num_location);
                var count = this.rowCount * this.colCount - 1;
                for (var i=0; i<10;){
                    var num = random(0, count)
                    console.log(num)
                    if((mine_arrs.indexOf(num) == -1))
                    {
                        i++;
                        this.arrs[num] = 9;
                        console.log("yes" + num)
                        var div_location_x= parseInt(num/10);
                        var div_location_y= num%10;
                        mine_arrs.push(num);
                    }
                }

                this.first_mine = 1;
            }

            var near_num = [];
            near_num.push(num_location-11);
            near_num.push(num_location-10);
            near_num.push(num_location-9);
            near_num.push(num_location-1);
            near_num.push(num_location+1);
            near_num.push(num_location+9);
            near_num.push(num_location+10);
            near_num.push(num_location+11);

            for(var j=0;j<near_num.length; j++)
            {
                var index = near_num[j];
                if(this.arrs[index] == 9)
                {
                    console.log(num_location);
                    console.log(index);
                    console.log("yes");
                }
            }
        }

    };

    window.JMS = JMS;
})();
