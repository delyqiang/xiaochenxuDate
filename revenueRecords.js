/*解决了小程序组件picker-view日期不分闰年及大小月的问题

有疑问的可以加我微信 QQQ466125

想加群的加我好友拉你，前端开发群/官方沙雕群（2个） 备注‘github进群’

欢迎关注公众号： 学前端呢

公众号微信：web66666688
*/

const date = new Date();//获取系统日期
const years = []
const months = []
const days = []
const bigMonth = [1, 3, 5, 7, 8, 10, 12]

//将日期分开写入对应数组

//年
for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i);
}

//月
for (let i = 1; i <= 12; i++) {
  months.push(i);
}

//日
for (let i = 1; i <= 31; i++) {
  days.push(i);
}


Page({

  /**
  * 页面的初始数据
  */
  data: {
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    days: days,
    day: 2,
    value: [9999, 1, 1],
  },
  showToask: function () {
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })
  },
  //判断元素是否在一个数组
  contains: function (arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) {
        return true;
      }
    }
    return false;
  },
  setDays: function (day) {
    const temp = [];
    for (let i = 1; i <= day; i++) {
      temp.push(i)
    }
    this.setData({
      days: temp,
    })
  },

  showLoading: function () {
    wx.showLoading({
      title: '加载中...',
    }),
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
  },
  //选择滚动器改变触发事件
  bindChange: function (e) {
    const val = e.detail.value;
    //判断月的天数
    const setYear = this.data.years[val[0]];
    const setMonth = this.data.months[val[1]];
    const setDay = this.data.days[val[2]]
    console.log(setYear + '年' + setMonth + '月' + setDay + '日');
    //闰年
    if (setMonth === 2) {
      if (setYear % 4 === 0 && setYear % 100 !== 0) {
        console.log('闰年')
        this.setDays(29);
      } else {
        console.log('非闰年')
        this.setDays(28);
      }
    } else {
      //大月
      if (this.contains(bigMonth, setMonth)) {
        this.setDays(31)
      } else {
        this.setDays(30)
      }
    }
    this.setData({
      year: setYear,
      month: setMonth,
      day: setDay
    })
  }
})
