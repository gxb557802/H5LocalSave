addbodytext = "<form class="+"form-horizontal"+"><div class="+"input-prepend "+
" align="+"center"+"><span class="+"add-on"+" ><font>Key&nbsp;&nbsp;：</font></span><input class="+
"span2"+" id="+"ls_key"+" type="+"text"+" value="+"助记码"+" maxlength="+"30"+
"/></div><br /><div class="+"input-prepend "+" style="+"margin-top: 20px;"+
"><span class="+"add-on"+"><font>Value：</font></span><input class="+
"span2"+" type="+"text"+" id="+"ls_value"+" value="+"助记词"+" maxlength="+"30"+
"/></div><br /><div class="+"input-prepend"+"  style="+"margin-top: 20px;"+
" ><div class="+"controls"+" align="+"right"+"><button type="+"submit"+
"  class="+"btn btn-inverse"+" id="+"submit"+">Add</button></div></div></form>";

$(function() {
	//本地存储
	$('#submit').click(function() {
		if (('localStorage' in window) && window['localStorage'] !== null) {
			if (addcheck()) {
				var strname = $('#ls_key').val() + "," + $('#ls_value').val() + ";";
				//json形式存储
				var strvalue = {
					'ls_key' : $('#ls_key').val(),
					'ls_value' : $('#ls_value').val(),
				};
				localStorage.setItem(strname, JSON.stringify(strvalue));
				$.messager.show({
					title : '提示',
					msg : '添加成功！'
				});
				$('#ls_key').val("助记码");
				$('#ls_value').val("助记词");
			}
		} else {
			alert('天啊，你还在用这么土的浏览器');
		}
	});

	$('#clear').click(function() {
		if (('localStorage' in window) && window['localStorage'] !== null) {
			if (confirm("确认清除?")) {
				localStorage.clear();
			}
		} else {
			alert('天啊，你还在用这么土的浏览器');
		}
	});

	//查询
	$('#Q_Mnemonic').click(function() {
		alert(1);
		if (('localStorage' in window) && window['localStorage'] !== null) {
			if (querycheck()) {
				//清除之前添加的内容
				$('.right table tr').remove();
				//遍历
				var begindate = $('#beginDate').val();
				var enddate = $('#endDate').val();
				var deslimit = $('#deslimit').val();
				var sum = 0;
				var th = "<tr><th class='th'>日期</th><th class='th'>金额</th><th class='th'>使用描述</th></tr>";
				$(th).appendTo($('.right table'));
				for (var i = 0; i < localStorage.length; i++) {
					var key = localStorage.key(i);
					var obj = localStorage.getItem(key);
					var inputdate = JSON.parse(obj).inputDate;
					var money = JSON.parse(obj).money;
					var description = JSON.parse(obj).description;
					if ((inputdate >= begindate) && (inputdate <= enddate)) {
						if (!deslimit == "") {
							if (description.indexOf(deslimit) != -1) {
								var temp = "<tr><td class='th'>" + inputdate + "</td>" + "<td class='th'>" + money + "</td>" + "<td class='th'>" + description + "</td></tr>";
								$(temp).appendTo($('.right table'));
								sum = parseFloat(sum) + parseFloat(money);
							}

						} else {
							var temp = "<tr><td class='th'>" + inputdate + "</td>" + "<td class='th'>" + money + "</td>" + "<td class='th'>" + description + "</td></tr>";
							$(temp).appendTo($('.right table'));
							sum = parseFloat(sum) + parseFloat(money);
						}

					}
				}
				if ($('.right table tr').size() == 1) {
					var temp1 = "<tr><td class='th'> </td><td class='th'>没有匹配数据</td><td class='th'></td></tr>";
					$(temp1).appendTo($('.right table'));

				}
				var tt = "<tr><th class='th'>合计</th><th class='th'>" + sum + "</th></tr>";
				$(tt).appendTo($('.right table'));
			}
		} else {
			alert('天啊，你还在用这么土的浏览器');
		}
	});

	//删除
	$('#delete').click(function() {
		if (('localStorage' in window) && window['localStorage'] !== null) {
			if (querycheck()) {
				//遍历
				var begindate = $('#beginDate').val();
				var enddate = $('#endDate').val();
				var deslimit = $('#deslimit').val();
				for (var i = 0; i < localStorage.length; i++) {
					var key = localStorage.key(i);
					var obj = localStorage.getItem(key);
					var inputdate = JSON.parse(obj).inputDate;
					var money = JSON.parse(obj).money;
					var description = JSON.parse(obj).description;
					if ((inputdate >= begindate) && (inputdate <= enddate)) {
						if (!deslimit == "") {
							if (description.indexOf(deslimit) != -1) {
								if (confirm("确认删除" + key)) {
									localStorage.removeItem(key);
									$('#query').triggerHandler("click");
								}

							}

						} else {
							if (confirm("确认删除" + key)) {
								localStorage.removeItem(key);
								$('#query').triggerHandler("click");
							}
						}

					}
				}
			}
		} else {
			alert('天啊，你还在用这么土的浏览器');
		}
	});

	function addcheck() {
		if ($('#money').val() == "") {
			alert("请输入金额");
			return false;
		}
		if ($('#description').val() == "") {
			alert("请输入使用描述");
			return false;
		}
		return true;
	}

	function querycheck() {
		if ($('#beginDate').val() == "") {
			alert("请输入开始日期");
			return false;
		}
		if ($('#endDate').val() == "") {
			alert("请输入结束日期");
			return false;
		}
		return true;
	}

})



$(function() {
	$('#money').focus(function() {
		var money_value = $(this).val();
		if (money_value == "请输入金额") {
			$(this).val("");
		}
	})
	$('#money').blur(function() {
		var money_value = $(this).val();
		if (money_value == "") {
			$(this).val("请输入金额");
		}
	})
	$('#description').focus(function() {
		var description_value = $(this).val();
		if (description_value == "请输入使用描述") {
			$(this).val("");
		}
	})
	$('#description').blur(function() {
		var description_value = $(this).val();
		if (description_value == "") {
			$(this).val("请输入使用描述");
		}
	})
})

