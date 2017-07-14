console.log('我是a')

define(['./b.js'],function(objb){
    console.log('a里面的b')
    console.log(objb)
})