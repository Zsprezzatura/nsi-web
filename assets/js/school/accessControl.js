//高级搜索 分页可用(权限三的)
function advanceSearch02(msg) {
    $('#innerWrap').html('')
    $('#loadgif').show()
    $('#floatLayer').show() //遮罩层
        // var area = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        // eduSystem = ['0', '0', '0', '0'],
        // course = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        // // buildSchoolTime = $('#buildSchoolTime').val() =='' ? 0 : $('#buildSchoolTime').val()
        // buildSchoolTime = ($('#buildSchoolTime').val() == '' ? 0 : $('#buildSchoolTime').val()).toString(),
     
    var area = [],
        eduSystem = [],
        properties = [],
        course = []
        buildSchoolTime = ($('#buildSchoolTime').val() == '' ? "" : $('#buildSchoolTime').val()).toString(),

        console.log(buildSchoolTime)
    console.log(typeof(buildSchoolTime))
    $('#AdvanDivID01 input:checkbox:checked').each(function() {
        // area[$(this).val() - 1] = $(this).val()
        area.push($(this).val())
    });
    $('#AdvanDivID02 input:checkbox:checked').each(function() {
        // area[$(this).val() - 1] = $(this).val()
        eduSystem.push($(this).val())
    });
    $('#AdvanDivID03 input:checkbox:checked').each(function() {
        // area[$(this).val() - 1] = $(this).val()
        properties.push($(this).val())
    });
    $('#AdvanDivID04 input:checkbox:checked').each(function() {
        // area[$(this).val() - 1] = $(this).val()
       course.push($(this).val())
    });
    $('#AdvanDivID05 input:checkbox:checked').each(function() {
        // area[$(this).val() - 1] = $(this).val()
       buildSchoolTime.push($(this).val())
    });
    // myAjax(data02, changeUrl.address + "/school/power_search.do", accessControl02) //分页搜索
    console.log(area)
        // $('#AdvanDivID02 input:checkbox:checked').each(function() {
        //     eduSystem[$(this).val() - 1] = $(this).val()
        // });
        // $('#AdvanDivID03 input:checkbox:checked').each(function() {
        //     course[$(this).val() - 1] = $(this).val()
        // });
        $.ajax({
            type: 'get', //提交方式 post 或者get
            async: true,
            traditional: true, //必须加上该句话来序列化
            // dataType: 'jsonp',
            data: {
                'properties': properties,
                'area': area,
                'system': eduSystem,
                'course': course,
                'fondTime': buildSchoolTime,
                'pageNum': 1,
                'pageSize': 20
            }, //提交的参数
            // jsonp: 'Callback',
            url: changeUrl.address + "/school/power_search.do", //提交到那里 后他的服务
            success: function(data) {
                // alert("成功了");//弹出窗口，这里的msg 参数 就是访问aaaa.action 后 后台给的参数
                console.log(data.data.total)
                // var totalPages = Math.ceil((msg.countAllRS / 20));
                //分页
                layui.use(['layer', 'laypage', 'element'], function() {
                    var layer = layui.layer,
                        laypage = layui.laypage,
                        element = layui.element();
                    laypage({
                        cont: 'pageDemo01', //分页容器的id
                        pages: data.data.total, //总页数
                        skin: '#5FB878', //自定义选中色值
                        //,skip: true //开启跳页
                        jump: function(obj, first) {
                            $('#innerWrap').html('')
                            $('#loadgif').show()
                            $('#floatLayer').show() //遮罩层
                            var data02 = {
                                'properties': properties,
                                'area': area,
                                'system': eduSystem,
                                'course': course,
                                'fondTime': buildSchoolTime,
                                'pageNum': obj.curr,
                                'pageSize': 20
                            }
                            // if (data.countAllRS != 0) {
                            //     myAjax(data01, changeUrl.address + "/school/power_search.do", accessControl02)
                            // } else {
                            //     $('#loadgif').hide()
                            //     $('#floatLayer').hide() //遮罩层
                            // }
                            myAjax(data02, changeUrl.address + "/school/power_search.do", accessControl02) //分页搜索
                        }
                    });
                })
                $('.gengeralSearchNum').text(data.data.total)
                $('.noData').css('display', 'none')
                $('.generalSearchResult').css('display', 'block')
            },
            error: function() {
                alert('请求数据失败')
            }
        });

    // var data02 = {
    //     'properties': properties,
    //     'area': area,
    //     'system': eduSystem,
    //     'course': course,
    //     'fondTime': buildSchoolTime,
    //     'pageNum': 1,
    //     'pageSize': 20
    // }
    // myAjax(data02, changeUrl.address + "/school/power_search.do", accessControl02) //分页搜索
};



