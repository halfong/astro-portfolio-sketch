---
title: "微信小程序用户登录状态维护，简单Hack实现Session Cookie"
publishedAt: 2018-02-04
description: "截至当前版本（1.9.8）微信小程序框架不支持cookie的使用，因此传统的基于服务器端会话session的状态维护变得不可用。本文将通过简单的hack使微信小程序也变得可以“支持session”。"
slug: "WeChat-Mini-Program-User-Login-Status-Maintenance--Simple-Hack-Implementation-Session-Cookie"
isPublish: true
tags:
  - Dev
  - 小程序
---

### 00 思路

我们知道session需要通过服务器HTTP响应Header中的Set-Cookie实现：浏览器接收到此值后将会在本地生成cookie，并在之后的同域请求Header中附上此Cookie，服务器session服务再通过Cookie值来获取对应的信息以完成状态校验。

小程序不支持cookie，但wx.request可以设置请求header及获取响应的header设置，因此我们可以通过获取响应header中的Set-Cookie值并将其保存，并在下次请求时添加到heaer中来模拟浏览器的session cookie行为，以使得基于session的状态维护变得可能。

### 01 实现

```javascript
wx.request({
    url : 'xx.com/api',
    success : res => {
        //保存每次请求的Set-Cookie
        mockSessionCookies(res);
        return res;
    },
    header : {
        //每次请求都在header带上
        Cookie : searilizeJson( wx.getStorageSync('mockSessionCookies') )
    },
});

function mockSessionCookies( res ){
    if( !res.header['Set-Cookie'] ) return;
    let cookies = this.storage('mockSessionCookies');
    if( !cookies ) cookies = {};
    //解析Set-Cookie. wx.request会将多个Set-Cookie以','连接
    res.header['Set-Cookie'].split('HttpOnly,').forEach( ck => {
      let kv = ck.split(';')[0].split('=');
      cookies[ kv[0] ] = kv[1];
    })
    wx.setStorageSync( 'mockSessionCookies', cookies );
}

function serializeJson( obj ){
    let str = '';
    for( let k in obj ){
      str += k + '=' + obj[k] + ';';
    }
    return str;
}
```