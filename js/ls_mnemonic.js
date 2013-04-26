$(function() {
	var pageSize = 10, pageNo = 1, pageItem = 0;
	//本地存储
	$('#add').click(function() {
		if (('localStorage' in window) && window['localStorage'] !== null) {
			if (addcheck()) {
				ls_key = $('#ls_key').val();
				if(ls_key==''){
					alert('助记码不能为空哦！');
					return ;
				}
				ls_value = $('#ls_value').val();
				if(ls_value==''){
					alert('助记词不能为空哦！');
					return ;
				}
				var strname = ls_key + "," + ls_value + ";";
				//json形式存储
				var strvalue = {
					'ls_key' : ls_key,
					'ls_value' : ls_value
				};
				localStorage.setItem(strname, JSON.stringify(strvalue));
				alert("保存成功");
				$('#ls_key').val("");
				$('#ls_value').val("");
			}
		} else {
			alert('天啊，你还在用这么土的浏览器');
		}
	});

	$('#Clear_Mnemonic').click(function() {
		alert('clear');
		if (('localStorage' in window) && window['localStorage'] !== null) {
			if (confirm("您确认清空所有的助记码吗?")) {
				localStorage.clear();
			}
		} else {
			alert('天啊，你还在用这么土的浏览器');
		}
	});

	//查询
	$('#Q_Mnemonic').click(function() {
		if (querycheck()) {
			query(1, 10);
		} else {
			alert('天啊，你还在用这么土的浏览器');
		}
	});

	//删除
	$('#Del_Mnemonic').click(function() {
		if (('localStorage' in window) && window['localStorage'] !== null) {
			if (querycheck()) {
				//遍历
				var checkedLength = $("input[type=checkbox][id='test'][checked]").length
				alert(checkedLength);

				var begindate = $('#beginDate').val();
				var enddate = $('#endDate').val();
				var deslimit = $('#deslimit').val();
				var i;
				for ( i = 0; i < localStorage.length; i++) {
					var key = localStorage.key(i);
					var obj = localStorage.getItem(key);
					var ls_key = JSON.parse(obj).ls_key;
					alert(ls_key);
					var ls_value = JSON.parse(obj).ls_value;
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
	$('#ascPageNo').click(function() {
		if (querycheck()) {
			var pageNo = pageNo + 1;
			alert(pageNo);
			query(pageNo, pageSize);
		} else {
			alert('天啊，你还在用这么土的浏览器');
		}
	});
	$('#descPageNo').click(function() {
		if (querycheck()) {
			var pageNo = pageNo - 1;
			alert(pageNo);
			query(pageNo, pageSize);
		} else {
			alert('天啊，你还在用这么土的浏览器');
		}
	});

	function query(pageNo, pageSize) {
		if (('localStorage' in window) && window['localStorage'] !== null) {
			//清除之前添加的内容
			$('.model-body table tr').remove();
			var th = "<tr class='primary' style='background-color: #E5E5E5'><th field='check'><input onclick='if(this.checked==true) { checkAll('test'); } else { clearAll('test'); }' type='checkbox' value='' name='test' title='全选/取消'/></th><th >助记码</th><th>助记词</th></tr>";
			$(th).appendTo($('.model-body table'));
			//遍历
			pageItem = localStorage.length;
			var pnsmax = pageNo * pageSize;
			if(pnsmax>pageItem){
				pnsmax = pageItem;
			}
			var i = (pageNo - 1) * pageSize;
			for (i; i < pnsmax; i++) {
				var key = localStorage.key(i);
				var obj = localStorage.getItem(key);
				var ls_key = JSON.parse(obj).ls_key;
				var ls_value = JSON.parse(obj).ls_value;
				var temp = "<tr class='success'><td><input type='checkbox' name='test' value='a' id='test'/></td><td>" + ls_key + "</td>" + "<td>" + ls_value + "</td>";
				$(temp).appendTo($('.model-body table'));
			}
		}
	}



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

