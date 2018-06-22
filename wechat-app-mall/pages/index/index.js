//index.js
//获取应用实例
var app = getApp()
Page({
      data: {
        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 1000,
        loadingHidden: false, // loading
        userInfo: {},
        swiperCurrent: 0,
        selectCurrent: 0,
        categories: [],
        activeCategoryId: 1,
        goods: [],
        scrollTop: "0",
        loadingMoreHidden: true,

        hasNoCoupons: true,
        coupons: [],
        searchInput: '',
      },

      tabClick: function(e) {
        this.setData({
          activeCategoryId: e.currentTarget.id
        });
        this.getGoodsList(this.data.activeCategoryId);
      },
      //事件处理函数
      swiperchange: function(e) {
        //console.log(e.detail.current)
        this.setData({
          swiperCurrent: e.detail.current
        })
      },
      toDetailsTap: function(e) {
        wx.navigateTo({
          url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
        })
      },
      tapBanner: function(e) {
        if (e.currentTarget.dataset.id != 0) {
          wx.navigateTo({
            url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
          })
        }
      },
      bindTypeTap: function(e) {
        this.setData({
          selectCurrent: e.index
        })
      },
      scroll: function(e) {
        //  console.log(e) ;
        var that = this,
          scrollTop = that.data.scrollTop;
        that.setData({
          scrollTop: e.detail.scrollTop
        })
        // console.log('e.detail.scrollTop:'+e.detail.scrollTop) ;
        // console.log('scrollTop:'+scrollTop)
      },
      onLoad: function() {
        var that = this
        wx.setNavigationBarTitle({
          // title: wx.getStorageSync('mallName')
          title: '寿光农发'
        });

        that.setData({
          banners: [{
              bussinessId: 0,
              picUrl: '../../images/sg/banner/1.jpg'
            },
            {
              bussinessId: 1,
              picUrl: '../../images/sg/banner/2.jpg'
            },
            {
              bussinessId: 2,
              picUrl: '../../images/sg/banner/5.jpg'
            },
            {
              bussinessId: 3,
              picUrl: '../../images/sg/banner/4.jpg'
            },
            {
              bussinessId: 4,
              picUrl: '../../images/sg/banner/3.jpg'
            }
          ],

          categories: [{
              id: 0,
              name: '全部'
            },
            {
              id: 1,
              name: '叶类'
            },
            {
              id: 2,
              name: '果实类'
            },
            {
              id: 3,
              name: '根茎类'
            },
          ],
          activeCategoryId: 0,
          // goods: this.getGoodsList(0),
          loadingMoreHidden: true,
          noticeList: {
            dataList:[
              {
                id:0,
                title:'寿光精品蔬菜商城新开张，优惠多多！'
              },
              {
                id: 1,
                title: '寿光菜，放心菜；寿光农发，农品管家！'
              },
              {
                id: 2,
                title: '寿光农发，只为品质生活！'
              }
            ]
          }
        });


        that.getGoodsList(0),

          

          // wx.request({
          //   url: 'https://api.it120.cc/' + app.globalData.subDomain + '/banner/list',
          //   data: {
          //     key: 'mallName'
          //   },
          //   success: function(res) {
          //     if (res.data.code == 404) {
          //       wx.showModal({
          //         title: '提示',
          //         content: '请在后台添加 banner 轮播图片',
          //         showCancel: false
          //       })
          //     } else {
          //       that.setData({
          //         banners: res.data.data
          //       });
          //     }
          //   }
          // })
          // wx.request({
          //   url: 'https://api.it120.cc/'+ app.globalData.subDomain +'/shop/goods/category/all',
          //   success: function(res) {
          //     var categories = [{id:0, name:"全部"}];
          //     if (res.data.code == 0) {
          //       for (var i = 0; i < res.data.data.length; i++) {
          //         categories.push(res.data.data[i]);
          //       }
          //     }
          //     that.setData({
          //       categories:['1','2'],
          //       activeCategoryId:0
          //     });
          //     that.getGoodsList(0);
          //   }
          // })
          that.getCoupons();
        that.getNotice();
      },
      getGoodsList: function(categoryId, text) {
        console.log(categoryId, text)
        var that = this;
        var goods = [{
            id: 0,
            name: '山药',
            catId: 3,
            pic: '../../images/sg/items/0.jpg',
            minPrice: '10.00',
            originalPrice: '15.00',
          },
          {
            id: 1,
            name: '小黄瓜',
            catId: 2,
            pic: '../../images/sg/items/1.jpg',
            minPrice: '15.00',
            originalPrice: '22.00',
          },
          {
            id: 2,
            name: '小青菜',
            catId: 1,
            pic: '../../images/sg/items/2.jpg',
            minPrice: '11.00',
            originalPrice: '14.00',
          },
          {
            id: 3,
            name: '茄子',
            catId: 2,
            pic: '../../images/sg/items/3.jpg',
            minPrice: '7.00',
            originalPrice: '11.00',
          },
          {
            id: 4,
            name: '青笋',
            catId: 3,
            pic: '../../images/sg/items/4.jpg',
            minPrice: '6.00',
            originalPrice: '10.00',
          },
          {
            id: 5,
            name: '蒜薹',
            catId: 3,
            pic: '../../images/sg/items/5.jpg',
            minPrice: '14.00',
            originalPrice: '20.00',
          },
          {
            id: 6,
            name: '南瓜',
            catId: 2,
            pic: '../../images/sg/items/6.jpg',
            minPrice: '3.00',
            originalPrice: '5.00',
          },
          {
            id: 7,
            name: '黄瓜',
            catId: 2,
            pic: '../../images/sg/items/7.jpg',
            minPrice: '5.00',
            originalPrice: '8.00',
          },
          {
            id: 8,
            name: '西红柿',
            catId: 2,
            pic: '../../images/sg/items/8.jpg',
            minPrice: '7.00',
            originalPrice: '12.00',
          },
          {
            id: 9,
            name: '苦瓜',
            catId: 2,
            pic: '../../images/sg/items/9.jpg',
            minPrice: '10.00',
            originalPrice: '17.00',
          }
        ];

        var filteredGoods = [];
        if (categoryId == 0) {
          if (text && text.length > 0) {
            for (var i = 0; i < goods.length; i++) {
              if (goods[i].name.includes(text)) {
                filteredGoods.push(goods[i]);
              }
            }
          } else {
            filteredGoods = goods;
          }

        } else {
          for (var i = 0; i < goods.length; i++) {
            if (text && text.length > 0 && goods[i].name.includes(text)) {
              if (goods[i].catId == categoryId) {
                filteredGoods.push(goods[i]);
              }
            } else {
              if (goods[i].catId == categoryId) {
                  filteredGoods.push(goods[i]);
                }
              }
            }
          }

          that.setData({
            goods: filteredGoods
          });
          // wx.request({
          //   url: 'https://api.it120.cc/'+ app.globalData.subDomain +'/shop/goods/list',
          //   data: {
          //     categoryId: categoryId,
          //     nameLike: that.data.searchInput
          //   },
          //   success: function(res) {
          //     that.setData({
          //       goods:[],
          //       loadingMoreHidden:true
          //     });
          //     var goods = [];
          //     if (res.data.code != 0 || res.data.data.length == 0) {
          //       that.setData({
          //         loadingMoreHidden:false,
          //       });
          //       return;
          //     }
          //     for(var i=0;i<res.data.data.length;i++){
          //       goods.push(res.data.data[i]);
          //     }
          //     that.setData({
          //       goods:goods,
          //     });
          //   }
          // })
        },
        getCoupons: function() {
            var that = this;
            // wx.request({
            //   url: 'https://api.it120.cc/' + app.globalData.subDomain + '/discounts/coupons',
            //   data: {
            //     type: ''
            //   },
            //   success: function (res) {
            //     if (res.data.code == 0) {
            //       that.setData({
            //         hasNoCoupons: false,
            //         coupons: res.data.data
            //       });
            //     }
            //   }
            // })
          },
          gitCoupon: function(e) {
            var that = this;
            // wx.request({
            //   url: 'https://api.it120.cc/' + app.globalData.subDomain + '/discounts/fetch',
            //   data: {
            //     id: e.currentTarget.dataset.id,
            //     token: wx.getStorageSync('token')
            //   },
            //   success: function (res) {
            //     if (res.data.code == 20001 || res.data.code == 20002) {
            //       wx.showModal({
            //         title: '错误',
            //         content: '来晚了',
            //         showCancel: false
            //       })
            //       return;
            //     }
            //     if (res.data.code == 20003) {
            //       wx.showModal({
            //         title: '错误',
            //         content: '你领过了，别贪心哦~',
            //         showCancel: false
            //       })
            //       return;
            //     }
            //     if (res.data.code == 30001) {
            //       wx.showModal({
            //         title: '错误',
            //         content: '您的积分不足',
            //         showCancel: false
            //       })
            //       return;
            //     }
            //     if (res.data.code == 20004) {
            //       wx.showModal({
            //         title: '错误',
            //         content: '已过期~',
            //         showCancel: false
            //       })
            //       return;
            //     }
            //     if (res.data.code == 0) {
            //       wx.showToast({
            //         title: '领取成功，赶紧去下单吧~',
            //         icon: 'success',
            //         duration: 2000
            //       })
            //     } else {
            //       wx.showModal({
            //         title: '错误',
            //         content: res.data.msg,
            //         showCancel: false
            //       })
            //     }
            //   }
            // })
          },
          onShareAppMessage: function() {
            return {
              title: wx.getStorageSync('mallName') + '——' + app.globalData.shareProfile,
              path: '/pages/index/index',
              success: function(res) {
                // 转发成功
              },
              fail: function(res) {
                // 转发失败
              }
            }
          },
          getNotice: function() {
            var that = this;
            // wx.request({
            //   url: 'https://api.it120.cc/' + app.globalData.subDomain + '/notice/list',
            //   data: { pageSize :5},
            //   success: function (res) {
            //     if (res.data.code == 0) {
            //       that.setData({
            //         noticeList: res.data.data
            //       });
            //     }
            //   }
            // })
          },
          listenerSearchInput: function(e) {
            this.setData({
              searchInput: e.detail.value
            })

          },
          toSearch: function() {
            console.log('Search text:' + this.data.activeCategoryId);
            this.getGoodsList(this.data.activeCategoryId, this.data.searchInput);
          }
      })