//创建搜索列表，搜索20条
function accessControl02(msg) {
    console.log(msg);
    // console.log(msg.data.list);           

    for (var i = 0; i < msg.data.list.length; i++) {
        var imgSrc = msg.data.list[i].schoolLogo ?  changeUrl.imgAddress + msg.data.list[i].schoolLogo : '../assets/img/schoolNoPic.png';
        $('#innerWrap').append(
            '<div class="thumbnail clearfix overInfo">' +
            '<img src="' + imgSrc + '" alt="新学说"  class="pull-left schoolPic" >' +
            '<div class="pull-left clearfix leftInfo">' +
            '<h4 class="h4 schoolName"><a href="./detail.html?School_name=' + msg.data.list[i].id + '&whereFrom=search">' + zeroToEmpty(msg.data.list[i].schoolName) + '</a></h4>' +
            '<p><span>' + zeroToEmpty(msg.data.list[i].schoolProperties) + '</span> | <span class="buildTime">建校时间：' + zeroToEmpty(msg.data.list[i].foundedTime) + '</span></p>' +
            '<p class="mobieHidden"><span >学制：' + zeroToEmpty(msg.data.list[i].schoolSystem) + '</span> | <span>课程：' + zeroToEmpty(msg.data.list[i].course) + '</span></p>' +
            '<p class="pcHidden">学制：' + zeroToEmpty(msg.data.list[i].schoolSystem) + '</p>' +
            '<p class="pcHidden">课程：' + zeroToEmpty(msg.data.list[i].course) + '</p>' +
            '</div>' +
            '<div class="pull-right rightInfo">' +
            '<p class="clearfix"><span class="glyphicon glyphicon-globe"></span> <span class="schoolSite">' + zeroToEmpty(msg.data.list[i].areas) + '</span></p>' +
            // '<p>提交用户：'+ msg[i].Load_People +'</p>' +
            '<p class="submitTime"><span class="glyphicon glyphicon-time"></span> 提交时间：' + loadTimeCut(msg.data.list[i].loadTime) + '</p>' +
            '</div>' +
            '</div>'
        )
    }
}

//三级权限，搜索20条,分页可用
function generalSearch03(msg) {
    var passVal = $('#searchContent').val()
    var sort = $("#sort").val()
    $.ajax({
        type:"get",  
        async: true,
        traditional: true,
        data: {
            'searchKey': passVal,
            'pageNum': 1,
            'pageSize': 20,
            'orderBy':sort
        }, //提交的参数
        url: changeUrl.address + "/school/list.do", //获取搜索的总条数
        success:  function(data) {
            console.log(data.data.total)
            var totalPages = Math.ceil((data.countAllRS / 20));
            //分页
            layui.use(['layer', 'laypage', 'element'], function() {
                var layer = layui.layer,
                    laypage = layui.laypage,
                    element = layui.element();
                laypage({
                    cont: 'pageDemo01', //分页容器的id
                    pages: data.data.total, //总页数
                    skin: '#5FB878', //自定义选中色值
                    //,skip: true //开启跳页
                    jump: function(obj, first) {
                        $('#innerWrap').html('')
                        $('#loadgif').show()
                        $('#floatLayer').show() //遮罩层
                        var passVal = $('#searchContent').val()
                        var data01 = {
                            'searchKey': passVal,
                            'pageNum': obj.curr,
                            'pageSize': 20,
                            'orderBy':sort
                        }
                        if (data.countAllRS != 0) {
                            myAjax(data01, changeUrl.address + "/school/list.do", accessControl02)
                        } else {
                            $('#loadgif').hide()
                            $('#floatLayer').hide() //遮罩层
                        }
                    }
                });
            })
            $('.gengeralSearchNum').text(data.data.total)
            $('.noData').css('display', 'none')
            $('.generalSearchResult').css('display', 'block')
        },
        error: function() {
            alert('请求数据失败！');
        }
    });
}

//普通搜索加分页 + 权限管理
$(function() {
    console.log($.cookie('usertitle'))
    var num = $.cookie('usertitle');
    if (num == undefined) {
        //导航条登录显示控制
        $('.rightNav li').eq(1).css('display', 'block')
        $('.rightNav li').eq(2).css('display', 'block')
        $('.rightNav li').eq(3).css('display', 'none')
        $('.rightNav li').eq(4).css('display', 'none')
            //普通搜索
        $('#searchBtn').click(function() {
            generalSearch03();
            return false;
        })
        $('#searchContent').keydown(function(e) {
                var curKey = e.which; //兼容火狐
                if (curKey == 13) {
                    generalSearch03();
                }
            })
            //高级搜索权限
        $("#AdvanceSubmitID").click(function() {
            $('#myModal02').modal({
                keyboard: true
            })
            return false; //阻止默认的表单提交
        })
        accessData(generalSearch03) //不同权限初始加载数据
    } else {
        $('#searchBtn').click(function() {
            generalSearch03();
            return false;
        })
        $('#searchContent').keydown(function(e) {
                var curKey = e.which; //兼容火狐
                if (curKey == 13) {
                    generalSearch03();
                }
            })
            //高级搜索权限 高级搜索按钮 点击事件
        $("#AdvanceSubmitID").click(function() {
            advanceSearch02();
            return false; //阻止默认的表单提交
        })
        accessData(generalSearch03) //不同权限初始加载数据
    }
})

function accessData(fn) {
    var args = getQueryStringArgs();
    var sort = $("#sort").val()
    if (jQuery.isEmptyObject(args)) {
        var data02 = {
            'searchKey': '',
            'pageNum': 1,
            'pageSize': 10,
            'orderBy':sort
        }
        myAjax(data02, changeUrl.address + '/school/list.do', fn)
        $('#generalSearchResult').css('display', 'none')
    } else {
        var datailSchool = decodeURIComponent(args['whereFrom'])
        var advanceSearch = decodeURIComponent(args['advanceSearch'])
            // console.log(datailSchool,advanceSearch)
        var data01 = {
            'searchKey': datailSchool,
            'pageNum': 1,
            'pageSize': 10,
            'orderBy':sort
        }
        $("#sort").change(function(){
            generalSearch03();
        });
        $('#searchContent').val(datailSchool)
        $('#innerWrap').html('')
        myAjax(data01, changeUrl.address + '/school/list.do', fn)
        if (advanceSearch == 500) {
            $('#AdvancedSearchID').toggle(500)
            window.onload = function() {
                $(window).scrollTop(350)
            }
        }
    }
}



